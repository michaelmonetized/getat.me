"use client";

import { useState } from "react";
import { PiCaretDown, PiCaretRight } from "react-icons/pi";

interface CollapsibleSectionProps {
  title: string;
  icon?: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  title,
  icon,
  description,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left group"
      >
        <span className="text-muted-foreground transition-transform">
          {isOpen ? (
            <PiCaretDown className="h-4 w-4" />
          ) : (
            <PiCaretRight className="h-4 w-4" />
          )}
        </span>
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </span>
      </button>
      {description && isOpen && (
        <p className="text-xs text-muted-foreground pl-6">{description}</p>
      )}
      {isOpen && <div>{children}</div>}
    </div>
  );
}
