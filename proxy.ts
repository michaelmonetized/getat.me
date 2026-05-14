import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/account(.*)",
    "/onboarding(.*)",
    "/upload(.*)",
    "/upgraded(.*)",
    "/:handle/account(.*)",
    "/:handle/dashboard(.*)",
    "/api/upload(.*)",
  ],
};
