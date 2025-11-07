"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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
          <CardTitle>Referrals</CardTitle>
          <CardDescription>Manage your professional referrals</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="referrals-received" className="md:-mt-16">
            <TabsList className="ml-auto text-center self-center justify-self-center justify-end items-center w-auto max-w-fit block">
              <TabsTrigger value="referrals-sent" defaultChecked={true}>
                Sent
              </TabsTrigger>
              <TabsTrigger value="referrals-received">Received</TabsTrigger>
            </TabsList>
            <TabsContent value="referrals-sent">
              {/* Referrals Sent */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>Sent</CardTitle>
                      <CardDescription>
                        People {"you've"} referred to others
                      </CardDescription>
                    </div>
                  </div>
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
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>Received</CardTitle>
                      <CardDescription>
                        People who have been referred to you
                      </CardDescription>
                    </div>
                  </div>
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
