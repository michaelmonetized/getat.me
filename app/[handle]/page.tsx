"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser, useAuth } from "@clerk/nextjs";
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
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { ProFeatures } from "@/components/features/pro-features";
import { ProMaxFeatures } from "@/components/features/promax-features";
import { PublicBookingWidget } from "@/components/features/public-booking-widget";
import { RecommendationsWidget } from "@/components/features/recommendations-widget";
import { ReferralsWidget } from "@/components/features/referrals-widget";
import { LiveChatWidget } from "@/components/features/live-chat-widget";
import { ReferralsTables } from "@/components/features/referrals-tables";
import { MessageThreads } from "@/components/features/message-threads";
import { BookingSection } from "@/components/features/booking-section";

export default function ProfilePage() {
  const params = useParams();
  const handle = params.handle as string;
  const { user: currentUser } = useUser();
  const { has } = useAuth();
  const [editingLink, setEditingLink] = useState<Id<"links"> | null>(null);

  const userByHandle = useQuery(api.users.getUserByHandle, { handle });
  const currentUserProfile = useQuery(
    api.users.getCurrentUserProfile,
    currentUser?.id ? { userId: currentUser.id } : "skip"
  );
  const links = useQuery(api.links.getUserLinksByHandle, { handle });

  // Check if user has unlimited_links feature from Clerk
  const hasUnlimitedLinks = has?.({ feature: "unlimited_links" }) ?? false;

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
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-black handle-heading">@{handle}</h1>
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  if (!userByHandle) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-black handle-heading">
            @{handle} not found
          </h1>
          <p className="text-muted-foreground">
            The user @{handle} doesn&apos;t exist.
          </p>
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Claim this handle</h2>
            <SignUpButton>
              <Button variant="outline">Claim @{handle} now!</Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    );
  }

  const linkToEdit = editingLink
    ? links?.find((l) => l._id === editingLink)
    : null;

  return (
    <div className="flex min-h-screen flex-col w-full">
      {/* Cover Photo Banner */}
      {userByHandle && (
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
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Profile Picture + Handle/Bio Section - Overlapping the banner */}
        {userByHandle && (
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
                <h1 className="text-2xl font-black handle-heading">
                  @{handle}
                </h1>
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
        )}

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 pb-12">
          {/* Left Column - Settings (Owner) or Sidebar (Public) */}
          {isOwner ? (
            <div className="lg:col-span-3 space-y-6">
              <ThemeSelector />
              <PlanInfo />
            </div>
          ) : (
            <div className="lg:col-span-3 space-y-6">
              {userByHandle && (
                <>
                  <RecommendationsWidget userId={userByHandle.userId} handle={handle} />
                  <ReferralsWidget userId={userByHandle.userId} handle={handle} />
                </>
              )}
            </div>
          )}

          {/* Right Column - Profile Content */}
          <div className={isOwner ? "lg:col-span-9" : "lg:col-span-9"}>
            <div className="space-y-6">
              {/* Add Link Form */}
              {isOwner && links && (links.length < 3 || hasUnlimitedLinks) && (
                <AddLinkForm />
              )}

              {/* Links List */}
              {links && links.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {isOwner
                      ? "Add your first link to get started!"
                      : "This user hasn't added any links yet."}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {links?.map((link) => (
                    <LinkItem
                      key={link._id}
                      link={link}
                      onEdit={() => setEditingLink(link._id)}
                    />
                  ))}
                </div>
              )}

              {/* Limit Banner */}
              {isOwner && links && links.length >= 3 && !hasUnlimitedLinks && (
                <LimitBanner />
              )}

              {/* Public Booking Widget - Only show to visitors when booking is enabled */}
              {!isOwner && userByHandle && (
                <PublicBookingWidget userId={userByHandle.userId} />
              )}

              {/* Live Chat Widget - Floating */}
              {!isOwner && userByHandle && (
                <LiveChatWidget profileUserId={userByHandle.userId} profileHandle={handle} />
              )}

              {/* Owner-only sections */}
              {isOwner && (
                <>
                  {/* Booking Section - Separate from features */}
                  <div className="border-t border-border/50 pt-8">
                    <BookingSection />
                  </div>

                  {/* Referrals Tables */}
                  <div className="border-t border-border/50 pt-8">
                    <ReferralsTables />
                  </div>

                  {/* Message Threads */}
                  <div className="border-t border-border/50 pt-8">
                    <MessageThreads />
                  </div>

                  {/* Pro Features Section */}
                  <div className="border-t border-border/50 pt-8">
                    <ProFeatures />
                  </div>

                  {/* ProMax Features Section */}
                  <div className="border-t border-border/50 pt-8">
                    <ProMaxFeatures />
                  </div>
                </>
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
