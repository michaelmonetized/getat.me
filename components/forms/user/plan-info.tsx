"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@clerk/clerk-react/experimental";

export function PlanInfo() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="pb-3 px-0">
          <CardTitle className="text-base font-semibold">
            Current Plan:
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <p className="text-sm font-medium">
            Basic{" "}
            <span className="text-muted-foreground font-normal">$0/mo</span>
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="pb-3 px-0">
          <CardTitle className="text-base font-semibold">
            Upgrade Plan:
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 space-y-2">
          <CheckoutButton planId="cplan_34mvyFU9PuD9UMnKRtBd8SKF8Lf">
            <Button
              variant="outline"
              className="w-full justify-start bg-accent hover:bg-accent-hover border-accent text-accent-foreground"
            >
              Pro - $7.99/mo
            </Button>
          </CheckoutButton>
          <CheckoutButton planId="cplan_34mwfWNyDG0w7w1feCVi4tmm6y9">
            <Button
              variant="outline"
              className="w-full justify-start bg-secondary hover:bg-secondary-hover border-secondary text-secondary-foreground"
            >
              ProMax - $14.99/mo
            </Button>
          </CheckoutButton>
        </CardContent>
      </Card>
    </div>
  );
}
