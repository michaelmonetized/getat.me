"use client";

import { FeatureGate } from "./feature-gate";
import { BookingWidget } from "./booking-widget";
import { ReferralsManagement } from "./referrals-management";
import { SocialProofWidget } from "./social-proof-widget";
import { LiveMessagingWidget } from "./live-messaging-widget";
import { AnalyticsDashboard } from "./analytics-dashboard";
import { NotificationsWidget } from "./notifications-widget";
import {
  Calendar,
  Users,
  Star,
  MessageCircle,
  BarChart3,
  Bell,
} from "lucide-react";

export function ProFeatures() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Pro Features</h2>
        <p className="text-muted-foreground mb-6">
          Unlock advanced engagement tools and social proof with a Pro plan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FeatureGate
          title="Booking Form"
          description="Let visitors book time with you seamlessly"
          requiredPlan="pro"
          icon={Calendar}
        >
          <BookingWidget />
        </FeatureGate>

        <FeatureGate
          title="Referrals"
          description="Recommend other professionals and build your network"
          requiredPlan="pro"
          icon={Users}
        >
          <ReferralsManagement />
        </FeatureGate>

        <FeatureGate
          title="Social Proof"
          description="Display ratings and reviews prominently"
          requiredPlan="pro"
          icon={Star}
        >
          <SocialProofWidget />
        </FeatureGate>

        <FeatureGate
          title="Live Messaging"
          description="Engage with visitors in real-time"
          requiredPlan="pro"
          icon={MessageCircle}
        >
          <LiveMessagingWidget />
        </FeatureGate>

        <FeatureGate
          title="Analytics"
          description="Track your page performance with detailed insights"
          requiredPlan="pro"
          icon={BarChart3}
        >
          <AnalyticsDashboard />
        </FeatureGate>

        <FeatureGate
          title="Notifications"
          description="Stay informed with real-time updates"
          requiredPlan="pro"
          icon={Bell}
        >
          <NotificationsWidget />
        </FeatureGate>
      </div>
    </div>
  );
}
