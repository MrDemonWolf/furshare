import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // "/" will be accessible to all users
  // "/api/trpc/posts.getAll" will be accessible to all users
  publicRoutes: ["/", "/api/3rd-party/(.*)"],

  apiRoutes: ["/api/trpc/(.*)"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
