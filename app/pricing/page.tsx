"use client";

import { PricingTable } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo } from "react";

const PricingPage = () => {
  const prices = useMemo(
    () => (
      <PricingTable
        ctaPosition="bottom"
        newSubscriptionRedirectUrl="/upgraded/"
        appearance={{
          elements: {
            // Root container
            rootBox: "w-full my-20",

            // Main pricing table container
            pricingTable:
              "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full",

            // Individual pricing card
            pricingTableCard:
              "rounded-lg border border-border bg-card p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col",

            // Card header
            pricingTableCardHeader: "space-y-4 mb-6",
            pricingTableCardTitleContainer: "space-y-2",
            pricingTableCardTitle: "text-2xl font-bold text-card-foreground",
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
            pricingTableCardFeaturesListItem: "flex items-start gap-2 text-sm",
            pricingTableCardFeaturesListItemContent: "flex-1",
            pricingTableCardFeaturesListItemTitle: "text-muted-foreground",

            // Card footer
            pricingTableCardFooter:
              "mt-auto pt-4 border-t border-border text-right",
            // Match Button (default, size=lg) from components/ui/button.tsx
            pricingTableCardFooterButton:
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 h-11 px-8 w-fit ml-auto border-foreground/50",
            pricingTableCardFooterNotice:
              "text-xs text-center text-muted-foreground",

            // Badge elements
            badge:
              "inline-block bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-md",

            // Plan Details Drawer (cl-planDetails-root)
            planDetailsRoot: "w-full max-w-2xl",

            // Drawer backdrop
            drawerBackdrop: "bg-black/50 backdrop-blur-xs",

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
            drawerBody: "px-6 py-6 max-h-[calc(100vh-300px)] overflow-y-auto",
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
              "order-first col-span-full md:order-2 md:col-span-1 border-gradient-animated",
            pricingTableCard__free_user: "hidden",
          },
        }}
      />
    ),
    []
  );
  // after PricingTable renders we want to wrap .cl-pricingTableCard__promax with a div that has a border-gradient-animated class
  useEffect(() => {
    if (prices) {
      const pricingTableCardPromax = document.querySelector(
        ".cl-pricingTableCard__promax"
      );
      if (pricingTableCardPromax) {
        pricingTableCardPromax.classList.add("border-gradient-animated");
      }
    }
  }, [prices]);

  return (
    <div className="container mx-auto p-4 py-24 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Pricing Plans</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Upgrade or downgrade at any
          time.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">{prices}</div>
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
