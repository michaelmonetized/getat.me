"use client";
import { Badge } from "@/components/ui/badge";
import { PiCheckCircleLight } from "react-icons/pi";

export default function VerifiedBadge() {
  return (
    <Badge
      variant="primary"
      className="rounded-full h-8 w-8 p-2 m-2 flex items-center justify-center"
    >
      <PiCheckCircleLight className="h-4 w-4" />
    </Badge>
  );
}
