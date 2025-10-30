"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // send to sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <>
      <Card>
        <CardHeader>
          <h2>{"We're currently working on this feature."}</h2>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <div className="flex gap-4 justify-between">
            <Button onClick={() => reset()}>Refresh</Button>
            <Button onClick={() => router.back()}>Go back</Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
