import { ActionLogType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";

import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

import { env } from "../../../env.mjs";

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
  // remove: privateProcedure
  //   .input(
  //     z.object({
  //       id: z.string(),
  //     }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { id } = input;

  //     const upload = await ctx.db.upload.findUnique({
  //       where: {
  //         id,
  //       },
  //     });

  //     if (!upload) {
  //       throw new TRPCError({
  //         code: "NOT_FOUND",
  //         message: "Upload not found",
  //       });
  //     }

  //     if (upload.uploaderId !== ctx.userId) {
  //       throw new TRPCError({
  //         code: "UNAUTHORIZED",
  //         message: "Unauthorized",
  //       });
  //     }

  //     /**
  //      * Set the command to delete the file from S3
  //      */
  //     try {
  //       const destroyCommand = new DeleteObjectsCommand({
  //         Bucket: env.S3_BUCKET,
  //         Delete: {
  //           Objects: [
  //             {
  //               Key: upload.fileName,
  //             },
  //           ],
  //         },
  //       });

  //       /**
  //        * Delete the file from S3 if the file was not created in the database
  //        */
  //       await S3.send(destroyCommand);
  //     } catch (err) {
  //       new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Failed to delete file from S3",
  //       });
  //     }

  //     await ctx.db.upload.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         isDeleted: true,
  //       },
  //     });

  //     await ctx.db.upload.delete({
  //       where: {
  //         id,
  //       },
  //     });

  //     await ctx.db.actionLog.create({
  //       data: {
  //         type: ActionLogType.UPLOAD_DELETED,
  //         description: "File has been deleted",
  //         userId: ctx.userId,
  //       },
  //     });

  //     return {
  //       message: "Token revoked",
  //     };
  //   }),
});
