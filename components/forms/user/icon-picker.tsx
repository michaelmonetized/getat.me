"use client";

import { useState, useMemo } from "react";
import { LINK_ICONS } from "@/lib/link-icons";
import { LinkIcon, ICON_MAP } from "@/components/ui/link-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiX, PiMagnifyingGlass } from "react-icons/pi";

interface IconPickerProps {
  value?: string;
  onChange: (icon: string | undefined) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search) return LINK_ICONS;
    const q = search.toLowerCase();
    return LINK_ICONS.filter(
      (icon) =>
        icon.label.toLowerCase().includes(q) ||
        icon.keywords.some((k) => k.includes(q))
    );
  }, [search]);

  return (
    <div className="space-y-2">
      <Label>Icon</Label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {value ? (
          <>
            <LinkIcon icon={value} className="h-5 w-5" />
            <span>{LINK_ICONS.find((i) => i.id === value)?.label ?? value}</span>
          </>
        ) : (
          <span className="text-muted-foreground">No icon</span>
        )}
      </button>

      {isOpen && (
        <div className="rounded-md border border-input bg-background p-3 space-y-3">
          <div className="relative">
            <PiMagnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons..."
              className="pl-8 h-8 text-sm"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto">
            {/* None option */}
            <button
              type="button"
              onClick={() => { onChange(undefined); setIsOpen(false); }}
              className={`flex flex-col items-center justify-center gap-0.5 p-2 rounded-md text-xs transition-colors hover:bg-accent ${
                !value ? "bg-accent ring-1 ring-ring" : ""
              }`}
              title="None"
            >
              <PiX className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground truncate w-full text-center text-[10px]">None</span>
            </button>
            {filtered.map((icon) => (
              <button
                key={icon.id}
                type="button"
                onClick={() => { onChange(icon.id); setIsOpen(false); }}
                className={`flex flex-col items-center justify-center gap-0.5 p-2 rounded-md text-xs transition-colors hover:bg-accent ${
                  value === icon.id ? "bg-accent ring-1 ring-ring" : ""
                }`}
                title={icon.label}
              >
                <LinkIcon icon={icon.id} className="h-5 w-5" />
                <span className="truncate w-full text-center text-[10px]">{icon.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
