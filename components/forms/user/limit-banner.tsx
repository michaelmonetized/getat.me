"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import plans from "@/config/plans";

export function LimitBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="relative bg-muted/80 rounded-lg p-6 space-y-4 border border-border">
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="pr-8">
        <h3 className="text-lg font-bold mb-3">Limit reached!</h3>
        <div className="space-y-2.5 text-sm text-muted-foreground">
          <p>
            Upgrade to Pro to add more links, and allow visitors to book time
            with you, receive referrals, list other pros you recommend, and
            send/receive messages live.
          </p>
          <p>
            Upgrade to ProMax to charge customers for bookings, set custom
            booking availability, get verified, create rich media posts, and get
            paid commission for referrals sent.
          </p>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button variant="outline" className="flex-1" asChild>
          <Link href="/pricing">Compare Plans</Link>
        </Button>
        <CheckoutButton planId={plans.promax.id}>
          <Button className="flex-1 bg-primary hover:bg-primary-hover border-primary">
            Get ProMax
          </Button>
        </CheckoutButton>
      </div>
    </div>
  );
}
