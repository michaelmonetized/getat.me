"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PiQuestionLight,
  PiEnvelopeSimpleLight,
  PiArrowRightLight,
} from "react-icons/pi";

export default function FAQPage() {
  const faqs = [
    {
      q: "What is Get At Me?",
      a: "Get At Me is a modern link-in-bio platform that helps you turn your audience into fans and customers. It goes beyond a simple link page with bookings, payments, referrals, social proof, and real-time messaging -- everything you need to build meaningful relationships from a single link.",
    },
    {
      q: "Is there a free plan?",
      a: "Yes. The Free plan is yours forever with up to 3 links, custom branding, and a personalized handle. When you're ready for more, upgrade anytime to unlock unlimited links, booking forms, analytics, and all the Pro and ProMax features.",
    },
    {
      q: "Can I change plans later?",
      a: "Absolutely. You can upgrade or downgrade at any time from your dashboard. Changes take effect immediately, and billing is prorated so you only pay for what you use.",
    },
    {
      q: "Do you support bookings and payments?",
      a: "Yes. The Pro plan includes booking forms that sync with your Google Calendar. ProMax adds the ability to charge for appointments, accept direct payments, and set custom availability schedules.",
    },
    {
      q: "How do referrals and social proof work?",
      a: "Pro and ProMax users can recommend other professionals, building a trusted network on their profile. Visitors can leave ratings and testimonials that display prominently, giving new visitors the confidence to connect, book, or buy.",
    },
    {
      q: "How do I get verified or vetted?",
      a: "Verification and vetting are available on all paid plans. Once you upgrade, you can apply for review. Verified accounts receive a badge that signals credibility to visitors. Vetting involves a more thorough review process for an additional trust badge.",
    },
    {
      q: "Can I post anything I want?",
      a: "You have full creative freedom on your profile. Post updates, share content, showcase your work. We only step in if content violates our Terms of Service. Think of it as your space, your rules -- with a safety net for the community.",
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
            <PiQuestionLight className="h-4 w-4" />
            <span>Got Questions?</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">
            Frequently Asked
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Questions
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay-1">
            Everything you need to know about plans, features, and using Get At Me.
            Can&rsquo;t find what you&rsquo;re looking for? Reach out to our team.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border border-border/50 rounded-lg px-6 bg-card/30 backdrop-blur-xs transition-all duration-300 hover:border-primary/30 hover:bg-card/60 data-[state=open]:border-primary/40 data-[state=open]:bg-card/50 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-5 [&[data-state=open]]:text-primary">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                      {idx + 1}
                    </span>
                    {item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-[0.95rem] pl-11 pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border/40 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 left-1/3 h-64 w-96 bg-radial-[at_50%_0%] from-secondary/10 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-2xl px-4 text-center space-y-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <PiEnvelopeSimpleLight className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Still have questions?
          </h2>
          <p className="text-muted-foreground text-lg">
            Our team is happy to help. Send us a message and we&rsquo;ll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button asChild size="lg">
              <Link href="/contact">
                Contact Us
                <PiArrowRightLight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
