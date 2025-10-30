"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "@/hooks/use-debounce";

export function BioForm() {
  const { user } = useUser();
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );
  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (userProfile?.bio !== undefined) {
      setBio(userProfile.bio || "");
    }
  }, [userProfile]);

  const debouncedUpdate = useDebouncedCallback(async (newBio: string) => {
    if (!user?.id) return;

    setError("");
    try {
      await updateUser({
        userId: user.id,
        bio: newBio.trim() || undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update bio");
    }
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBio = e.target.value;
    setBio(newBio);
    debouncedUpdate(newBio);
  };

  return (
    <div className="space-y-2">
      <Input
        value={bio}
        onChange={handleChange}
        placeholder="Click to edit your bio..."
        className="w-full bg-background"
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
