"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser, useAuth, SignedOut } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useMemo, useState, useEffect, useRef } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { trackPageView } from "@/lib/analytics";
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
import { FeatureGate } from "@/components/features/feature-gate";
import {
  PiCalendarLight,
  PiChatCircleLight,
  PiPaperPlaneTiltLight,
  PiShootingStarLight,
  PiStarLight,
} from "react-icons/pi";
import { Container } from "@/components/layout/container";
import { SocialProofWidget } from "@/components/features/social-proof-widget";
import { PublicPostsWidget } from "@/components/features/public-posts-widget";
import Image from "next/image";
import { PostsList } from "@/components/views/posts/list-all";
import AddPostForm from "@/components/forms/user/add-post";
import { User, useUser as useCombinedUser } from "@/hooks/user";

export default function ProfilePage() {
  const params = useParams();
  const handle = params.handle as string;
  const { user: currentUser } = useUser();
  const { has } = useAuth();
  const [editingLink, setEditingLink] = useState<Id<"links"> | null>(null);
  const hasTrackedPageView = useRef(false);

  const userByHandle = useQuery(api.users.getUserByHandle, { handle });
  const trackEvent = useMutation(api.analytics.trackEvent);
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

  // Track page view (only once, only for non-owners)
  useEffect(() => {
    if (userByHandle && !isOwner && !hasTrackedPageView.current) {
      hasTrackedPageView.current = true;
      // Track in Convex
      trackEvent({
        userId: userByHandle.userId,
        eventType: "page_view",
        eventData: {
          referrer: typeof window !== "undefined" ? document.referrer : undefined,
          userAgent: typeof window !== "undefined" ? navigator.userAgent : undefined,
        },
      }).catch((err) => console.error("Failed to track page view:", err));
      // Track in PostHog
      trackPageView(`/${handle}`);
    }
  }, [userByHandle, isOwner, handle, trackEvent]);

  // Apply theme class to the html element - must be before early returns
  const themeClass = userByHandle?.theme?.toLowerCase() || "mocha";

  useEffect(() => {
    document.documentElement.className = `theme-${themeClass}`;
    document.body.className = "antialiased";
  }, [themeClass]);

  const profileUser: User | undefined = useCombinedUser(
    userByHandle?.userId ?? ""
  );

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
          <SignedOut>
            <div className="space-y-4">
              <h2 className="text-lg font-bold">Claim this handle</h2>
              <SignUpButton>
                <Button variant="outline">Claim @{handle} now!</Button>
              </SignUpButton>
            </div>
          </SignedOut>
        </div>
      </div>
    );
  }

  const linkToEdit = editingLink
    ? links?.find((l) => l._id === editingLink)
    : null;

  return (
    <div className="flex min-h-screen flex-col w-full">
      {userByHandle && (
        <div className="w-full h-64 bg-muted relative overflow-hidden">
          {userByHandle.coverUrl ? (
            <Image
              src={userByHandle.coverUrl}
              alt="Cover"
              className="w-full h-full object-cover"
              width={1920}
              height={64}
            />
          ) : (
            <div className="bg-muted">
              <Image
                src="https://picsum.dev/1920/800"
                alt="Cover"
                className="w-full h-full object-cover opacity-50"
                width={1920}
                height={64}
              />
            </div>
          )}
          {isOwner && <CoverUpload />}
        </div>
      )}

      {/* Main Content */}
      <Container size="boxed" role="main">
        {/* Profile Picture + Handle/Bio Section - Overlapping the banner */}
        {userByHandle && (
          <div className="relative -mt-32 mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
              {/* Profile Picture */}
              <div className="shrink-0">
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
              <FeatureGate
                title="Social Proof"
                description="Manage your ratings and reviews."
                requiredPlan="pro"
                icon={PiStarLight}
              >
                <SocialProofWidget />
              </FeatureGate>

              <ThemeSelector />
              <PlanInfo />
            </div>
          ) : (
            <div className="lg:col-span-3 space-y-6">
              {userByHandle && (
                <>
                  <RecommendationsWidget
                    userId={userByHandle.userId}
                    handle={handle}
                  />
                  <ReferralsWidget
                    userId={userByHandle.userId}
                    handle={handle}
                  />
                </>
              )}
            </div>
          )}

          {/* Right Column - Profile Content */}
          <div className={isOwner ? "lg:col-span-9" : "lg:col-span-9"}>
            <div className="space-y-6">
              {isOwner && links && (
                <>
                  {/* Owner-only links section */}
                  {/* Add Link Form */}
                  {(links.length < 3 || hasUnlimitedLinks) && <AddLinkForm />}

                  {/* Limit Banner */}
                  {links.length >= 3 && !hasUnlimitedLinks && <LimitBanner />}
                </>
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
                      handle={handle}
                      isOwner={!!isOwner}
                      onEdit={() => setEditingLink(link._id)}
                    />
                  ))}
                </div>
              )}

              {/* Posts Section - Visible to everyone, but only ProMax owners can create */}
              {isOwner && (
                <FeatureGate
                  title="Rich Media Posts"
                  description="Create engaging posts on your page"
                  requiredPlan="promax"
                  icon={PiShootingStarLight}
                >
                  <AddPostForm />
                </FeatureGate>
              )}

              {/* Posts list - visible to everyone */}
              {userByHandle && (
                <PostsList
                  user={profileUser}
                  currentUserId={currentUser?.id}
                />
              )}

              {/* Booking Widget - Only show to visitors when owner has Pro */}
              {!isOwner && userByHandle && (
                <>
                  {userByHandle.subscriptionPlan === "pro" && (
                    <PublicBookingWidget userId={userByHandle.userId} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Owner-only sections */}
      {isOwner && (
        <Container size="boxed">
          {/* Booking Section - Separate from features */}
          <div className="py-4">
            <FeatureGate
              requiredPlan="pro"
              title="Booking Form"
              description="Let visitors book time with you seamlessly"
              icon={PiCalendarLight}
            >
              <BookingSection />
            </FeatureGate>
          </div>

          {/* Referrals Tables */}
          <div className="py-4">
            <FeatureGate
              requiredPlan="pro"
              title="Referrals"
              description="Track and manage your professional referrals"
              icon={PiPaperPlaneTiltLight}
            >
              <ReferralsTables />
            </FeatureGate>
          </div>
          {/* Message Threads */}
          <div className="py-4">
            <FeatureGate
              requiredPlan="pro"
              title="Messages"
              description="Engage with your visitors in real-time"
              icon={PiChatCircleLight}
            >
              <MessageThreads />
            </FeatureGate>
          </div>
          {/* Pro Features Section */}
          <div className="py-4">
            <FeatureGate
              requiredPlan="pro"
              title="Pro Features"
              description="Unlock advanced engagement tools, social proof, and more with a Pro plan."
              icon={PiStarLight}
            >
              <ProFeatures />
            </FeatureGate>
          </div>
          <div className="py-4">
            {/* ProMax Features Section */}
            <FeatureGate
              requiredPlan="promax"
              title="ProMax Features"
              description="Unlock advanced engagement tools, social proof, and more with a ProMax plan."
              icon={PiShootingStarLight}
            >
              <ProMaxFeatures />
            </FeatureGate>
          </div>
        </Container>
      )}

      {/* Edit Link Modal */}
      {linkToEdit && (
        <EditLinkForm link={linkToEdit} onClose={() => setEditingLink(null)} />
      )}

      {/* Live Chat Widget - Floating */}
      {!isOwner && userByHandle && (
        <LiveChatWidget
          profileUserId={userByHandle.userId}
          profileHandle={handle}
        />
      )}
    </div>
  );
}
