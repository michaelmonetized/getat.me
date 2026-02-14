"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { trackContactFormSubmitted } from "@/lib/analytics";
import {
  PiEnvelopeSimpleLight,
  PiChatCircleLight,
  PiClockLight,
  PiArrowRightLight,
  PiMapPinLight,
} from "react-icons/pi";

export default function ContactPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields.",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const subject = `New contact from ${name}`;
      const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, "<br/>")}</p>`;
      const res = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "contact@getatme.com",
          subject,
          html,
        }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      trackContactFormSubmitted();
      router.push("/thanks");
    } catch (error) {
      console.error("Contact form submission failed", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 py-28 pt-36">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04]" />
        <div className="absolute -top-24 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-radial-[at_50%_0%] from-primary/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 bg-radial-[at_0%_100%] from-secondary/10 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary animate-fade-in">
            <PiChatCircleLight className="h-4 w-4" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight animate-fade-in-up">
            Let&rsquo;s
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Talk
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay-1">
            Questions, feedback, or partnership inquiries? We&rsquo;d love to hear from you.
            Our team typically responds within 24 hours.
          </p>
        </div>
      </section>

      {/* 2-Column Contact Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
            {/* Left Column - Info & Context */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-3">
                  How can we help?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you&rsquo;re curious about features, need help setting up
                  your page, or want to explore a partnership, we&rsquo;re here for it.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <PiEnvelopeSimpleLight className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <a
                      href="mailto:contact@getatme.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      contact@getatme.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <PiClockLight className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Response Time</p>
                    <p className="text-sm text-muted-foreground">
                      Within 24 hours on business days
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <PiMapPinLight className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Location</p>
                    <p className="text-sm text-muted-foreground">
                      North Carolina, USA
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border/40 bg-card/30 p-5 space-y-3">
                <p className="text-sm font-semibold">Looking for answers?</p>
                <p className="text-sm text-muted-foreground">
                  Check our FAQ for quick answers to common questions about
                  plans, features, and more.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/faq">
                    Visit FAQ
                    <PiArrowRightLight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-xs p-8">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="bg-background/50 border-border/60 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-background/50 border-border/60 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    className="min-h-36 bg-background/50 border-border/60 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && (
                      <PiArrowRightLight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
