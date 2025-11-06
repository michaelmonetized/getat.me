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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

export function PaymentWidget() {
  const { user } = useUser();
  const { toast } = useToast();
  const paymentSettings = useQuery(
    api.payments.getPaymentSettings,
    user?.id ? { userId: user.id } : "skip"
  );
  const updatePaymentSettings = useMutation(api.payments.updatePaymentSettings);

  const [enabled, setEnabled] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [defaultPrice, setDefaultPrice] = useState(0);

  useEffect(() => {
    if (paymentSettings) {
      setEnabled(paymentSettings.enabled);
      setCurrency(paymentSettings.currency);
      setDefaultPrice(paymentSettings.defaultPrice);
    }
  }, [paymentSettings]);

  const handleToggle = async (newEnabled: boolean) => {
    if (!user?.id) return;
    try {
      await updatePaymentSettings({
        userId: user.id,
        enabled: newEnabled,
      });
      setEnabled(newEnabled);
      toast({
        title: newEnabled ? "Payments enabled" : "Payments disabled",
        description: newEnabled
          ? "You can now accept payments for appointments"
          : "Payments are now disabled",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update payment settings",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (!user?.id) return;
    try {
      await updatePaymentSettings({
        userId: user.id,
        currency,
        defaultPrice: Math.round(defaultPrice * 100), // Convert to cents
      });
      toast({
        title: "Settings saved",
        description: "Your payment settings have been updated",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save payment settings",
        variant: "destructive",
      });
    }
  };

  if (paymentSettings === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Processing</CardTitle>
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
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Payment Processing</CardTitle>
            <CardDescription>
              Configure payment settings and pricing
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="payments-enabled">Enable Payments</Label>
            <p className="text-sm text-muted-foreground">
              Allow customers to pay for appointments
            </p>
          </div>
          <Switch
            id="payments-enabled"
            checked={enabled}
            onCheckedChange={handleToggle}
          />
        </div>

        {enabled && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                  <SelectItem value="AUD">AUD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-price">Default Price</Label>
              <Input
                id="default-price"
                type="number"
                step="0.01"
                min="0"
                value={defaultPrice / 100}
                onChange={(e) =>
                  setDefaultPrice(Math.round(parseFloat(e.target.value) * 100))
                }
                placeholder="0.00"
              />
              <p className="text-xs text-muted-foreground">
                Default price per appointment in {currency}
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Save Settings
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

