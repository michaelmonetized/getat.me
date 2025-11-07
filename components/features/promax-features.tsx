"use client";

import { FeatureGate } from "./feature-gate";
import { PostsWidget } from "./posts-widget";
import { PaymentWidget } from "./payment-widget";
import { CommissionsDashboard } from "./commissions-dashboard";
import { VerificationBadge } from "./verification-badge";
import { CreditCard, Shield, Sparkles, Wallet, Award } from "lucide-react";

export function ProMaxFeatures() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">ProMax Features</h2>
        <p className="text-muted-foreground mb-6">
          Unlock payment processing, verification, and advanced customization
          with ProMax.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FeatureGate
          title="Accept Payments"
          description="Charge customers for appointments directly"
          requiredPlan="promax"
          icon={CreditCard}
        >
          <PaymentWidget />
        </FeatureGate>

        <FeatureGate
          title="Referral Commissions"
          description="Earn commissions from referrals"
          requiredPlan="promax"
          icon={Wallet}
        >
          <CommissionsDashboard />
        </FeatureGate>

        <FeatureGate
          title="Verification Badge"
          description="Get verified and build trust"
          requiredPlan="promax"
          icon={Shield}
        >
          <VerificationBadge type="verified" />
        </FeatureGate>

        <FeatureGate
          title="Vetted Badge"
          description="Display your vetted status"
          requiredPlan="promax"
          icon={Award}
        >
          <VerificationBadge type="vetted" />
        </FeatureGate>
      </div>
    </div>
  );
}
