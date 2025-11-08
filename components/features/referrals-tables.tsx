"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import FeatureTitle from "./feature-title";
import { PiPaperPlane } from "react-icons/pi";

export function ReferralsTables() {
  const { user } = useUser();

  const referralsSent = useQuery(
    api.referrals.getReferralsSent,
    user?.id ? { userId: user.id } : "skip"
  );
  const referralsReceived = useQuery(
    api.referrals.getReferralsReceived,
    user?.id ? { userId: user.id } : "skip"
  );

  if (!user?.id) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Card className="bg-foreground/50 w-full">
        <CardHeader>
          <FeatureTitle
            Icon={PiPaperPlane}
            title="Referrals"
            description="View sent and received referrals"
          />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="referrals-received" className="md:-mt-16">
            <TabsList className="mx-auto md:ml-auto text-center self-center justify-self-center justify-center md:justify-end items-center w-auto max-w-fit block">
              <TabsTrigger value="referrals-sent" defaultChecked={true}>
                Sent
              </TabsTrigger>
              <TabsTrigger value="referrals-received">Received</TabsTrigger>
            </TabsList>
            <TabsContent value="referrals-sent">
              {/* Referrals Sent */}
              <Card>
                <CardHeader>
                  <CardTitle>Sent</CardTitle>
                </CardHeader>
                <CardContent>
                  {referralsSent === undefined ? (
                    <p className="text-center text-muted-foreground py-8">
                      Loading...
                    </p>
                  ) : referralsSent.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      You {"haven't"} sent any referrals yet
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Referred To</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {referralsSent.map((referral) => (
                          <ReferralRow
                            key={referral._id}
                            referral={referral}
                            type="sent"
                          />
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="referrals-received">
              {/* Referrals Received */}
              <Card>
                <CardHeader>
                  <CardTitle>Received</CardTitle>
                </CardHeader>
                <CardContent>
                  {referralsReceived === undefined ? (
                    <p className="text-center text-muted-foreground py-8">
                      Loading...
                    </p>
                  ) : referralsReceived.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      You {"haven't"} received any referrals yet
                    </p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Referred By</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {referralsReceived.map((referral) => (
                          <ReferralRow
                            key={referral._id}
                            referral={referral}
                            type="received"
                          />
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>{" "}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ReferralRow({
  referral,
  type,
}: {
  referral: {
    _id: string;
    referrerUserId: string;
    referredUserId: string;
    referredFirstName: string;
    referredEmail: string;
    referredPhone?: string;
    message?: string;
    createdAt: number;
  };
  type: "sent" | "received";
}) {
  const otherUserId =
    type === "sent" ? referral.referredUserId : referral.referrerUserId;
  const otherUser = useQuery(api.users.getUserByID, { userId: otherUserId });

  return (
    <TableRow>
      <TableCell>@{otherUser?.handle || otherUser?.first || "User"}</TableCell>
      <TableCell>{referral.referredFirstName}</TableCell>
      <TableCell>{referral.referredEmail}</TableCell>
      <TableCell>{referral.referredPhone || "-"}</TableCell>
      <TableCell className="max-w-xs truncate">
        {referral.message || "-"}
      </TableCell>
      <TableCell>{new Date(referral.createdAt).toLocaleDateString()}</TableCell>
    </TableRow>
  );
}
