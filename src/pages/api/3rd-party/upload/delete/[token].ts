import type { FileType } from "@prisma/client";
import { ActionLogType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import * as path from "path";
import { IncomingForm } from "formidable";
import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { customAlphabet } from "nanoid";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { env } from "../../../../../env.mjs";

import { db } from "../../../../../server/db";

/**
 * Modify the Next.js API route config to allow for the request body to be parsed
 */
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const urlFriendyAlphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
/**
 * Create a new S3 client
 */
const S3 = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

/**
 * Upload the file to S3 and add the file information to the database
 * @param uploaderId
 * @param fileName
 * @returns file URL and file object
 */
async function deleteFile(uploaderId: string, fileName: string) {
  try {
    const file = await db.upload.findFirst({
      where: {
        uploaderId,
        name: fileName,
      },
    });

    if (!file) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error deleting the file.",
      });
    }

    if (!file) {
      /**
       * Set the command to delete the file from S3
       */
      const destroyCommand = new DeleteObjectsCommand({
        Bucket: env.S3_BUCKET,
        Delete: {
          Objects: [
            {
              Key: newFileName,
            },
          ],
        },
      });

      /**
       * Delete the file from S3 if the file was not created in the database
       */
      await S3.send(destroyCommand);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error uploading the file.",
      });
    }
    /**
     * Return the file URL
     */
    return {
      name,
      tags,
      fileType,
      fileSize,
      fileUrl,
      deleteUrl: `${env.NEXT_PUBLIC_APP_URL}/api/3rd-party/upload/delete?token=${deleteToken}`,
    };
  } catch (err) {
    return false;
  }
}

/**
 * Handle the POST request
 * @param req
 * @param res
 * @returns object with message and data with file name, tags, delete token, and file URL.
 */
async function POST(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Check if user is authorized to access this endpoint
   */
  const user = await checkJWT(req);
  if (!user) {
    return res.status(401).json({
      error: true,
      code: "UNAUTHORIZED",
      message: "You are not authorized to access this endpoint.",
    });
  }

  if (user.isBanned || user.isSuspened) {
    return res.status(403).json({
      error: true,
      code: "FORBIDDEN",
      message:
        "You have been banned or suspended from the app and are not allowed to access this endpoint.",
    });
  }

  const form = new IncomingForm({
    keepExtensions: true,
    hashAlgorithm: "sha256",
    maxFileSize: 100 * 1024 * 1024, // 100MB
  });

  form.parse(req, (err, fields, files) => {
    const { tags } = fields;

    if (!files.file?.[0]) {
      return res.status(400).json({
        error: true,
        code: "MISSING_FILE",
        message: "No file has been provided.  Please provide a file to upload.",
      });
    }

    let formatedName: string = files.file[0].newFilename;

    let formatedTags: string[] = [];

    if (tags) {
      if (!tags[0]) return;
      formatedTags = tags[0].split(",") || [];
    }

    /**
     * Check if name is provided and if it is that its not an empty string
     */
    if (fields.name) {
      if (!fields.name[0]) return;
      if (fields.name[0].trim() === "") return;

      formatedName = fields.name[0];
    } else {
      formatedName = path.parse(files.file[0].newFilename).name;
    }

    if (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error uploading the file.",
      });
    }

    /**
     * Upload the file to S3 with promises to ensure that the file is uploaded and the URL is generated before returning the response
     */
    const allPromise = Promise.all([
      uploadFile(
        user.id,
        formatedName,
        files.file[0].newFilename,
        files.file[0].size,
        files.file[0].mimetype,
        formatedTags,
        files.file[0].filepath,
      ),
    ]);

    allPromise
      .then((values) => {
        const data = values[0];
        /**
         * Returns a 201 Created status code along with the file URL, name, and tags
         */
        res.status(201).json({
          error: false,
          message: "File uploaded successfully.",
          data,
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          error: true,
          code: "INTERNAL_SERVER_ERROR",
          message: "Error uploading the file.",
        });
      });
  });
  await db.actionLog.create({
    data: {
      type: ActionLogType.UPLOAD_CREATED,
      description: "File has been uploaded by",
      userId: user.id,
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case "POST":
        await POST(req, res);
        break;
      default:
        res.status(405).json({
          error: true,
          code: "METHOD_NOT_ALLOWED",
          message: "This endpoint only supports POST requests.",
        });
        break;
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true,
      code: "INTERNAL_SERVER_ERROR",
      message: "Error uploading the file.",
    });
  }
}
