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

export function SetHandleModal() {
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isSignedIn, user, isLoaded: userLoaded } = useUser();
  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );
  const setHandleMutation = useMutation(api.users.setHandle);

  // Early return checks - return null as soon as we know we shouldn't show the modal
  if (!userLoaded || !isSignedIn || !user?.id) return null;
  if (userProfile === undefined) return null; // Still loading
  if (userProfile?.handle) return null; // Already has handle

  // If submitted successfully but query hasn't updated yet, show loading state
  if (isSubmitted && !userProfile?.handle) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Setting up your profile...</p>
          </CardContent>
        </Card>
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
        userId: user?.id,
      });
      setIsSubmitted(true);
      // Clear form
      setHandle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set handle");
      setIsChecking(false);
    }
  };

  return (
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
  );
}
