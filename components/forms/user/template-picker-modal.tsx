"use client";

import { useState, useMemo } from "react";
import {
  LINK_TEMPLATES,
  LINK_TEMPLATE_CATEGORIES,
  type LinkTemplate,
  type LinkTemplateCategory,
} from "@/lib/link-templates";
import { PiMagnifyingGlass, PiX } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TemplatePickerModalProps {
  onSelect: (template: LinkTemplate) => void;
  onClose: () => void;
}

export function TemplatePickerModal({
  onSelect,
  onClose,
}: TemplatePickerModalProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<LinkTemplateCategory | null>(null);

  const filtered = useMemo(() => {
    let templates = LINK_TEMPLATES;
    if (activeCategory) {
      templates = templates.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      templates = templates.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return templates;
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<LinkTemplateCategory, LinkTemplate[]>();
    for (const t of filtered) {
      const list = map.get(t.category) || [];
      list.push(t);
      map.set(t.category, list);
    }
    return map;
  }, [filtered]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl max-h-[80vh] mx-4 bg-background rounded-xl border shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Add from Template</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <PiX className="h-4 w-4" />
          </Button>
        </div>

        {/* Search + Filters */}
        <div className="px-4 py-3 space-y-3 border-b">
          <div className="relative">
            <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {LINK_TEMPLATE_CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No templates match your search.
            </p>
          )}
          {LINK_TEMPLATE_CATEGORIES.filter((cat) => grouped.has(cat)).map(
            (cat) => (
              <div key={cat}>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  {cat}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {grouped.get(cat)!.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => onSelect(template)}
                      className="flex items-center gap-3 p-3 rounded-lg border text-left hover:bg-muted/50 dark:hover:bg-muted/30 transition-colors"
                    >
                      <span className="text-2xl shrink-0">
                        {template.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">
                          {template.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {template.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
