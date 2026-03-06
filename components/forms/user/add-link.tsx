"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PiPlus, PiGridFour } from "react-icons/pi";
import { TemplatePickerModal } from "./template-picker-modal";
import type { LinkTemplate } from "@/lib/link-templates";

export function AddLinkForm() {
  const { user } = useUser();
  const [anchor, setAnchor] = useState("");
  const [href, setHref] = useState("");
  const [icon, setIcon] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);

  const createLink = useMutation(api.links.createLink);

  const handleTemplateSelect = (template: LinkTemplate) => {
    setAnchor(template.name);
    setHref(template.urlPlaceholder);
    setIcon(template.icon);
    setShowTemplates(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!anchor.trim() || !href.trim()) {
      setError("Anchor text and URL are required");
      setIsSubmitting(false);
      return;
    }

    // Basic URL validation
    try {
      new URL(href.startsWith("http") ? href : `https://${href}`);
    } catch {
      setError("Please enter a valid URL");
      setIsSubmitting(false);
      return;
    }

    try {
      if (!user?.id) {
        setError("You must be signed in to create links");
        setIsSubmitting(false);
        return;
      }

      await createLink({
        anchor: anchor.trim(),
        href: href.startsWith("http") ? href : `https://${href}`,
        icon,
        userId: user.id,
      });
      setAnchor("");
      setHref("");
      setIcon(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0"
            aria-label="Add from template"
            title="Add from template"
            onClick={() => setShowTemplates(true)}
          >
            <PiGridFour className="h-4 w-4" />
          </Button>
          {icon && (
            <span className="flex items-center text-xl shrink-0">{icon}</span>
          )}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
              https://
            </span>
            <Input
              value={href}
              onChange={(e) => setHref(e.target.value)}
              placeholder="example.com"
              disabled={isSubmitting}
              className="pl-20"
              required
            />
          </div>
          <Input
            value={anchor}
            onChange={(e) => setAnchor(e.target.value)}
            placeholder="Link text"
            disabled={isSubmitting}
            className="flex-1"
            required
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            size="icon"
            className="shrink-0"
            aria-label="Add link"
          >
            <PiPlus className="h-4 w-4" />
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>

      {showTemplates && (
        <TemplatePickerModal
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </>
  );
}
