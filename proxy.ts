import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Match all routes except Next internals and static files so Clerk auth()
    // can detect middleware on public pages that render auth-aware components.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/account(.*)",
    "/onboarding(.*)",
    "/upload(.*)",
    "/upgraded(.*)",
    "/:handle/account(.*)",
    "/:handle/dashboard(.*)",
    "/api/upload(.*)",
  ],
};
