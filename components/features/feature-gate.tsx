"use client";

import { useAuth } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckoutButton } from "@clerk/clerk-react/experimental";
import Link from "next/link";
import { Lock } from "lucide-react";
import plans from "@/config/plans";

interface FeatureGateProps {
  title: string;
  description: string;
  requiredPlan?: "premium" | "pro" | "promax";
  icon?: React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
}

export function FeatureGate({
  title,
  description,
  requiredPlan,
  icon: Icon,
  children,
}: FeatureGateProps) {
  const { has } = useAuth();

  // Check if user has the required plan
  const hasAccess = requiredPlan
    ? has?.({ plan: requiredPlan }) ?? false
    : true;

  if (hasAccess && children) {
    return <>{children}</>;
  }

  // Determine upgrade plan
  const upgradePlan =
    requiredPlan === "premium"
      ? plans.premium
      : requiredPlan === "pro"
      ? plans.pro
      : requiredPlan === "promax"
      ? plans.promax
      : null;

  return (
    <Card className="border-dashed">
      <CardHeader>
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {title}
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This feature is available on the {requiredPlan === "premium" ? "Premium" : requiredPlan === "pro" ? "Pro" : "ProMax"} plan.
          </p>
          {upgradePlan && (
            <div className="flex gap-2">
              <CheckoutButton planId={upgradePlan.id} mode="subscription">
                <Button>Upgrade to {upgradePlan.name}</Button>
              </CheckoutButton>
              <Button asChild variant="outline">
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
