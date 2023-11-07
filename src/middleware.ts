import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // "/" will be accessible to all users
  // "/api/trpc/posts.getAll" will be accessible to all users
  publicRoutes: ["/", "/api/3rd-party/(.*)", "/api/webhook/(.*)"],

  apiRoutes: ["/api/3rd-party/(.*)", "/api/webhook/(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
