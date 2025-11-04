"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AvailabilityForm } from "./availability-form";

export function CollapsibleAvailabilityForm() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Custom Availability Settings</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <>
              <ChevronUp className="h-4 w-4 mr-2" />
              Hide Settings
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-2" />
              Show Settings
            </>
          )}
        </Button>
      </div>
      {isOpen && <AvailabilityForm />}
    </div>
  );
}

