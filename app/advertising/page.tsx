import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PiMegaphoneLight,
  PiTargetLight,
  PiChartBarLight,
  PiUsersLight,
  PiHandshakeLight,
  PiArrowRightLight,
  PiEnvelopeSimpleLight,
} from "react-icons/pi";

export default function AdvertisingPage() {
  const benefits = [
    {
      icon: PiTargetLight,
      title: "Reach Engaged Audiences",
      description:
        "Get your brand in front of creators, entrepreneurs, and professionals who are actively building their online presence.",
    },
    {
      icon: PiUsersLight,
      title: "High-Intent Visitors",
      description:
        "Our users are business-minded individuals who invest in tools and services to grow. Your ads reach decision-makers, not passive scrollers.",
    },
    {
      icon: PiChartBarLight,
      title: "Transparent Reporting",
      description:
        "Full visibility into impressions, clicks, and engagement. We believe in data-driven partnerships with clear ROI measurement.",
    },
    {
      icon: PiHandshakeLight,
      title: "Brand-Safe Environment",
      description:
        "Get At Me is a professional platform built for creators and service providers. Your brand appears alongside quality content.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 py-28 pt-36">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute -top-24 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-radial-[at_50%_0%] from-primary/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 bg-radial-[at_0%_100%] from-secondary/10 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary animate-fade-in">
            <PiMegaphoneLight className="h-4 w-4" />
            <span>Partner With Us</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">
            Advertise on
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Get At Me
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay-1">
            Reach creators, consultants, and service professionals who are
            building their brands. Put your product in front of people who care
            about growth.
          </p>
          <div className="animate-fade-in-up-delay-2">
            <Button asChild size="lg" className="px-8 h-12 text-base">
              <Link href="/contact">
                Get In Touch
                <PiArrowRightLight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              Why advertise with us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get At Me connects brands with an engaged audience of
              professionals who are actively investing in their online presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group overflow-hidden border-border/40 bg-card/30 backdrop-blur-xs transition-all duration-300 hover:border-primary/40 hover:bg-card/50 hover:shadow-xl hover:shadow-primary/5"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold pt-2">
                      {benefit.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 px-4 border-t border-border/30 bg-card/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, straightforward, and designed for mutual success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Reach Out",
                description:
                  "Tell us about your brand, goals, and ideal audience. We will design a campaign that fits.",
              },
              {
                step: "02",
                title: "We Customize",
                description:
                  "Our team crafts placements that feel native to the platform -- not intrusive, not ignored.",
              },
              {
                step: "03",
                title: "You Grow",
                description:
                  "Launch your campaign, track results in real time, and scale what works.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative text-center space-y-4 p-6"
              >
                <div className="text-6xl font-black text-primary/10 absolute top-0 right-4 select-none">
                  {item.step}
                </div>
                <h3 className="relative text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border/40 py-28">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 bg-radial-[at_50%_0%] from-primary/15 via-transparent to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 text-center space-y-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <PiEnvelopeSimpleLight className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight">
            Ready to partner?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We work with brands of all sizes. Tell us about your goals and
            we will put together a proposal tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8 h-12 text-base">
              <Link href="/contact">
                Contact Us
                <PiArrowRightLight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 h-12 text-base">
              <a href="mailto:contact@getatme.com">Email Directly</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
