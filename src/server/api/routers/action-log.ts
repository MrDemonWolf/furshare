import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const actionLogRouter = createTRPCRouter({
  get10: privateProcedure.query(({ ctx }) => {
    return ctx.db.actionLog.findMany({
      where: {
        userId: ctx.userId,
      },
      select: {
        id: true,
        type: true,
        description: true,
        createdAt: true,
        user: {
          select: {
            displayName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  }),
});
