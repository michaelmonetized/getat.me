"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Link as LinkIcon,
  Palette,
  Calendar,
  MessageCircle,
  CreditCard,
  Shield,
  Star,
  Users,
  Sparkles,
  Globe,
  Clock,
  CheckCircle2,
  Zap,
  BarChart3,
  Bell,
  FileText,
  Wallet,
  Award,
  TrendingUp,
  Heart,
} from "lucide-react";

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
  <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
    <CardHeader>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
        <Icon className="h-6 w-6" />
      </div>
      {category && (
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {category}
        </span>
      )}
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
      <CardDescription className="text-base leading-relaxed">
        {description}
      </CardDescription>
    </CardHeader>
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      icon: LinkIcon,
      title: "Unlimited Links",
      description:
        "Add as many links as you need to your page. Organize and customize each one to match your brand.",
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description:
        "Personalize your link page with custom colors, fonts, cover photos, and profile pictures that represent your unique style.",
    },
    {
      icon: Globe,
      title: "Your Personal Handle",
      description:
        "Get your own personalized handle like getat.me/yourname. Easy to remember, easy to share.",
    },
    {
      icon: FileText,
      title: "Rich Bio",
      description:
        "Tell your story with a rich bio that helps visitors understand who you are and what you do.",
    },
    {
      icon: Sparkles,
      title: "Emojis & Icons",
      description:
        "Add emojis and icons to your links to make them more engaging and visually appealing.",
    },
    {
      icon: Heart,
      title: "Contact Options",
      description:
        "Add your phone, email, and even a contact form to make it easy for visitors to reach out.",
    },
  ];

  const proFeatures = [
    {
      icon: Calendar,
      title: "Booking Form",
      description:
        "Add a booking form to your link page that syncs with your Google Calendar. Let visitors book time with you seamlessly.",
      category: "Pro",
    },
    {
      icon: Users,
      title: "Referrals",
      description:
        "Recommend other professionals and build a network. Help your audience discover trusted partners and colleagues.",
      category: "Pro",
    },
    {
      icon: Star,
      title: "Social Proof",
      description:
        "Display your ratings and reviews prominently. Let visitors see what others have to say about working with you.",
      category: "Pro",
    },
    {
      icon: MessageCircle,
      title: "Live Messaging",
      description:
        "Engage with visitors in real-time through live messaging. Build connections and answer questions instantly.",
      category: "Pro",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description:
        "Track your page performance with detailed analytics. See who's visiting and which links are most popular.",
      category: "Pro",
    },
    {
      icon: Bell,
      title: "Notifications",
      description:
        "Stay informed with real-time notifications for bookings, messages, and other important interactions.",
      category: "Pro",
    },
  ];

  const proMaxFeatures = [
    {
      icon: CreditCard,
      title: "Accept Payments",
      description:
        "Charge customers for appointments directly through your booking form. Get paid seamlessly and securely.",
      category: "ProMax",
    },
    {
      icon: Clock,
      title: "Custom Availability",
      description:
        "Set custom booking availability schedules. Control exactly when visitors can book time with you.",
      category: "ProMax",
    },
    {
      icon: Shield,
      title: "Verification Badge",
      description:
        "Get verified and display your verification badge. Build trust and credibility with your audience.",
      category: "ProMax",
    },
    {
      icon: Sparkles,
      title: "Rich Media Posts",
      description:
        "Create engaging rich media posts to showcase your work, announcements, or updates on your page.",
      category: "ProMax",
    },
    {
      icon: Wallet,
      title: "Referral Commissions",
      description:
        "Earn commissions when referrals you send convert. Build your income while helping others grow.",
      category: "ProMax",
    },
    {
      icon: Award,
      title: "Vetted Badge",
      description:
        "Get vetted through our process and display your vetted badge. Show that you've been thoroughly reviewed.",
      category: "ProMax",
    },
    {
      icon: Zap,
      title: "No Branding",
      description:
        "Remove all Get At Me branding from your page for a completely professional, white-label experience.",
      category: "ProMax",
    },
    {
      icon: TrendingUp,
      title: "Embed Widgets",
      description:
        "Embed your profile badge, rating widget, testimonials, booking widget, and more anywhere on the web.",
      category: "ProMax",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-background via-background to-muted/20 py-24 pt-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Everything You Need</span>
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
              Powerful Features for
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {" "}
                Your Link Page
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              Create a truly engaging link page that connects you with your
              audience. From simple links to bookings, payments, and more.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-base">
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
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
      <section className="relative overflow-hidden border-t border-border/50 bg-gradient-to-b from-muted/20 to-background py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-primary" />
            <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of creators, professionals, and businesses using
              Get At Me to connect with their audience.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-base">
                <Link href="/register">Create Your Page</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/pricing">See Plans & Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
