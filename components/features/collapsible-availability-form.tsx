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
        <h3 className="text-lg font-semibold grow-1 w-full">
          Custom Availability Settings
        </h3>
        <div className="justify-self-end self-end grow-0 shrink-1 w-fit">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="flex self-end"
            size="sm"
            variant="secondary"
          >
            {isOpen ? (
              <>
                <PiEyeLight className="h-4 w-4 mr-2" />
                <span className="text-sm">Settings</span>
              </>
            ) : (
              <>
                <PiEyeClosedLight className="h-4 w-4 mr-2" />
                <span className="text-sm">Settings</span>
              </>
            )}
          </Button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full h-full max-w-dvw max-h-dvh z-50">
          <AvailabilityForm />
        </div>
      )}
    </div>
  );
}
