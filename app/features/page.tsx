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
} from "react-icons/pi";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const badge_colors = {
  free: "bg-muted text-muted-foreground",
  premium: "bg-secondary text-secondary-foreground",
  pro: "bg-primary text-primary-foreground",
  promax: "bg-accent text-accent-foreground",
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
  <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-xs transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 flex flex-col">
    <CardHeader className="shrink">
      <div className="flex justify-between gap-4">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="grow">
      <p>{description}</p>
    </CardContent>
    <CardFooter className="shrink">
      {category && (
        <div className="flex flex-wrap justify-center items-center w-full gap-2">
          {category.split(", ").map((c) => (
            <Badge
              key={c}
              variant="outline"
              className={cn(
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
}: {
  title: string;
  description: string;
  features: Array<{
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    category?: string;
  }>;
}) => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="gap-6 grid grid-cols-2 md:grid-cols-3">
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
        "Add as many links as you like to your page on paid plans, free plans are limited to 3 links.",
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
      description: "Add as many links as you like to your page.",
      category: "Premium, Pro, ProMax",
    },
    {
      icon: PiCalendarLight,
      title: "Booking Form",
      description:
        "Add a booking form to your link page that syncs with your Google Calendar. Let visitors book time with you seamlessly.",
      category: "Pro, ProMax",
    },
    {
      icon: PiUsersLight,
      title: "Referrals",
      description:
        "Recommend other professionals and build a network. Help your audience discover trusted partners and colleagues.",
      category: "Pro, ProMax",
    },
    {
      icon: PiStarLight,
      title: "Social Proof",
      description:
        "Display your ratings and reviews prominently. Let visitors see what others have to say about working with you.",
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
        "Track your page performance with detailed analytics. See who's visiting and which links are most popular.",
      category: "Pro, ProMax",
    },
    {
      icon: PiBellLight,
      title: "Notifications",
      description:
        "Stay informed with real-time notifications for bookings, messages, and other important interactions.",
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
        "Get vetted through our process and display your vetted badge. Show that you've been thoroughly reviewed.",
      category: "ProMax",
    },
  ];

  return (
    <div className="flex min-h-dvh min-w-dvw w-full flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50 bg-linear-to-b from-background via-background to-muted/20 py-24 pt-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <PiShootingStarLight className="h-4 w-4" />
              <span>Everything You Need</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
              Powerful Features for
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Your Link Page
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              Create a truly engaging link page that connects you with your
              audience. From simple links to bookings, payments, and more.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/pricing">View Pricing</Link>
              </Button>
              <Button asChild size="lg" className="text-base">
                <Link href="/register">Get Started Free</Link>
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
      />

      {/* Divider */}
      <div className="border-t border-border/50" />

      {/* Pro Features */}
      <div className="bg-muted/20">
        <FeatureSection
          title="Pro Features"
          description="Take your link page to the next level with advanced engagement tools and social proof."
          features={proFeatures}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-border/50" />

      {/* ProMax Features */}
      <FeatureSection
        title="ProMax Features"
        description="Unlock the full potential with payment processing, verification, and advanced customization."
        features={proMaxFeatures}
      />

      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border/50 bg-linear-to-b from-muted/20 to-background py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <PiCheckCircleLight className="mx-auto mb-6 h-16 w-16 text-primary" />
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of creators, professionals, and businesses using
              Get At Me to connect with their audience.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/pricing">See Plans & Pricing</Link>
              </Button>
              <Button asChild size="lg" className="text-base">
                <Link href="/register">Create Your Page</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
