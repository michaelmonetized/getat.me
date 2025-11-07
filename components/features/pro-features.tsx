"use client";

import { FeatureGate } from "./feature-gate";
import { AnalyticsDashboard } from "./analytics-dashboard";
import { NotificationsWidget } from "./notifications-widget";
import { BarChart3, Bell } from "lucide-react";

export function ProFeatures() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Pro Features</h2>
        <p className="text-muted-foreground mb-6">
          Unlock advanced engagement tools and social proof with a Pro plan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <FeatureGate
            title="Analytics"
            description="Track your page performance with detailed insights"
            requiredPlan="pro"
            icon={BarChart3}
          >
            <AnalyticsDashboard />
          </FeatureGate>
        </div>

        <div>
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
    </div>
  );
}
