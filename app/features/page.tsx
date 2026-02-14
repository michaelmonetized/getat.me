"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  PiBellLight,
  PiCalendarLight,
  PiChartBarLight,
  PiChatCircleLight,
  PiCheckCircleLight,
  PiChecksLight,
  PiClockClockwiseLight,
  PiCreditCardLight,
  PiGlobeLight,
  PiLinkLight,
  PiPaletteLight,
  PiShootingStarLight,
  PiStarLight,
  PiUsersLight,
  PiWalletLight,
  PiArrowRightLight,
  PiCrownLight,
  PiDiamondLight,
} from "react-icons/pi";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const badge_colors = {
  free: "bg-muted/50 text-muted-foreground border-muted",
  premium: "bg-secondary/10 text-secondary border-secondary/30",
  pro: "bg-primary/10 text-primary border-primary/30",
  promax: "bg-accent text-accent-foreground border-accent-foreground/20",
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  category,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  category?: string;
}) => (
  <Card className="group relative overflow-hidden border-border/40 bg-card/30 backdrop-blur-xs transition-all duration-300 hover:border-primary/40 hover:bg-card/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 flex flex-col">
    <CardHeader className="shrink">
      <div className="flex justify-between gap-4">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="grow">
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
    <CardFooter className="shrink pt-2">
      {category && (
        <div className="flex flex-wrap gap-2">
          {category.split(", ").map((c) => (
            <Badge
              key={c}
              variant="outline"
              className={cn(
                "text-[0.65rem] px-2 py-0.5",
                badge_colors[c.toLowerCase() as keyof typeof badge_colors]
              )}
            >
              {c}
            </Badge>
          ))}
        </div>
      )}
    </CardFooter>
  </Card>
);

const FeatureSection = ({
  title,
  description,
  features,
  icon: SectionIcon,
  accentColor,
}: {
  title: string;
  description: string;
  features: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    category?: string;
  }>;
  icon?: React.ComponentType<{ className?: string }>;
  accentColor?: string;
}) => (
  <section className="py-20 md:py-28">
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center space-y-4">
        {SectionIcon && (
          <div className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold",
            accentColor || "border-primary/20 bg-primary/10 text-primary"
          )}>
            <SectionIcon className="h-4 w-4" />
            <span>{title}</span>
          </div>
        )}
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  </section>
);

