import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PiCheckCircleLight,
  PiArrowRightLight,
  PiShootingStarLight,
} from "react-icons/pi";

export default function ThanksPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 pt-40">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute -top-24 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-radial-[at_50%_0%] from-primary/20 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 bg-radial-[at_0%_100%] from-secondary/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 bg-radial-[at_100%_100%] from-primary/10 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 text-center space-y-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 animate-scale-in">
            <PiCheckCircleLight className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">
            Thank You!
          </h1>

          <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-in-up-delay-1">
            We&rsquo;ve received your message and will get back to you within
            24 hours. We appreciate you reaching out.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 border-t border-border/40">
        <div className="mx-auto max-w-2xl px-4 space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <PiShootingStarLight className="h-4 w-4" />
              <span>While You Wait</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Explore Get At Me
            </h2>
            <p className="text-muted-foreground">
              Check out what we have to offer while we put together a response for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/features"
              className="group rounded-lg border border-border/50 bg-card/30 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/50 hover:shadow-lg hover:shadow-primary/5 no-underline"
            >
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                Features
              </h3>
              <p className="text-sm text-muted-foreground">
                See everything Get At Me can do for your brand and audience.
              </p>
            </Link>

            <Link
              href="/pricing"
              className="group rounded-lg border border-border/50 bg-card/30 p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/50 hover:shadow-lg hover:shadow-primary/5 no-underline"
            >
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                Pricing
              </h3>
              <p className="text-sm text-muted-foreground">
                Find the right plan that fits your needs and budget.
              </p>
            </Link>
          </div>

          <div className="flex justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/">
                Back to Homepage
                <PiArrowRightLight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
