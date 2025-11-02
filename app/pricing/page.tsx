"use client";

import { PricingTable } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PricingPage = () => {
  return (
    <div className="container mx-auto p-4 pt-24 space-y-8">
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
                  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full",

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

                // Card body
                pricingTableCardBody: "flex flex-col flex-1 min-h-0",

                // Features list
                pricingTableCardFeatures: "flex-1 min-h-0",
                pricingTableCardFeaturesList: "space-y-3",
                pricingTableCardFeaturesListItem:
                  "flex items-start gap-2 text-sm",
                pricingTableCardFeaturesListItemContent: "flex-1",
                pricingTableCardFeaturesListItemTitle: "text-muted-foreground",

                // Card footer
                pricingTableCardFooter: "mt-auto pt-4 border-t border-border",
                pricingTableCardFooterButton: "w-full",
                pricingTableCardFooterNotice:
                  "text-xs text-center text-muted-foreground",

                // Badge elements
                badge:
                  "inline-block bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-md",

                // Plan Details Drawer (cl-planDetails-root)
                planDetailsRoot: "w-full max-w-2xl",

                // Drawer backdrop
                drawerBackdrop: "bg-black/50 backdrop-blur-sm",

                // Drawer root
                drawerRoot:
                  "bg-card border border-border shadow-xl rounded-t-xl md:rounded-xl",
                drawerContent: "bg-card rounded-t-xl md:rounded-xl",

                // Drawer header
                drawerHeader: "border-b border-border px-6 pt-12 pb-6 relative",
                planDetailHeader: "space-y-6",
                planDetailBadgeAvatarTitleDescriptionContainer: "space-y-4",
                planDetailTitleDescriptionContainer: "space-y-3",
                planDetailTitle: "text-3xl font-bold text-card-foreground",
                planDetailDescription:
                  "text-base text-muted-foreground leading-relaxed",

                // Plan detail fee container
                planDetailFeeContainer: "flex items-baseline gap-2 my-4",
                planDetailFee: "text-4xl font-bold text-primary",
                planDetailFeePeriod: "text-base text-muted-foreground",

                // Plan detail period toggle
                planDetailPeriodToggle: "mt-4",

                // Drawer close button
                drawerClose:
                  "absolute top-4 right-4 hover:bg-accent rounded-full p-2 transition-colors",

                // Drawer body
                drawerBody:
                  "px-6 py-6 max-h-[calc(100vh-300px)] overflow-y-auto",
                planDetailCaption:
                  "text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6",

                // Plan detail features list
                planDetailFeaturesList: "space-y-1",
                planDetailFeaturesListItem:
                  "border-b border-border last:border-0 py-6",
                planDetailFeaturesListItemContent: "space-y-2",
                planDetailFeaturesListItemTitle:
                  "text-lg font-semibold text-card-foreground mb-2",
                planDetailFeaturesListItemDescription:
                  "text-sm text-muted-foreground leading-relaxed",

                // Ultrafine customizations
                pricingTableCard__promax:
                  "md:order-first md:col-span-full lg:col-span-1 lg:order-[3]",
                pricingTableCard__free_user: "order-last col-span-full",
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
