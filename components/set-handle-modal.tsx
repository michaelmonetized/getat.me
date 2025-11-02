"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
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
import { User } from "@/convex/schema";

export function SetHandleModal() {
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const { isSignedIn, user, isLoaded: userLoaded } = useUser();
  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );
  const setHandleMutation = useMutation(api.users.setHandle);

  // Don't show modal if user is not signed in or not loaded
  if (
    !userLoaded ||
    !isSignedIn ||
    !user?.id ||
    userProfile !== null ||
    (userProfile !== null && (userProfile as User).handle)
  )
    return <></>;

  // Show modal only when we know for sure the user doesn't have a handle
  // userProfile === null means user doesn't exist in Convex yet
  // userProfile?.handle is falsy means user exists but has no handle
  const shouldShowModal =
    userLoaded &&
    isSignedIn &&
    (userProfile === null || !(userProfile as User).handle);

  if (!shouldShowModal) return <></>;

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
        userId: user?.id,
      });
      // Clear form - modal will disappear when query updates
      setHandle("");
      setIsChecking(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set handle");
      setIsChecking(false);
    }
  };

  return shouldShowModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4">
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
  ) : (
    <></>
  );
}
