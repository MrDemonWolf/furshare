import { ActionLogType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const uploadsRouter = createTRPCRouter({
  get: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const uploads = await ctx.db.upload.findMany({
      where: {
        uploaderId: userId,
      },
      select: {
        id: true,
        name: true,
        fileSize: true,
        fileType: true,
        fileUrl: true,
        isDeleted: true,
        uploader: {
          select: {
            displayName: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      // take: 8,
    });
    const uploadsCount = await ctx.db.upload.count({
      where: {
        uploaderId: userId,
      },
    });

    return {
      pagenation: {
        nextCursor: uploads[uploads.length - 1]?.id,
        previousCursor: uploads[0]?.id,
      },
      data: uploads,
      total: uploadsCount,
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

      await ctx.db.actionLog.create({
        data: {
          type: ActionLogType.INTERGATION_TOKEN_REVOKED,
          description: "Intergation token revoked",
          userId: ctx.userId,
        },
      });

      return {
        message: "Token revoked",
      };
    }),
});
