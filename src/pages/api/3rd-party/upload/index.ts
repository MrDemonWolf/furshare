import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import { customAlphabet } from "nanoid";

import { env } from "../../../../env.mjs";

import { db } from "../../../../server/db";

/**
 * Modify the Next.js API route config to allow for the request body to be parsed
 */
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export const urlFriendyAlphabet =
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
 * @param fileName
 * @param fileSize
 * @param mimetype
 * @param tags
 * @param filepath
 * @returns file URL and file object
 */
async function uploadFile(
  fileName: string,
  newFileName: string,
  fileSize: number,
  mimetype: string | null,
  tags: string[],
  filepath: string,
) {
  try {
    const fileData = fs.readFileSync(filepath);

    /**
     * Upload the file to S3
     */
    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: newFileName,
      Body: fileData,
      ContentType: mimetype ?? undefined,
      ContentDisposition: "inline filename=" + newFileName,
    });

    await S3.send(command);

    /**
     * Generate the public URL for the file
     */
    const fileUrl = `${env.BUCKET_PUBLIC_URL}/${newFileName}`;

    /**
     * Delete the file from the local filesystem
     */
    fs.unlinkSync(filepath);

    /**
     * Generate a delete token
     */
    const nanoid32 = customAlphabet(urlFriendyAlphabet, 32);
    const deleteToken = nanoid32();

    /**
     * Add the file information to the database
     */
    await addFileInfomationToDB(
      "id", // get userID from JWT
      fileName || newFileName, // get file name from body
      newFileName,
      "png", // fget file extension from file name
      "image", // get filetype from mine type
      fileSize,
      fileUrl,
      deleteToken, // generate delete token with nanoid
      tags,
    );

    /**
     * Return the file URL
     */
    return {
      name: fileName,
      tags: tags,
      url: fileUrl,
      deleteToken: `${env.NEXT_PUBLIC_APP_URL}/api/3rd-party/upload/delete?token=${deleteToken}`,
    };
  } catch (err) {
    return err;
  }
}

/**
 * Add the file information to the database
 * @param uploaderId
 * @param name
 * @param fileName
 * @param fileExtension
 * @param fileType
 * @param fileSize
 * @param fileUrl
 * @param deleteToken
 * @param tags
 * @returns file object
 */
async function addFileInfomationToDB(
  uploaderId: string,
  name: string,
  fileName: string,
  fileExtension: string,
  fileType: string,
  fileSize: number,
  fileUrl: string,
  deleteToken: string,
  tags: string[],
) {
  /**
   * Loop through the tags and add them to the database.
   * Create an array of promises to ensure that all of the tags are created before continuing.
   * Then return array of tag IDs
   */
  const promises = tags.map(async (newTag) => {
    const tag = await db.uploadTag.create({
      data: {
        name: newTag,
      },
    });
    return tag.id;
  });

  const tagIds = await Promise.all(promises);

  /**
   *  Add the file information to the database.
   */
  const file = await db.upload.create({
    data: {
      uploaderId,
      name,
      fileName,
      fileExtension,
      fileType,
      fileSize,
      fileUrl,
      deleteToken,
      tags: {
        connect: tagIds.map((tagId) => ({ id: tagId })),
      },
    },
  });
  return file;
}

/**
 * Handle the POST request
 * @param req
 * @param res
 * @returns object with message and data with file name, tags, delete token, and file URL.
 */
function POST(req: NextApiRequest, res: NextApiResponse) {
  /**
   * Check header for API key
   */
  console.log(req.headers.authorization);

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

      formatedName = fields.name[0] || files.file[0].newFilename;
    }

    if (err) {
      return res.status(500).json({
        error: true,
        code: "INTERNAL_SERVER_ERROR",
        message: "Error parsing the request body.",
      });
    }

    /**
     * Upload the file to S3 with promises to ensure that the file is uploaded and the URL is generated before returning the response
     */
    const allPromise = Promise.all([
      uploadFile(
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
        return res.status(201).json({
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
  return;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        POST(req, res);
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
