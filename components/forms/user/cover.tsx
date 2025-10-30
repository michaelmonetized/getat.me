"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";

export function CoverUpload() {
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
  const uploadCover = useMutation(api.users.uploadCover);

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
      await uploadCover({
        userId: user.id,
        fileId: response.storageId as Id<"_storage">,
      });
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload cover");
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

  const coverUrl = userProfile?.coverUrl;

  return (
    <div className="relative w-full h-full">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          absolute inset-0 flex items-center justify-center
          ${isUploading ? "opacity-50" : "cursor-pointer"}
          ${coverUrl ? "bg-black/0 hover:bg-black/30 transition-colors" : ""}
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
        {(!coverUrl || isHovering || isUploading) && (
          <p
            className={`text-sm ${coverUrl ? "text-white" : "text-muted-foreground"}`}
          >
            {isUploading
              ? "Uploading..."
              : "Drop an image file – or – click to upload your cover photo"}
          </p>
        )}
      </div>
      {error && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
