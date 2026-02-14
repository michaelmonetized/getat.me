"use client";

import Link from "next/link";
import { PricingTable } from "@clerk/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";
import {
  PiTagLight,
  PiArrowRightLight,
  PiCheckCircleLight,
} from "react-icons/pi";

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

  const pricingFaqs = [
    {
      q: "Can I change plans later?",
      a: "Yes. You can upgrade or downgrade your plan at any time from your dashboard. Changes take effect immediately and billing is prorated.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, debit cards, and other payment methods through our secure payment processing partner.",
    },
    {
      q: "Is there a free trial?",
      a: "The Free plan is available forever with no credit card required. You can try out the platform risk-free and upgrade when you are ready.",
    },
    {
      q: "What happens if I cancel?",
      a: "If you cancel a paid plan, you keep access to paid features until the end of your current billing period. After that, your account reverts to the Free plan.",
    },
    {
      q: "Do you offer refunds?",
      a: "We handle refunds on a case-by-case basis in accordance with applicable consumer protection laws. Contact us if you have concerns about your subscription.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 py-28 pt-36">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute -top-24 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-radial-[at_50%_0%] from-primary/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 bg-radial-[at_100%_100%] from-secondary/10 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary animate-fade-in">
            <PiTagLight className="h-4 w-4" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">
            Plans that grow
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}with you
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay-1">
            Start free, upgrade when you are ready. Every plan is designed to
            unlock more value as your audience grows.
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-6xl">{prices}</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 border-t border-border/40">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Pricing Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Common questions about billing, plans, and payments.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {pricingFaqs.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`pricing-faq-${idx}`}
                className="border border-border/50 rounded-lg px-6 bg-card/30 backdrop-blur-xs transition-all duration-300 hover:border-primary/30 hover:bg-card/60 data-[state=open]:border-primary/40 data-[state=open]:bg-card/50 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5 [&[data-state=open]]:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-[0.95rem] pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA below FAQ */}
          <div className="mt-16 text-center space-y-6">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <PiCheckCircleLight className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Still not sure?</h3>
            <p className="text-muted-foreground">
              Start with the free plan. No credit card, no commitment. Upgrade
              whenever you are ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/register">
                  Get Started Free
                  <PiArrowRightLight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Talk to Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
