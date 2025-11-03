"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({ title: "Missing information", description: "Please fill out all fields." });
      return;
    }
    setIsSubmitting(true);
    try {
      const subject = `New contact from ${name}`;
      const html = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, "<br/>")}</p>`;
      const res = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "contact@getatme.com", subject, html }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      toast({ title: "Message sent", description: "Thanks! We'll get back to you soon." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <section className="border-b border-border/60 bg-muted/10 py-24 pt-32">
        <div className="mx-auto w-full max-w-3xl px-4 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-muted-foreground text-lg">Questions, feedback, or partnership inquiries? Send us a message.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto w-full max-w-xl px-4">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium" htmlFor="name">Name</label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="message">Message</label>
              <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" className="min-h-32" />
            </div>
            <div className="pt-2">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
