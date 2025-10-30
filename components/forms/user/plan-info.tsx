"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
          <Button
            variant="outline"
            className="w-full justify-start bg-accent hover:bg-accent-hover border-accent text-accent-foreground"
          >
            Pro - $0.99/mo
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-secondary hover:bg-secondary-hover border-secondary text-secondary-foreground"
          >
            ProMax - $4.99/mo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
