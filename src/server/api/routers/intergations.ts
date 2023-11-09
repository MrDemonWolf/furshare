import { TRPCError } from "@trpc/server";
import { z } from "zod";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";

enum Expiry {
  never = "never",
  oneyear = "oneyear",
  threemonths = "threemonths",
  twomonths = "twomonths",
  onemonth = "onemonth",
}

export const intergationsRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        label: z.string().default("Intergation Token"),
        expiry: z.nativeEnum(Expiry),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { label, expiry } = input;
      let expiresAt: Date | null = null;
      let isNever = false;

      switch (expiry) {
        case Expiry.never:
          isNever = true;
          break;
        case Expiry.oneyear:
          expiresAt = dayjs().add(1, "year").toDate();
          break;
        case Expiry.threemonths:
          expiresAt = dayjs().add(3, "month").toDate();
          break;
        case Expiry.twomonths:
          expiresAt = dayjs().add(2, "month").toDate();
          break;
        case Expiry.onemonth:
          expiresAt = dayjs().add(1, "month").toDate();
          break;
        default:
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid expiry value",
          });
      }

      // Creates the JWT Token/API Token
      const jwtToken = jwt.sign({}, env.JWT_SECRET, {
        issuer: env.NEXT_PUBLIC_APP_NAME,
        subject: req.user.id.toString(),
        expiresIn,
      });

      // Gets th

      // using crypto to

      return token;
    }),
});
