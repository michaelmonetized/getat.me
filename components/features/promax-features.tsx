"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureGate } from "./feature-gate";
import { AvailabilityForm } from "./availability-form";
import {
  CreditCard,
  Clock,
  Shield,
  Sparkles,
  Wallet,
  Award,
  Zap,
  TrendingUp,
} from "lucide-react";

export function ProMaxFeatures() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">ProMax Features</h2>
        <p className="text-muted-foreground mb-6">
          Unlock payment processing, verification, and advanced customization with ProMax.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FeatureGate
          title="Accept Payments"
          description="Charge customers for appointments directly"
          requiredPlan="promax"
          icon={CreditCard}
        >
          <Card>
            <CardHeader>
              <CardTitle>Payment Processing</CardTitle>
              <CardDescription>
                Configure payment settings and pricing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Payment configuration UI coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Custom Availability"
          description="Set custom booking schedules"
          requiredPlan="promax"
          icon={Clock}
        >
          <AvailabilityForm />
        </FeatureGate>

        <FeatureGate
          title="Verification Badge"
          description="Get verified and build trust"
          requiredPlan="promax"
          icon={Shield}
        >
          <Card>
            <CardHeader>
              <CardTitle>Verification Badge</CardTitle>
              <CardDescription>
                Apply for verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Verification application coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Rich Media Posts"
          description="Create engaging posts on your page"
          requiredPlan="promax"
          icon={Sparkles}
        >
          <Card>
            <CardHeader>
              <CardTitle>Media Posts</CardTitle>
              <CardDescription>
                Create and manage rich media posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Media post editor coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Referral Commissions"
          description="Earn commissions from referrals"
          requiredPlan="promax"
          icon={Wallet}
        >
          <Card>
            <CardHeader>
              <CardTitle>Referral Commissions</CardTitle>
              <CardDescription>
                Track your referral earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Commission dashboard coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Vetted Badge"
          description="Display your vetted status"
          requiredPlan="promax"
          icon={Award}
        >
          <Card>
            <CardHeader>
              <CardTitle>Vetted Badge</CardTitle>
              <CardDescription>
                Apply for vetted status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Vetting application coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="No Branding"
          description="Remove all Get At Me branding"
          requiredPlan="promax"
          icon={Zap}
        >
          <Card>
            <CardHeader>
              <CardTitle>White Label</CardTitle>
              <CardDescription>
                Remove branding for a professional look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Branding toggle coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate
          title="Embed Widgets"
          description="Embed widgets anywhere on the web"
          requiredPlan="promax"
          icon={TrendingUp}
        >
          <Card>
            <CardHeader>
              <CardTitle>Embed Widgets</CardTitle>
              <CardDescription>
                Generate embed code for widgets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Widget generator coming soon
              </p>
            </CardContent>
          </Card>
        </FeatureGate>
      </div>
    </div>
  );
}
