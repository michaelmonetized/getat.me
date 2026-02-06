"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { trackProfileLinkClicked } from "@/lib/analytics";

interface LinkItemProps {
  link: {
    _id: Id<"links">;
    userId: string;
    anchor: string;
    href: string;
    icon?: string;
  };
  handle?: string;
  isOwner?: boolean;
  onEdit?: () => void;
}

export function LinkItem({ link, handle, isOwner = false, onEdit }: LinkItemProps) {
  const deleteLink = useMutation(api.links.deleteLink);
  const trackEvent = useMutation(api.analytics.trackEvent);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this link?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteLink({ id: link._id });
    } catch (err) {
      console.error("Failed to delete link:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLinkClick = async () => {
    // Track the click in analytics (only for non-owners)
    if (!isOwner) {
      try {
        // Track in Convex database
        await trackEvent({
          userId: link.userId,
          eventType: "link_click",
          eventData: {
            linkId: link._id,
            referrer: typeof window !== "undefined" ? document.referrer : undefined,
            userAgent: typeof window !== "undefined" ? navigator.userAgent : undefined,
          },
        });
        // Track in PostHog
        if (handle) {
          trackProfileLinkClicked(handle, link.href);
        }
      } catch (err) {
        // Don't block the navigation if tracking fails
        console.error("Failed to track link click:", err);
      }
    }
  };

  return (
    <div className="w-full bg-primary hover:bg-primary-hover rounded-lg px-6 py-4 flex items-center justify-between transition-colors cursor-pointer">
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 flex-1 min-w-0 text-primary-foreground"
        onClick={(e) => {
          e.stopPropagation();
          handleLinkClick();
        }}
      >
        {link.icon && <div className="text-2xl shrink-0">{link.icon}</div>}
        <span className="text-lg font-medium truncate">{link.anchor}</span>
      </a>
      {isOwner && (
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit?.();
            }}
            className="p-2 hover:bg-primary-hover/50 rounded transition-colors text-primary-foreground"
            disabled={isDeleting}
            aria-label="Edit link"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="p-2 hover:bg-primary-hover/50 rounded transition-colors text-primary-foreground"
            disabled={isDeleting}
            aria-label="Delete link"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
