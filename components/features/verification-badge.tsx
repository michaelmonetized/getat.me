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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Shield, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useState } from "react";

interface VerificationBadgeProps {
  type: "verified" | "vetted";
}

export function VerificationBadge({ type }: VerificationBadgeProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const verification = useQuery(
    api.verifications.getVerification,
    user?.id ? { userId: user.id, type } : "skip"
  );
  const applyForVerification = useMutation(api.verifications.applyForVerification);

  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = async () => {
    if (!user?.id) return;
    setIsSubmitting(true);
    try {
      await applyForVerification({
        userId: user.id,
        type,
        additionalInfo: additionalInfo.trim() || undefined,
      });
      setAdditionalInfo("");
      toast({
        title: "Application submitted",
        description: `Your ${type} application has been submitted for review`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verification === undefined) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{type === "verified" ? "Verification" : "Vetted"} Badge</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getStatusIcon = () => {
    if (!verification) return null;
    if (verification.status === "approved") {
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    } else if (verification.status === "rejected") {
      return <XCircle className="h-5 w-5 text-red-500" />;
    } else {
      return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = () => {
    if (!verification) return "Not Applied";
    if (verification.status === "approved") return "Approved";
    if (verification.status === "rejected") return "Rejected";
    return "Pending Review";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle>
              {type === "verified" ? "Verification" : "Vetted"} Badge
            </CardTitle>
            <CardDescription>
              Apply for {type === "verified" ? "verification" : "vetted"} status
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {verification && (
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className="font-medium">Status: {getStatusText()}</span>
              </div>
            </div>
            {verification.status === "pending" && (
              <p className="mt-2 text-sm text-muted-foreground">
                Your application is under review. We'll notify you once a decision has been made.
              </p>
            )}
            {verification.status === "rejected" && (
              <p className="mt-2 text-sm text-muted-foreground">
                Your application was rejected. You can submit a new application below.
              </p>
            )}
            {verification.applicationData?.additionalInfo && (
              <p className="mt-2 text-sm text-muted-foreground">
                <strong>Your application:</strong> {verification.applicationData.additionalInfo}
              </p>
            )}
          </div>
        )}

        {(!verification || verification.status === "rejected") && (
          <div className="space-y-4 border-t pt-4">
            <div className="space-y-2">
              <Label htmlFor="additional-info">
                Additional Information (Optional)
              </Label>
              <Textarea
                id="additional-info"
                placeholder={`Tell us why you should be ${type === "verified" ? "verified" : "vetted"}...`}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={4}
              />
            </div>
            <Button
              onClick={handleApply}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting
                ? "Submitting..."
                : `Apply for ${type === "verified" ? "Verification" : "Vetted"} Status`}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

