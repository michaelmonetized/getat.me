"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AvailabilityForm } from "./availability-form";
import { PiEyeClosedLight, PiEyeLight } from "react-icons/pi";

export function CollapsibleAvailabilityForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4 w-full block relative">
      <div className="flex items-center justify-between gap-4 w-full">
        <h3 className="text-lg font-semibold grow w-full">
          Custom Availability Settings
        </h3>
        <div className="justify-self-end self-end grow-0 shrink w-fit">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="block"
            size="sm"
            variant="secondary"
          >
            {isOpen ? (
              <PiEyeLight className="h-4 w-4" />
            ) : (
              <PiEyeClosedLight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full h-full max-w-dvw max-h-dvh z-50 mt-4">
          <AvailabilityForm />
        </div>
      )}
    </div>
  );
}
