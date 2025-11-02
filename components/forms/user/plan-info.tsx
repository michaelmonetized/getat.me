"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@clerk/clerk-react/experimental";
import { useAuth } from "@clerk/nextjs";

export function PlanInfo() {
  const { has } = useAuth();
  
  // Check which plans the user has access to from Clerk
  const hasProMax = has?.({ plan: "cplan_34mwfWNyDG0w7w1feCVi4tmm6y9" }) ?? false;
  const hasPro = has?.({ plan: "cplan_34mvyFU9PuD9UMnKRtBd8SKF8Lf" }) ?? false;
  const hasPremium = has?.({ plan: "cplan_34pOGvuXdApGqi7sL9jOGmt0NUu" }) ?? false;
  
  // Determine current plan based on highest tier
  let planName = "Basic";
  let planPrice = "$0/mo";
  
  if (hasProMax) {
    planName = "ProMax";
    planPrice = "$14.99/mo";
  } else if (hasPro) {
    planName = "Pro";
    planPrice = "$7.99/mo";
  } else if (hasPremium) {
    planName = "Premium";
    planPrice = "$3.99/mo";
  }

  // Define all available plans
  const allPlans = [
    {
      name: "Premium",
      price: "$3.99/mo",
      planId: "cplan_34pOGvuXdApGqi7sL9jOGmt0NUu",
    },
    {
      name: "Pro",
      price: "$7.99/mo",
      planId: "cplan_34mvyFU9PuD9UMnKRtBd8SKF8Lf",
    },
    {
      name: "ProMax",
      price: "$14.99/mo",
      planId: "cplan_34mwfWNyDG0w7w1feCVi4tmm6y9",
    },
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
            <span className="text-muted-foreground font-normal">
              {planPrice}
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
