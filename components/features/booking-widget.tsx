"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export function BookingWidget() {
  const { user } = useUser();
  const { toast } = useToast();
  const availability = useQuery(
    api.booking.getBookingAvailability,
    user?.id ? { userId: user.id } : "skip"
  );
  const updateAvailability = useMutation(api.booking.updateBookingAvailability);

  // Auto-initialize booking availability if it doesn't exist
  const [hasInitialized, setHasInitialized] = useState(false);
  useEffect(() => {
    if (user?.id && availability === null && !hasInitialized) {
      setHasInitialized(true);
      updateAvailability({
        userId: user.id,
        enabled: true,
        defaultStartTime: "09:00",
        defaultEndTime: "17:00",
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      }).catch((error) => {
        console.error(error);

        toast({
          title: "Error",
          description: "Failed to initialize booking availability",
          variant: "destructive",
        });

        throw error;
      });
    }
  }, [user?.id, availability, hasInitialized, updateAvailability, toast]);

  const handleToggle = async (enabled: boolean) => {
    if (!user?.id) return;
    try {
      // If no availability exists, create with defaults (M-F 9-5)
      await updateAvailability({
        userId: user.id,
        enabled,
        defaultStartTime: "09:00",
        defaultEndTime: "17:00",
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      });
      toast({
        title: enabled ? "Booking enabled" : "Booking disabled",
        description: enabled
          ? "Visitors can now book time with you"
          : "Booking is now disabled",
      });
    } catch (error) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to update booking settings",
        variant: "destructive",
      });

      throw error;
    }
  };

  if (availability === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Form</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const isEnabled = availability?.enabled ?? true;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Booking Form</CardTitle>
            <CardDescription>
              Let visitors book time with you seamlessly
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="booking-enabled">Enable Booking</Label>
            <p className="text-sm text-muted-foreground">
              Allow visitors to book appointments with you
            </p>
          </div>
          <Switch
            id="booking-enabled"
            checked={isEnabled}
            onCheckedChange={handleToggle}
          />
        </div>
      </CardContent>
    </Card>
  );
}
