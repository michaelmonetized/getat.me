"use client";

import ConvexProvider from "./convex";
import PostHogProviderWrapper from "./posthog";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider>
      <PostHogProviderWrapper>{children}</PostHogProviderWrapper>
    </ConvexProvider>
  );
}
