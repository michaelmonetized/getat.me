"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@clerk/clerk-react/experimental";
import { useAuth } from "@clerk/nextjs";

export function PlanInfo() {
  const { has } = useAuth();

  // Define all available plans with planKeys and ordered by priority (highest first)
  const allPlans = [
    {
      name: "ProMax",
      price: "$14.99/mo",
      planKey: "promax",
      planId: "cplan_34mwfWNyDG0w7w1feCVi4tmm6y9",
    },
    {
      name: "Pro",
      price: "$7.99/mo",
      planKey: "pro",
      planId: "cplan_34mvyFU9PuD9UMnKRtBd8SKF8Lf",
    },
    {
      name: "Premium",
      price: "$3.99/mo",
      planKey: "premium",
      planId: "cplan_34pOGvuXdApGqi7sL9jOGmt0NUu",
    },
  ];

  // Determine current plan based on highest tier
  // Since plans are ordered by priority (highest first), find first matching plan
  const currentPlan = allPlans.find((plan) =>
    has?.({ plan: plan.planKey })
  ) || { name: "FREE", price: "$0/mo" };

  // Filter plans to show only upgrades based on current plan
  const getUpgradePlans = () => {
    if (currentPlan.name === "ProMax") {
      return []; // Don't show anything if they have ProMax
    } else if (currentPlan.name === "Pro") {
      return [allPlans[0]]; // Show ProMax for Pro users
    } else if (currentPlan.name === "Premium") {
      return [allPlans[1], allPlans[0]]; // Show Pro and ProMax for Premium users
    } else {
      // FREE users see all upgrades
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
            {currentPlan.name}{" "}
            <span className="text-muted-foreground font-normal">
              {currentPlan.price}
            </span>
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
