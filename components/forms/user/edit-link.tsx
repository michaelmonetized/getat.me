"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PiX } from "react-icons/pi";

interface EditLinkFormProps {
  link: {
    _id: Id<"links">;
    anchor: string;
    href: string;
    icon?: string;
    sectionId?: Id<"sections">;
    publishAt?: number;
    unpublishAt?: number;
  };
  onClose: () => void;
}

function timestampToDatetimeLocal(ts?: number): string {
  if (!ts) return "";
  const d = new Date(ts);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

function datetimeLocalToTimestamp(val: string): number | undefined {
  if (!val) return undefined;
  return new Date(val).getTime();
}

export function EditLinkForm({ link, onClose }: EditLinkFormProps) {
  const { user } = useUser();
  const [anchor, setAnchor] = useState(link.anchor);
  const [href, setHref] = useState(link.href);
  const [sectionId, setSectionId] = useState<string>(link.sectionId ?? "");
  const [publishAt, setPublishAt] = useState(timestampToDatetimeLocal(link.publishAt));
  const [unpublishAt, setUnpublishAt] = useState(timestampToDatetimeLocal(link.unpublishAt));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const sections = useQuery(
    api.sections.getUserSections,
    user?.id ? { userId: user.id } : "skip"
  );

  const updateLink = useMutation(api.links.updateLink);

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
      const updateArgs: any = {
        id: link._id,
        anchor: anchor.trim(),
        href: href.startsWith("http") ? href : `https://${href}`,
      };
      if (sectionId) {
        updateArgs.sectionId = sectionId as Id<"sections">;
      } else {
        updateArgs.clearSection = true;
      }
      const pubTs = datetimeLocalToTimestamp(publishAt);
      const unpubTs = datetimeLocalToTimestamp(unpublishAt);
      if (pubTs) {
        updateArgs.publishAt = pubTs;
      } else {
        updateArgs.clearPublishAt = true;
      }
      if (unpubTs) {
        updateArgs.unpublishAt = unpubTs;
      } else {
        updateArgs.clearUnpublishAt = true;
      }
      await updateLink(updateArgs);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Edit Link</CardTitle>
              <CardDescription>Update your link details</CardDescription>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <PiX className="h-4 w-4" />
            </button>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="anchor">Link Text</Label>
              <Input
                id="anchor"
                value={anchor}
                onChange={(e) => setAnchor(e.target.value)}
                placeholder="e.g., My Portfolio"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="href">URL</Label>
              <Input
                id="href"
                type="url"
                value={href}
                onChange={(e) => setHref(e.target.value)}
                placeholder="https://example.com"
                disabled={isSubmitting}
                required
              />
            </div>
            {sections && sections.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <select
                  id="section"
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  disabled={isSubmitting}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">No section</option>
                  {sections.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="publishAt">Publish At</Label>
              <Input
                id="publishAt"
                type="datetime-local"
                value={publishAt}
                onChange={(e) => setPublishAt(e.target.value)}
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to publish immediately
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="unpublishAt">Unpublish At</Label>
              <Input
                id="unpublishAt"
                type="datetime-local"
                value={unpublishAt}
                onChange={(e) => setUnpublishAt(e.target.value)}
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to keep published indefinitely
              </p>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Link"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
