import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { getBaseUrl } from "@/lib/auth";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  afterAuth(auth, _req, _evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: `${getBaseUrl()}/sign-in`,
      });
    }
  },
  publicRoutes: ["/", "/sign-in", "/sign-up", "/post"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
