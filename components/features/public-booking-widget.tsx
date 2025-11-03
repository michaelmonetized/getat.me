"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PublicBookingWidgetProps {
  userId: string;
}

export function PublicBookingWidget({ userId }: PublicBookingWidgetProps) {
  const { toast } = useToast();
  const availability = useQuery(
    api.booking.getBookingAvailability,
    userId ? { userId } : "skip"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Don't render if availability is loading or booking is disabled
  if (availability === undefined || !availability?.enabled) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement actual booking submission
      // For now, just show success message
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Booking request sent!",
        description: "Your booking request has been sent. We'll get back to you soon.",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format available days
  const availableDays = [];
  if (availability.monday) availableDays.push("Monday");
  if (availability.tuesday) availableDays.push("Tuesday");
  if (availability.wednesday) availableDays.push("Wednesday");
  if (availability.thursday) availableDays.push("Thursday");
  if (availability.friday) availableDays.push("Friday");
  if (availability.saturday) availableDays.push("Saturday");
  if (availability.sunday) availableDays.push("Sunday");

  const availabilityText =
    availableDays.length > 0
      ? `${availableDays.join(", ")} • ${availability.defaultStartTime} - ${availability.defaultEndTime}`
      : "No availability set";

  return (
    <Card className="border-primary/20 bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Book a Time</CardTitle>
            <CardDescription>
              Schedule a meeting or appointment
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Availability Info */}
        <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/50 p-4">
          <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Available Hours</p>
            <p className="text-sm text-muted-foreground">{availabilityText}</p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="booking-name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="booking-name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="booking-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-message">Message</Label>
            <Textarea
              id="booking-message"
              placeholder="Tell us what you'd like to discuss..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Request Booking"}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground">
          You&apos;ll receive a confirmation email once your booking is confirmed.
        </p>
      </CardContent>
    </Card>
  );
}

