"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Mail, User, Phone, ArrowLeft } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface PublicBookingWidgetProps {
  userId: string;
}

// Generate time slots between start and end time (30-minute intervals)
function generateTimeSlots(startTime: string, endTime: string): string[] {
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  const start = startHour * 60 + startMin;
  const end = endHour * 60 + endMin;
  const slots: string[] = [];

  for (let minutes = start; minutes < end; minutes += 30) {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    slots.push(`${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`);
  }

  return slots;
}

// Get day name from date
function getDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

// Get next N available days based on availability settings
function getAvailableDays(
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  },
  count: number = 3
): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentDate = new Date(today);
  const dayNames: (keyof typeof availability)[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  // Skip today if it's in the past or not available, start from tomorrow
  const todayDayName = dayNames[currentDate.getDay()];
  if (!availability[todayDayName] || currentDate < today) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  while (days.length < count) {
    const dayName = dayNames[currentDate.getDay()];
    if (availability[dayName]) {
      days.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
    // Safety check to prevent infinite loop
    if (currentDate.getTime() - today.getTime() > 30 * 24 * 60 * 60 * 1000) {
      break;
    }
  }

  return days;
}

export function PublicBookingWidget({ userId }: PublicBookingWidgetProps) {
  const { toast } = useToast();
  const availability = useQuery(
    api.booking.getBookingAvailability,
    userId ? { userId } : "skip"
  );
  const updateAvailability = useMutation(api.booking.updateBookingAvailability);

  // Auto-initialize booking availability if it doesn't exist
  const [hasInitialized, setHasInitialized] = useState(false);
  useEffect(() => {
    if (userId && availability === null && !hasInitialized) {
      setHasInitialized(true);
      updateAvailability({
        userId,
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
      }).catch(() => {
        // Silently fail - might already exist
      });
    }
  }, [userId, availability, hasInitialized, updateAvailability]);

  // Get appointments for the next 3 days
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(endDate.getDate() + 3);
  const startDateStr = today.toISOString().split("T")[0];
  const endDateStr = endDate.toISOString().split("T")[0];

  const appointments = useQuery(
    api.booking.getAppointments,
    userId && availability ? { userId, startDate: startDateStr, endDate: endDateStr } : "skip"
  );
  const createAppointment = useMutation(api.booking.createAppointment);

  const [selectedTime, setSelectedTime] = useState<{ date: string; time: string } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate time slots
  const timeSlots = useMemo(() => {
    if (!availability) return [];
    return generateTimeSlots(availability.defaultStartTime, availability.defaultEndTime);
  }, [availability]);

  // Get booked time slots for a specific date
  const getBookedSlots = (dateStr: string): Set<string> => {
    if (!appointments) return new Set();
    return new Set(
      appointments
        .filter(
          (apt) =>
            apt.appointmentDate === dateStr &&
            apt.status !== "cancelled" &&
            apt.appointmentTime
        )
        .map((apt) => apt.appointmentTime)
    );
  };

  // Generate available days and filter out days with no available slots
  const availableDays = useMemo(() => {
    if (!availability) return [];
    const days = getAvailableDays(availability, 10); // Get more days to filter from
    
    // Filter out days that have no available slots
    const now = new Date();
    return days.filter((date) => {
      const dateStr = date.toISOString().split("T")[0];
      const bookedSlots = getBookedSlots(dateStr);
      
      // Check if there's at least one available slot
      return timeSlots.some((time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const slotTime = new Date(date);
        slotTime.setHours(hours, minutes, 0, 0);
        
        const isBooked = bookedSlots.has(time);
        const isPast = slotTime < now;
        
        return !isBooked && !isPast;
      });
    }).slice(0, 3); // Take only the first 3 days with available slots
  }, [availability, appointments, timeSlots]);

  const handleTimeSelect = (date: Date, time: string) => {
    const dateStr = date.toISOString().split("T")[0];
    setSelectedTime({ date: dateStr, time });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTime || !name || !email) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createAppointment({
        userId,
        name,
        email,
        phone: phone || undefined,
        message: message || undefined,
        appointmentDate: selectedTime.date,
        appointmentTime: selectedTime.time,
      });

      toast({
        title: "Booking confirmed!",
        description: "Your appointment has been scheduled. You'll receive a confirmation email shortly.",
      });

      // Reset form
      setSelectedTime(null);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render if availability is loading
  if (availability === undefined) {
    return null;
  }

  // Don't render if booking is disabled or not set up yet
  if (!availability || !availability.enabled) {
    return null;
  }

  // Show form if time is selected
  if (selectedTime) {
    const selectedDate = new Date(selectedTime.date);
    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <Card className="border-primary/20 bg-card animate-in slide-in-from-right duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTime(null)}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <CardTitle>Confirm Booking</CardTitle>
              <CardDescription>
                {formattedDate} at {selectedTime.time}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="booking-name">Name *</Label>
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
              <Label htmlFor="booking-email">Email *</Label>
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
              <Label htmlFor="booking-phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="booking-phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
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
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  // Show calendar view
  return (
    <Card className="border-primary/20 bg-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Book a Time</CardTitle>
            <CardDescription>Select an available time slot</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300">
          {availableDays.length === 0 ? (
            <div className="col-span-3 text-center py-8 text-muted-foreground">
              No available time slots in the next few days. Please check back later.
            </div>
          ) : (
            availableDays.map((date, idx) => {
              const dateStr = date.toISOString().split("T")[0];
              const dayName = getDayName(date);
              const bookedSlots = getBookedSlots(dateStr);
              const isToday = date.toDateString() === new Date().toDateString();
              const dateLabel = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

            return (
              <div key={dateStr} className="space-y-2">
                <div className="text-center">
                  <p className="font-semibold">{dayName}</p>
                  <p className="text-sm text-muted-foreground">
                    {isToday ? "Today" : dateLabel}
                  </p>
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {timeSlots.map((time) => {
                    const isBooked = bookedSlots.has(time);
                    const isPast = isToday && new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }) >= time;

                    return (
                      <Button
                        key={time}
                        variant={isBooked || isPast ? "outline" : "default"}
                        className="w-full justify-start text-sm"
                        disabled={isBooked || isPast}
                        onClick={() => handleTimeSelect(date, time)}
                      >
                        <Clock className="h-3 w-3 mr-2" />
                        {time}
                        {isBooked && <span className="ml-auto text-xs text-muted-foreground">Booked</span>}
                        {isPast && <span className="ml-auto text-xs text-muted-foreground">Past</span>}
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
