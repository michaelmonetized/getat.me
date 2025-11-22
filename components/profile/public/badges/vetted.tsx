"use client";
import { Badge } from "@/components/ui/badge";
import { PiChecksLight } from "react-icons/pi";

export default function VettedBadge() {
  return (
    <Badge
      variant="secondary"
      className="rounded-full h-8 w-8 p-2 m-2 flex items-center justify-center"
    >
      <PiChecksLight className="h-4 w-4" />
    </Badge>
  );
}
