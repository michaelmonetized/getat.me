"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { AddLinkForm } from "@/components/forms/user/add-link";
import { AvatarUpload } from "@/components/forms/user/avatar";
import { CoverUpload } from "@/components/forms/user/cover";
import { BioForm } from "@/components/forms/user/bio";
import { ThemeSelector } from "@/components/forms/user/theme-selector";
import { PlanInfo } from "@/components/forms/user/plan-info";
import { LinkItem } from "@/components/forms/user/link-item";
import { LimitBanner } from "@/components/forms/user/limit-banner";
import { EditLinkForm } from "@/components/forms/user/edit-link";

export default function ProfilePage() {
  const params = useParams();
  const handle = params.handle as string;
  const { user: currentUser } = useUser();
  const [editingLink, setEditingLink] = useState<Id<"links"> | null>(null);

  const userByHandle = useQuery(api.users.getUserByHandle, { handle });
  const currentUserProfile = useQuery(
    api.users.getCurrentUserProfile,
    currentUser?.id ? { userId: currentUser.id } : "skip"
  );
  const links = useQuery(api.links.getUserLinksByHandle, { handle });

  // Check if user has unlimited_links feature
  const hasUnlimitedLinks = useQuery(
    api.users.userHasFeature,
    currentUser?.id ? { userId: currentUser.id, feature: "unlimited_links" } : "skip"
  );

  const isOwner = useMemo(() => {
    return (
      currentUserProfile &&
      userByHandle &&
      currentUserProfile.userId === userByHandle.userId
    );
  }, [currentUserProfile, userByHandle]);

  // Apply theme class to the html element - must be before early returns
  const themeClass = userByHandle?.theme?.toLowerCase() || "mocha";

  useEffect(() => {
    document.documentElement.className = `theme-${themeClass}`;
    document.body.className = "antialiased";
  }, [themeClass]);

  if (links === undefined || userByHandle === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!userByHandle) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4"></div>
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="text-muted-foreground">
          The user @{handle} doesn&apos;t exist.
        </p>
      </div>
    );
  }

  const linkToEdit = editingLink
    ? links.find((l) => l._id === editingLink)
    : null;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Cover Photo Banner */}
      <div className="w-full h-64 bg-muted relative overflow-hidden">
        {userByHandle.coverUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={userByHandle.coverUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        {isOwner && <CoverUpload />}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Profile Picture + Handle/Bio Section - Overlapping the banner */}
        <div className="relative -mt-32 mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              {isOwner ? (
                <AvatarUpload />
              ) : (
                userByHandle.avatarUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={userByHandle.avatarUrl}
                    alt="Profile"
                    className="w-64 h-64 rounded-full object-cover border-4 border-background shadow-lg bg-background"
                  />
                )
              )}
            </div>

            {/* Handle and Bio - Positioned to the right, vertically centered */}
            <div className="flex-1 min-w-0 space-y-1">
              <h1 className="text-4xl font-bold">@{handle}</h1>
              {isOwner ? (
                <BioForm />
              ) : (
                userByHandle.bio && (
                  <p className="text-base text-muted-foreground">
                    {userByHandle.bio}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 pb-12">
          {/* Left Column - Settings (Owner Only) */}
          {isOwner && (
            <div className="lg:col-span-3 space-y-6">
              <ThemeSelector />
              <PlanInfo />
            </div>
          )}

          {/* Right Column - Profile Content */}
          <div className={isOwner ? "lg:col-span-9" : "lg:col-span-12"}>
            <div className="space-y-6">
              {/* Add Link Form */}
              {isOwner && (links.length < 3 || hasUnlimitedLinks) && <AddLinkForm />}

              {/* Links List */}
              {links.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {isOwner
                      ? "Add your first link to get started!"
                      : "This user hasn't added any links yet."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {links.map((link) => (
                    <LinkItem
                      key={link._id}
                      link={link}
                      onEdit={() => setEditingLink(link._id)}
                    />
                  ))}
                </div>
              )}

              {/* Limit Banner */}
              {isOwner && links.length >= 3 && !hasUnlimitedLinks && (
                <LimitBanner />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Link Modal */}
      {linkToEdit && (
        <EditLinkForm link={linkToEdit} onClose={() => setEditingLink(null)} />
      )}
    </div>
  );
}
