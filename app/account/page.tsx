"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoaded: userLoaded } = useUser();
  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );

  useEffect(() => {
    if (!userLoaded || !user?.id) {
      return;
    }

    // Wait for userProfile to load
    if (userProfile === undefined) {
      return;
    }

    // If user has a handle, redirect to their profile
    if (userProfile?.handle) {
      router.push(`/${userProfile.handle}`);
      return;
    }

    // If user doesn't have a handle, redirect to onboarding
    router.push("/onboarding");
  }, [userLoaded, user?.id, userProfile, router]);

  // Show loading state while checking
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <div className="text-muted-foreground">Setting up your account...</div>
      </div>
    </div>
  );
}
