"use client";

import { FeatureGate } from "./feature-gate";
import { PaymentWidget } from "./payment-widget";
import { CommissionsDashboard } from "./commissions-dashboard";
import { VerificationBadge } from "./verification-badge";
import {
  PiCreditCardLight,
  PiCheckCircleLight,
  PiWalletLight,
  PiChecksLight,
} from "react-icons/pi";

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
          icon={PiCreditCardLight}
        >
          <PaymentWidget />
        </FeatureGate>

        <FeatureGate
          title="Referral Commissions"
          description="Earn commissions from referrals"
          requiredPlan="promax"
          icon={PiWalletLight}
        >
          <CommissionsDashboard />
        </FeatureGate>

        <FeatureGate
          title="Verification Badge"
          description="Get verified and build trust"
          requiredPlan="promax"
          icon={PiCheckCircleLight}
        >
          <VerificationBadge type="verified" />
        </FeatureGate>

        <FeatureGate
          title="Vetted Badge"
          description="Display your vetted status"
          requiredPlan="promax"
          icon={PiChecksLight}
        >
          <VerificationBadge type="vetted" />
        </FeatureGate>
      </div>
    </div>
  );
}
