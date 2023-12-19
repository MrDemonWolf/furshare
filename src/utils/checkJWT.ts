import type { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { env } from "../env.mjs";

import { db } from "../server/db";

export async function checkAuth(req: NextApiRequest) {
  try {
    const token = req.headers.authorization ?? "";
    if (!token) return false;

    /**
     * Verify JWT token
     */
    console.log("token", token);
    console.log("env.JWT_SECRET", env.JWT_SECRET);
    const decodedToken = jwt.verify(token, env.JWT_SECRET);

    console.log("decodedToken", decodedToken);

    if (!decodedToken) return false;

    /**
     * check hash of token in database to see if it exists and not revoked or expired
     */
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const intergationToken = await db.intergationToken.findFirst({
      where: {
        tokenHash,
        isRevoked: false,
      },
    });

    if (!intergationToken) return false;

    /**
     * Find User in database from sub in JWT token
     */
    const user = await db.user.findUnique({
      where: {
        id: decodedToken.sub as string,
      },
    });

    if (process.env.NODE_ENV === "development") {
      console.log("intergationToken user", user);
    }

    if (!user) return false;

    // check if token is never
    if (!intergationToken?.isNever) {
      console.log("not never");
      // check if token is expired or not
      if (intergationToken?.expiresAt) {
        if (new Date() > intergationToken?.expiresAt) return false;
      }
    }

    return user;
  } catch (err) {
    return false;
  }
}
