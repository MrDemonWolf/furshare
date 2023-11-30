import { ActionLogType } from "@prisma/client";
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
  ninetydays = "ninetydays",
  thirtydays = "thirtydays",
}
enum ExpiresIn {
  oneyear = "1y",
  ninetydays = "90d",
  thirtydays = "30d",
}
type ExpiryType = keyof typeof ExpiresIn;

export const intergationsRouter = createTRPCRouter({
  get: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const intergations = await ctx.db.intergationToken.findMany({
      where: {
        userId,
        isRevoked: false,
      },
      select: {
        id: true,
        label: true,
        expiresAt: true,
        isNever: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      // take: 8,
    });
    const intergationsCount = await ctx.db.intergationToken.count({
      where: {
        userId,
        isRevoked: false,
      },
    });

    return {
      pagenation: {
        nextCursor: intergations[intergations.length - 1]?.id,
        previousCursor: intergations[0]?.id,
      },
      data: intergations,
      total: intergationsCount,
    };
  }),
  getPagination: privateProcedure
    .input(
      z.object({
        cursor: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { cursor } = input;
      if (!cursor)
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid cursor" });

      const intergations = await ctx.db.intergationToken.findMany({
        cursor: {
          id: cursor,
        },
        where: {
          userId,
          isRevoked: false,
        },
        select: {
          id: true,
          label: true,
          expiresAt: true,
          isNever: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      });
      const intergationsCount = await ctx.db.intergationToken.count({
        cursor: {
          id: cursor,
        },
        where: {
          userId,
          isRevoked: false,
        },
        take: 8,
      });
      return {
        pagenation: {
          nextCursor: intergations[intergations.length - 1]?.id,
          previousCursor: intergations[0]?.id,
        },
        data: intergations,
        total: intergationsCount,
      };
    }),
  create: privateProcedure
    .input(
      z.object({
        label: z
          .string()
          .min(1, "Label is required")
          .default("Intergation Token"),
        expiry: z.nativeEnum(Expiry).default(Expiry.never),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { label, expiry } = input;
      let expiresAt: Date | null = null;
      let expiresIn: ExpiryType | null = null;

      /**
       * Set the expiry date based on the expiry value
       */
      switch (expiry) {
        case Expiry.never:
          expiresAt = null;
          expiresIn = null;
          break;
        case Expiry.oneyear:
          expiresAt = dayjs().add(1, "year").toDate();
          expiresIn = "oneyear";
          break;
        case Expiry.ninetydays:
          expiresAt = dayjs().add(3, "month").toDate();
          expiresIn = "ninetydays";
          break;
        case Expiry.thirtydays:
          expiresAt = dayjs().add(1, "month").toDate();
          expiresIn = "thirtydays";
          break;
        default:
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid expiry value",
          });
      }
      /**
       * Generate a JWT Token signed by the server
       */
      const jwtToken = jwt.sign({}, env.JWT_SECRET, {
        audience: env.NEXT_PUBLIC_APP_URL,
        issuer: env.NEXT_PUBLIC_APP_NAME,
        subject: ctx.userId,
        expiresIn: expiresIn ? ExpiresIn[expiresIn as ExpiryType] : "1000y",
        algorithm: "HS256",
      });

      /**
       * Create a hash of the JWT Token
       */
      const hash = crypto.createHash("sha256").update(jwtToken).digest("hex");

      /**
       * Create a new intergation token to be stored in the database
       * and returned to the user
       */
      await ctx.db.intergationToken.create({
        data: {
          tokenHash: hash,
          label,
          expiresAt,
          isNever: expiry === Expiry.never,
          isRevoked: false,
          userId: ctx.userId,
        },
      });

      await ctx.db.actionLog.create({
        data: {
          type: ActionLogType.INTERGATION_TOKEN_CREATED,
          description: "Intergation token created",
          userId: ctx.userId,
        },
      });

      return {
        message:
          "Intergation token created, please store this token securely. It will not be shown again.",
        token: jwtToken,
      };
    }),
  remove: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const token = await ctx.db.intergationToken.findUnique({
        where: {
          id,
        },
      });
      if (!token)
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token" });
      if (token.userId !== ctx.userId)
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid token" });
      await ctx.db.intergationToken.update({
        where: {
          id,
        },
        data: {
          isRevoked: true,
        },
      });
      return {
        message: "Token revoked",
      };
    }),
});
