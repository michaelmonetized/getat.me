"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

const daysOfWeek = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
] as const;

export function AvailabilityForm() {
  const { user } = useUser();
  const { toast } = useToast();
  const availability = useQuery(
    api.booking.getBookingAvailability,
    user?.id ? { userId: user.id } : "skip"
  );
  const updateAvailability = useMutation(api.booking.updateBookingAvailability);

  const [isSaving, setIsSaving] = useState(false);

  // Defaults: M-F 9-5
  const defaultStartTime = "09:00";
  const defaultEndTime = "17:00";
  const defaultDays = {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  };

  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [days, setDays] = useState(defaultDays);

  // Sync state when availability loads
  useEffect(() => {
    if (availability) {
      setStartTime(availability.defaultStartTime);
      setEndTime(availability.defaultEndTime);
      setDays({
        monday: availability.monday,
        tuesday: availability.tuesday,
        wednesday: availability.wednesday,
        thursday: availability.thursday,
        friday: availability.friday,
        saturday: availability.saturday,
        sunday: availability.sunday,
      });
    }
  }, [availability]);

  const handleSave = async () => {
    if (!user?.id) return;
    setIsSaving(true);
    try {
      await updateAvailability({
        userId: user.id,
        defaultStartTime: startTime,
        defaultEndTime: endTime,
        monday: days.monday,
        tuesday: days.tuesday,
        wednesday: days.wednesday,
        thursday: days.thursday,
        friday: days.friday,
        saturday: days.saturday,
        sunday: days.sunday,
      });
      toast({
        title: "Availability updated",
        description: "Your booking availability has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDayToggle = (day: typeof daysOfWeek[number]["key"]) => {
    setDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  if (availability === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Custom Availability</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Custom Availability</CardTitle>
            <CardDescription>
              Set custom booking availability schedules
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Available Days</Label>
          <div className="space-y-2">
            {daysOfWeek.map((day) => (
              <div
                key={day.key}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <Label htmlFor={day.key} className="cursor-pointer flex-1">
                  {day.label}
                </Label>
                <Switch
                  id={day.key}
                  checked={days[day.key]}
                  onCheckedChange={() => handleDayToggle(day.key)}
                />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? "Saving..." : "Save Availability"}
        </Button>

        <div className="rounded-lg border border-border bg-muted/50 p-3">
          <p className="text-sm font-medium mb-1">Current Schedule</p>
          <p className="text-sm text-muted-foreground">
            {Object.entries(days)
              .filter(([_, enabled]) => enabled)
              .map(([key, _]) => {
                const day = daysOfWeek.find((d) => d.key === key);
                return day?.label;
              })
              .join(", ") || "No days selected"}
            {" "}
            {startTime} - {endTime}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
