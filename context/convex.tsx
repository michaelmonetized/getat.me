"use client";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth, ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";

const convexUrl =
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://third-oyster-960.convex.cloud";
const convex = new ConvexReactClient(convexUrl);
const clerkPublishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ??
  "pk_test_aGlwLWphd2Zpc2gtMTAuY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function ConvexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      appearance={{
        theme: shadcn,
      }}
      signInUrl="/login"
      signUpUrl="/register"
      afterSignOutUrl="/"
      signUpFallbackRedirectUrl="/onboarding"
      signInFallbackRedirectUrl="/account"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
