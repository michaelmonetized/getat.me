"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
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
import { X } from "lucide-react";

interface EditLinkFormProps {
  link: {
    _id: Id<"links">;
    anchor: string;
    href: string;
    icon?: string;
  };
  onClose: () => void;
}

export function EditLinkForm({ link, onClose }: EditLinkFormProps) {
  const [anchor, setAnchor] = useState(link.anchor);
  const [href, setHref] = useState(link.href);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
      await updateLink({
        id: link._id,
        anchor: anchor.trim(),
        href: href.startsWith("http") ? href : `https://${href}`,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
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
              <X className="h-4 w-4" />
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
