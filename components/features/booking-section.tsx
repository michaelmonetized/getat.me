"use client";

import { BookingWidget } from "./booking-widget";
import { CollapsibleAvailabilityForm } from "./collapsible-availability-form";
import { useAuth } from "@clerk/nextjs";

export function BookingSection() {
  const { has } = useAuth();
  const hasProMax = has?.({ plan: "promax" }) ?? false;

  return (
    <div className="space-y-6">
      <BookingWidget />
      {hasProMax && <CollapsibleAvailabilityForm />}
    </div>
  );
}

