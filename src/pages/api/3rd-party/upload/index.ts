import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

import { env } from "../../../../env.mjs";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const S3 = new S3Client({
  region: env.S3_REGION,
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

async function uploadFile(
  filepath: string,
  newFilename: string,
  mimetype: string | null,
) {
  try {
    const fileData = fs.readFileSync(filepath);

    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: newFilename,
      Body: fileData,
      ContentType: mimetype ?? undefined,
      ContentDisposition: "inline filename=" + newFilename,
    });

    await S3.send(command);

    const fileURL = `${env.BUCKET_PUBLIC_URL}/${newFilename}`;
    return fileURL;
  } catch (err) {
    return err;
  }
}

function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm({
    keepExtensions: true,
    hashAlgorithm: "sha256",
    maxFileSize: 100 * 1024 * 1024, // 100MB
  });

  form.parse(req, (err, fields, files) => {
    // add validation here
    const { tags, name } = fields;
    let formatedTags: string[] = [];

    // let tags = fields.tags?[0]?.toString() as string | undefined
    //   ? (tags = fields.tags?[0]?.toString().split(", ")) as string[]
    //   : ([""] as string[])

    if (!files.file?.[0]) {
      return res.status(400).json({
        error: true,
        code: "MISSING_FILE",
        message: "No file has been provided.  Please provide a file to upload.",
      });
    }

    if (!name?.[0]) {
      return res.status(400).json({
        error: true,
        code: "MISSING_NAME",
        message:
          "No name has been provided.  Please provide a name for the file.",
      });
    }

    if (tags) {
      if (!tags[0]) return;
      formatedTags = tags[0].split(", ");
    }

    const formatedName = name[0]?.toLowerCase();

    if (err) {
      return res
        .status(500)
        .json({ message: "Error uploading file. Please try again." });
    }
    const allPromise = Promise.all([
      uploadFile(
        files.file[0].filepath,
        files.file[0].newFilename,
        files.file[0].mimetype,
      ),
    ]);

    allPromise
      .then((values) => {
        const url = values[0] as string;
        return res.status(201).json({
          message: "File uploaded successfully.",
          data: {
            name: formatedName,
            tags: formatedTags,
            url,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Error uploading file. Please try again." });
      });
  });
  return;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return POST(req, res);
    default:
      return res.status(405).end();
  }
}
