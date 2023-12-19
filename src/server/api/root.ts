import { actionLogRouter } from "~/server/api/routers/action-log";
import { intergationsRouter } from "~/server/api/routers/intergations";
import { uploadsRouter } from "./routers/uploads";

import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  actionLog: actionLogRouter,
  intergations: intergationsRouter,
  uploads: uploadsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
