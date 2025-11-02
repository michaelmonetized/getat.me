"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@clerk/clerk-react/experimental";
import { useUser } from "@clerk/nextjs";

export function PlanInfo() {
  const { user } = useUser();
  const currentPlan = useQuery(
    api.users.getCurrentPlan,
    user?.id ? { userId: user.id } : "skip"
  );

  const planName = currentPlan?.name || "Basic";
  const planPrice = currentPlan?.price || "$0/mo";

  // Define all available plans
  const allPlans = [
    { name: "Premium", price: "$3.99/mo", planId: "cplan_34pOGvuXdApGqi7sL9jOGmt0NUu" },
    { name: "Pro", price: "$7.99/mo", planId: "cplan_34mvyFU9PuD9UMnKRtBd8SKF8Lf" },
    { name: "ProMax", price: "$14.99/mo", planId: "cplan_34mwfWNyDG0w7w1feCVi4tmm6y9" },
  ];

  // Filter plans to show only upgrades based on current plan
  const getUpgradePlans = () => {
    if (planName === "ProMax") {
      return []; // Don't show anything if they have ProMax
    } else if (planName === "Pro") {
      return [allPlans[2]]; // Show ProMax for Pro users
    } else if (planName === "Premium") {
      return [allPlans[1], allPlans[2]]; // Show Pro and ProMax for Premium users
    } else {
      // Basic users see all upgrades
      return allPlans;
    }
  };

  const upgradePlans = getUpgradePlans();

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
            {planName}{" "}
            <span className="text-muted-foreground font-normal">{planPrice}</span>
          </p>
        </CardContent>
      </Card>

      {upgradePlans.length > 0 && (
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="pb-3 px-0">
            <CardTitle className="text-base font-semibold">
              Upgrade Plan:
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 space-y-2">
            {upgradePlans.map((plan) => (
              <CheckoutButton key={plan.planId} planId={plan.planId}>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-accent hover:bg-accent-hover border-accent text-accent-foreground"
                >
                  <strong>{plan.name}</strong>
                  <small>{plan.price}</small>
                </Button>
              </CheckoutButton>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
