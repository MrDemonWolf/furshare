import { IncomingForm } from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files);
  });
};
