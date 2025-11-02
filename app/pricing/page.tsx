"use client";

import { PricingTable } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PricingPage = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Pricing Plans</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Upgrade or downgrade at any time.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <PricingTable
            appearance={{
              elements: {
                rootBox: "w-full",
              },
            }}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div>
              <strong className="text-foreground font-bold">Can I change plans later?</strong>
              <p>Yes! You can upgrade or downgrade your plan at any time. Changes will be applied immediately.</p>
            </div>
            <div>
              <strong className="text-foreground font-bold">What payment methods do you accept?</strong>
              <p>We accept all major credit cards and other payment methods through Clerk&apos;s secure payment processing.</p>
            </div>
            <div>
              <strong className="text-foreground font-bold">Is there a free trial?</strong>
              <p>The free plan is available forever with no credit card required. Try out our paid plans risk-free!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingPage;
