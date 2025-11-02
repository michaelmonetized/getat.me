"use client";

import { PricingTable } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PricingPage = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Pricing Plans</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Upgrade or downgrade at any
          time.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <PricingTable
            appearance={{
              elements: {
                // Root container
                rootBox: "w-full",

                // Main pricing table container
                pricingTable:
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",

                // Individual pricing card
                pricingTableCard:
                  "rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col",

                // Card header
                pricingTableCardHeader: "space-y-4 mb-6",
                pricingTableCardTitleContainer: "space-y-2",
                pricingTableCardTitle:
                  "text-2xl font-bold text-card-foreground",
                pricingTableCardDescription: "text-sm text-muted-foreground",

                // Price/fee display
                pricingTableCardFeeContainer: "flex items-baseline gap-2 mb-2",
                pricingTableCardFee: "text-3xl font-bold text-primary",
                pricingTableCardFeePeriod: "text-sm text-muted-foreground",
                pricingTableCardFeePeriodNotice:
                  "text-xs text-muted-foreground font-medium",

                // Period toggle switch
                pricingTableCardPeriodToggle: "mt-4",

                // Features list
                pricingTableCardFeatures: "flex-1",
                pricingTableCardFeaturesList: "space-y-3",
                pricingTableCardFeaturesListItem:
                  "flex items-start gap-2 text-sm",
                pricingTableCardFeaturesListItemContent: "flex-1",
                pricingTableCardFeaturesListItemTitle: "text-muted-foreground",

                // Card footer
                pricingTableCardFooter: "mt-6 pt-4 border-t border-border",
                pricingTableCardFooterButton: "w-full",
                pricingTableCardFooterNotice:
                  "text-xs text-center text-muted-foreground",

                // Badge elements
                badge:
                  "inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-md",
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
              <strong className="text-foreground font-bold">
                Can I change plans later?
              </strong>
              <p>
                Yes! You can upgrade or downgrade your plan at any time. Changes
                will be applied immediately.
              </p>
            </div>
            <div>
              <strong className="text-foreground font-bold">
                What payment methods do you accept?
              </strong>
              <p>
                We accept all major credit cards and other payment methods
                through Clerk&apos;s secure payment processing.
              </p>
            </div>
            <div>
              <strong className="text-foreground font-bold">
                Is there a free trial?
              </strong>
              <p>
                The free plan is available forever with no credit card required.
                Try out our paid plans risk-free!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingPage;
