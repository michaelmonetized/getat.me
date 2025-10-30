"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";

export function AvatarUpload() {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const userProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const uploadAvatar = useMutation(api.users.uploadAvatar);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      // Get upload URL from Convex
      const { url } = await generateUploadUrl();

      // Upload file to Convex storage
      const upload = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!upload.ok) {
        throw new Error(
          `Failed to upload image: ${upload.status} ${upload.statusText}`
        );
      }

      const response = await upload.json();
      if (!response.storageId) {
        throw new Error("Upload response missing storageId");
      }

      // Update user with file ID
      await uploadAvatar({
        userId: user.id,
        fileId: response.storageId as Id<"_storage">,
      });
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload avatar");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      fileInputRef.current.dispatchEvent(
        new Event("change", { bubbles: true })
      );
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
  };

  const avatarUrl = userProfile?.avatarUrl;

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative w-64 h-64 rounded-full overflow-hidden border-4 border-background shadow-lg bg-background
          ${avatarUrl ? "cursor-pointer" : "border-dashed bg-muted"}
          ${isHovering ? "ring-2 ring-primary ring-offset-2" : ""}
          ${isUploading ? "opacity-50" : ""}
          transition-all
        `}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isUploading}
        />

        {avatarUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div
              className={`
                absolute inset-0 bg-black/60 flex items-center justify-center
                transition-opacity duration-200
                ${isHovering || isUploading ? "opacity-100" : "opacity-0"}
              `}
            >
              <p className="text-white text-xs text-center px-3 leading-tight">
                {isUploading
                  ? "Uploading..."
                  : "Drop an image file -or- click to upload your profile photo"}
              </p>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/50">
            <p className="text-muted-foreground text-xs text-center px-3 leading-tight">
              {isUploading
                ? "Uploading..."
                : "Drop an image file -or- click to upload your profile photo"}
            </p>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive text-center mt-2">{error}</p>
      )}
    </div>
  );
}
