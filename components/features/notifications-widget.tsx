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
import { Bell } from "lucide-react";
import { useState, useEffect } from "react";

export function NotificationsWidget() {
  const { user } = useUser();
  const { toast } = useToast();
  const settings = useQuery(
    api.notifications.getNotificationSettings,
    user?.id ? { userId: user.id } : "skip"
  );
  const updateSettings = useMutation(api.notifications.updateNotificationSettings);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [referralNotifications, setReferralNotifications] = useState(true);
  const [reviewNotifications, setReviewNotifications] = useState(true);

  useEffect(() => {
    if (settings) {
      setEmailNotifications(settings.emailNotifications);
      setBookingNotifications(settings.bookingNotifications);
      setMessageNotifications(settings.messageNotifications);
      setReferralNotifications(settings.referralNotifications);
      setReviewNotifications(settings.reviewNotifications);
    }
  }, [settings]);

  const handleToggle = async (
    setting: string,
    value: boolean,
    setter: (value: boolean) => void
  ) => {
    if (!user?.id) return;
    setter(value);
    try {
      await updateSettings({
        userId: user.id,
        [setting]: value,
      });
      toast({
        title: "Settings updated",
        description: `Notification preferences have been updated`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      });
    }
  };

  if (settings === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
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
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={(checked) =>
              handleToggle("emailNotifications", checked, setEmailNotifications)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="booking-notifications">Booking Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about new booking requests
            </p>
          </div>
          <Switch
            id="booking-notifications"
            checked={bookingNotifications}
            onCheckedChange={(checked) =>
              handleToggle("bookingNotifications", checked, setBookingNotifications)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="message-notifications">Message Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about new messages
            </p>
          </div>
          <Switch
            id="message-notifications"
            checked={messageNotifications}
            onCheckedChange={(checked) =>
              handleToggle("messageNotifications", checked, setMessageNotifications)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="referral-notifications">Referral Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about new referrals
            </p>
          </div>
          <Switch
            id="referral-notifications"
            checked={referralNotifications}
            onCheckedChange={(checked) =>
              handleToggle("referralNotifications", checked, setReferralNotifications)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="review-notifications">Review Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about new reviews
            </p>
          </div>
          <Switch
            id="review-notifications"
            checked={reviewNotifications}
            onCheckedChange={(checked) =>
              handleToggle("reviewNotifications", checked, setReviewNotifications)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

