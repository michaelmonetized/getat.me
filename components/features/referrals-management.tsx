"use client";

import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReferralsTables } from "./referrals-tables";
import { PiUsers } from "react-icons/pi";

export function ReferralsManagement() {
  const { user } = useUser();

  if (!user?.id) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <PiUsers className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Referrals</CardTitle>
            <CardDescription>
              Manage your professional referrals
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ReferralsTables />
      </CardContent>
    </Card>
  );
}

