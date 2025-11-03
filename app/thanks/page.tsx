import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function ThanksPage() {
  return (
    <div className="w-full">
      <section className="border-b border-border/60 bg-muted/10 py-24 pt-32">
        <div className="mx-auto w-full max-w-3xl px-4 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Thank You!
          </h1>
          <p className="text-muted-foreground text-lg">
            We&rsquo;ve received your message and will get back to you soon.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-xl px-4 text-center space-y-6">
          <p className="text-muted-foreground">
            While you&rsquo;re here, why not explore Get At Me?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/">Go to Homepage</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/features">View Features</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
