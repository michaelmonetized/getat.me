"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { trackProfileCreated, trackFormSubmit } from "@/lib/analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded: userLoaded } = useUser();
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );
  const setHandleMutation = useMutation(api.users.setHandle);

  // Redirect if user already has a handle
  if (userLoaded && user?.id && userProfile?.handle) {
    router.push(`/${userProfile.handle}`);
    return null;
  }

  // Show loading state while checking user
  if (!userLoaded || !user?.id) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsChecking(true);

    if (!handle.trim()) {
      setError("Handle is required");
      setIsChecking(false);
      return;
    }

    // Check handle format (alphanumeric, underscore, hyphen)
    if (!/^[a-z0-9_-]+$/.test(handle.trim())) {
      setError(
        "Handle can only contain lowercase letters, numbers, underscores, and hyphens"
      );
      setIsChecking(false);
      return;
    }

    try {
      await setHandleMutation({
        handle: handle.trim().toLowerCase(),
        userId: user.id,
      });
      // Track profile creation
      trackFormSubmit("onboarding");
      trackProfileCreated(handle.trim().toLowerCase());
      // Redirect to profile page
      router.push(`/${handle.trim().toLowerCase()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set handle");
      setIsChecking(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Choose Your Handle</CardTitle>
          <CardDescription>
            Your handle will be used in your profile URL (getat.me/yourhandle)
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="handle">Handle</Label>
              <Input
                id="handle"
                value={handle}
                onChange={(e) => {
                  setHandle(
                    e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
                  );
                  setError("");
                }}
                placeholder="yourhandle"
                disabled={isChecking}
                className="font-mono"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <p className="text-xs text-muted-foreground">
                Must be unique and contain only lowercase letters, numbers,
                underscores, and hyphens
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isChecking}>
              {isChecking ? "Checking..." : "Continue"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
