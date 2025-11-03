"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureGate } from "./feature-gate";
import { Calendar, Users, Star, MessageCircle, BarChart3, Bell } from "lucide-react";

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
          <Card>
            <CardHeader>
              <CardTitle>Booking Form</CardTitle>
              <CardDescription>
                Configure your booking availability and calendar sync
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Booking form management UI coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Referrals"
          description="Recommend other professionals and build your network"
          requiredPlan="pro"
          icon={Users}
        >
          <Card>
            <CardHeader>
              <CardTitle>Referrals</CardTitle>
              <CardDescription>
                Manage your professional referrals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Referral management UI coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Social Proof"
          description="Display ratings and reviews prominently"
          requiredPlan="pro"
          icon={Star}
        >
          <Card>
            <CardHeader>
              <CardTitle>Social Proof</CardTitle>
              <CardDescription>
                Manage your ratings and reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Social proof management UI coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Live Messaging"
          description="Engage with visitors in real-time"
          requiredPlan="pro"
          icon={MessageCircle}
        >
          <Card>
            <CardHeader>
              <CardTitle>Live Messaging</CardTitle>
              <CardDescription>
                Chat with visitors in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Live messaging UI coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Analytics"
          description="Track your page performance with detailed insights"
          requiredPlan="pro"
          icon={BarChart3}
        >
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View your page performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Analytics dashboard coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Notifications"
          description="Stay informed with real-time updates"
          requiredPlan="pro"
          icon={Bell}
        >
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Notification settings coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>
      </div>
    </div>
  );
}