export default function FeaturesPage() {
  const coreFeatures = [
    {
      icon: PiLinkLight,
      title: "Links Links Links",
      description:
        "Add as many links as you like to your page on paid plans. Free plans include 3 links to get you started.",
      category: "Free, Premium, Pro, ProMax",
    },
    {
      icon: PiPaletteLight,
      title: "Custom Branding",
      description:
        "Personalize your profile with color themes, a cover photo, and a picture that represents your unique style.",
      category: "Free, Premium, Pro, ProMax",
    },
    {
      icon: PiGlobeLight,
      title: "Your Personal Handle",
      description:
        "Get your own personalized handle like getat.me/yourname. Easy to remember, easy to share.",
      category: "Free, Premium, Pro, ProMax",
    },
  ];

  const proFeatures = [
    {
      icon: PiLinkLight,
      title: "Unlimited Links",
      description:
        "No limits on how many links you can add. Organize them your way with categories and drag-and-drop ordering.",
      category: "Premium, Pro, ProMax",
    },
    {
      icon: PiCalendarLight,
      title: "Booking Form",
      description:
        "Add a booking form that syncs with your Google Calendar. Let visitors book time with you seamlessly.",
      category: "Pro, ProMax",
    },
    {
      icon: PiUsersLight,
      title: "Referrals",
      description:
        "Recommend other professionals and build a trusted network. Help your audience discover partners and colleagues.",
      category: "Pro, ProMax",
    },
    {
      icon: PiStarLight,
      title: "Social Proof",
      description:
        "Display ratings and reviews prominently. Let visitors see what others say about working with you.",
      category: "Pro, ProMax",
    },
    {
      icon: PiChatCircleLight,
      title: "Live Messaging",
      description:
        "Engage with visitors in real-time through live messaging. Build connections and answer questions instantly.",
      category: "Pro, ProMax",
    },
    {
      icon: PiChartBarLight,
      title: "Analytics",
      description:
        "Track your page performance with detailed analytics. See who visits and which links convert best.",
      category: "Pro, ProMax",
    },
    {
      icon: PiBellLight,
      title: "Notifications",
      description:
        "Stay informed with real-time notifications for bookings, messages, and important interactions.",
      category: "Pro, ProMax",
    },
  ];

  const proMaxFeatures = [
    {
      icon: PiCreditCardLight,
      title: "Accept Payments",
      description:
        "Charge customers for appointments directly through your booking form. Get paid seamlessly and securely.",
      category: "ProMax",
    },
    {
      icon: PiClockClockwiseLight,
      title: "Custom Availability",
      description:
        "Set custom booking availability schedules. Control exactly when visitors can book time with you.",
      category: "ProMax",
    },
    {
      icon: PiCheckCircleLight,
      title: "Verification Badge",
      description:
        "Get verified and display your verification badge. Build trust and credibility with your audience.",
      category: "ProMax",
    },
    {
      icon: PiShootingStarLight,
      title: "Rich Media Posts",
      description:
        "Create engaging rich media posts to showcase your work, announcements, or updates on your page.",
      category: "ProMax",
    },
    {
      icon: PiWalletLight,
      title: "Referral Commissions",
      description:
        "Earn commissions when referrals you send convert. Build your income while helping others grow.",
      category: "ProMax",
    },
    {
      icon: PiChecksLight,
      title: "Vetted Badge",
      description:
        "Get vetted through our process and display your vetted badge. Show that you have been thoroughly reviewed.",
      category: "ProMax",
    },
  ];

  return (
    <div className="flex min-h-dvh min-w-dvw w-full flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 py-28 pt-36">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-radial-[at_50%_0%] from-primary/20 via-transparent to-transparent blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-radial-[at_0%_100%] from-secondary/15 to-transparent blur-3xl" />
        <div className="absolute top-1/4 right-0 h-48 w-48 bg-radial-[at_100%_50%] from-primary/10 to-transparent blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary animate-fade-in">
              <PiShootingStarLight className="h-4 w-4" />
              <span>Everything You Need</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl animate-fade-in-up">
              Powerful features for
              <br />
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                your link page
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed animate-fade-in-up-delay-1">
              Create a truly engaging link page that connects you with your
              audience. From simple links to bookings, payments, and more.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up-delay-2">
              <Button asChild size="lg" className="text-base px-8 h-12">
                <Link href="/register">
                  Get Started Free
                  <PiArrowRightLight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 h-12">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <FeatureSection
        title="Core Features"
        description="Everything you need to create and customize your perfect link page. Available on all plans."
        features={coreFeatures}
        icon={PiGlobeLight}
        accentColor="border-primary/20 bg-primary/10 text-primary"
      />

      {/* Divider */}
      <div className="max-w-4xl mx-auto w-full border-t border-border/30" />

      {/* Pro Features */}
      <div className="bg-card/10">
        <FeatureSection
          title="Pro Features"
          description="Take your link page to the next level with advanced engagement tools and social proof."
          features={proFeatures}
          icon={PiCrownLight}
          accentColor="border-secondary/20 bg-secondary/10 text-secondary"
        />
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto w-full border-t border-border/30" />

      {/* ProMax Features */}
      <FeatureSection
        title="ProMax Features"
        description="Unlock the full potential with payment processing, verification, and advanced customization."
        features={proMaxFeatures}
        icon={PiDiamondLight}
        accentColor="border-primary/20 bg-primary/10 text-primary"
      />

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border/40 py-28">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 bg-radial-[at_50%_0%] from-primary/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-48 w-96 bg-radial-[at_50%_100%] from-secondary/10 to-transparent blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center space-y-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 animate-float">
              <PiCheckCircleLight className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Join thousands of creators, professionals, and businesses using
              Get At Me to connect with their audience.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-base px-8 h-12">
                <Link href="/register">
                  Create Your Page
                  <PiArrowRightLight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 h-12">
                <Link href="/pricing">See Plans & Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
