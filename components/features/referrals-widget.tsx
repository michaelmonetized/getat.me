"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SignInButton } from "@clerk/nextjs";

interface ReferralsWidgetProps {
  userId: string;
  handle: string;
}

export function ReferralsWidget({ userId, handle }: ReferralsWidgetProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const referrerProfile = useQuery(
    api.users.getCurrentUserProfile,
    user?.id ? { userId: user.id } : "skip"
  );
  const referredUser = useQuery(api.users.getUserByID, { userId });
  const createReferral = useMutation(api.referrals.createReferral);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !firstName || !email) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createReferral({
        referrerUserId: user.id,
        referredUserId: userId,
        referredFirstName: firstName,
        referredEmail: email,
        referredPhone: phone || undefined,
        message: message || undefined,
      });

      // Get referrer's handle for email
      const referrerHandle = referrerProfile?.handle || user.id;
      const profileOwnerEmail = referredUser?.email || "contact@getatme.com";

      // Send email to referee (person being referred)
      const refereeEmailHtml = `
        <p>Hi ${firstName},</p>
        <p><strong>@${referrerHandle}</strong> referred you to <strong>@${handle}</strong>.</p>
        ${message ? `<p>Message: ${message}</p>` : ""}
        <p>Visit <a href="${window.location.origin}/${handle}">${window.location.origin}/${handle}</a> to learn more.</p>
        <p>Thank you!</p>
      `;

      // Send email to referred user (profile owner)
      const referredEmailHtml = `
        <p>Hi @${handle},</p>
        <p><strong>@${referrerHandle}</strong> referred <strong>${firstName}</strong> to you.</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        <p>Thank you!</p>
      `;

      // Send emails
      const [refereeRes, referredRes] = await Promise.all([
        fetch("/api/resend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            subject: `@${referrerHandle} referred you to @${handle}`,
            html: refereeEmailHtml,
          }),
        }),
        fetch("/api/resend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profileOwnerEmail,
            subject: `@${referrerHandle} referred ${firstName} to you`,
            html: referredEmailHtml,
          }),
        }),
      ]);

      if (!refereeRes.ok || !referredRes.ok) {
        throw new Error("Failed to send emails");
      }

      toast({
        title: "Referral sent!",
        description: "Both parties have been notified via email.",
      });

      // Reset form
      setFirstName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send referral",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Send Referral</CardTitle>
            <CardDescription>Refer someone to @{handle}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!user ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sign in to refer someone to @{handle}
            </p>
            <SignInButton mode="modal">
              <Button className="w-full">Sign In to Send Referral</Button>
            </SignInButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name *</Label>
            <Input
              id="first-name"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ref-email">Email *</Label>
            <Input
              id="ref-email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ref-phone">Phone</Label>
            <Input
              id="ref-phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ref-message">Message</Label>
            <Textarea
              id="ref-message"
              placeholder="Why are you referring them?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Referral"}
          </Button>
        </form>
        )}
      </CardContent>
    </Card>
  );
}

