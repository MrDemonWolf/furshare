import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import { Webhook } from "svix";

import type { WebhookEvent } from "@clerk/clerk-sdk-node";

import { env } from "../../../../env.mjs";

import { db } from "../../../../server/db";

/**
 * Modify the Next.js API route config to allow external requests
 */
export const config = {
  api: {
    externalResolver: true,
  },
};
/**
 * Handle the POST request
 * @param req
 * @param res
 * @returns object with message and data with file name, tags, delete token, and file URL.
 */
async function POST(req: NextApiRequest, res: NextApiResponse) {
  const payload = JSON.stringify(req.body);

  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(env.CLERK_WEBHOOK_SIGNING_SECRET);

  let evt: WebhookEvent;

  try {
    // Manually verify the required headers
    const requiredHeaders: string[] = ["svix-signature", "content-type"]; // Add any other required headers here
    for (const header of requiredHeaders) {
      if (!req.headers[header]) {
        throw new Error(`Missing required header: ${header}`);
      }
    }

    // Verify the webhook payload and headers
    evt = wh.verify(
      payload,
      req.headers as Record<string, string>,
    ) as WebhookEvent;
  } catch (_) {
    // If the verification fails or required headers are missing, return a 400 error
    return res.status(400).json({});
  }

  switch (evt.type) {
    case "user.created":
      await db.user.update({
        where: {
          id: evt.data.id,
        },
        data: {
          displayName:
            evt.data.username ?? `${evt.data.first_name} ${evt.data.last_name}`,
        },
      });
      break;

    case "user.updated":
      await db.user.upsert({
        where: {
          id: evt.data.id,
        },
        create: {
          id: evt.data.id,
          displayName:
            evt.data.username ?? `${evt.data.first_name} ${evt.data.last_name}`,
        },
        update: {
          displayName:
            evt.data.username ?? `${evt.data.first_name} ${evt.data.last_name}`,
        },
      });
      break;

    case "user.deleted":
      await db.user.update({
        where: {
          id: evt.data.id,
        },
        data: {
          pendingDeletion: true,
          pendingDeletionAt: new Date(),
        },
      });

      break;
    default: {
      console.log("Unhandled event type: " + evt.type);
    }
  }
  res.status(200).json({
    message: "Webhook received",
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
      message: "An internal server error occurred.",
    });
  }
}
