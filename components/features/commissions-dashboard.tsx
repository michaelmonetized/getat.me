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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Wallet, DollarSign } from "lucide-react";

function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount / 100);
}

export function CommissionsDashboard() {
  const { user } = useUser();
  const commissions = useQuery(
    api.commissions.getCommissions,
    user?.id ? { userId: user.id } : "skip"
  );
  const stats = useQuery(
    api.commissions.getCommissionStats,
    user?.id ? { userId: user.id } : "skip"
  );

  if (!user?.id) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>Referral Commissions</CardTitle>
            <CardDescription>Track your referral earnings</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats && (
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Total Earned
              </div>
              <div className="mt-1 text-2xl font-bold">
                {formatCurrency(stats.totalEarned)}
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Pending</div>
              <div className="mt-1 text-2xl font-bold">
                {formatCurrency(stats.pending)}
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Total Commissions</div>
              <div className="mt-1 text-2xl font-bold">{stats.count}</div>
            </div>
          </div>
        )}

        {commissions === undefined ? (
          <p className="text-center text-muted-foreground py-8">Loading...</p>
        ) : commissions.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            You {"haven't"} earned any commissions yet
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Paid Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions.map((commission) => (
                <TableRow key={commission._id}>
                  <TableCell className="font-medium">
                    {formatCurrency(commission.amount)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        commission.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : commission.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {commission.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(commission.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {commission.paidAt
                      ? new Date(commission.paidAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

