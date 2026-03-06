"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { PiPencilSimple, PiTrash, PiClock, PiCalendarCheck, PiCalendarX } from "react-icons/pi";
import { trackProfileLinkClicked } from "@/lib/analytics";

function getScheduleStatus(link: { publishAt?: number; unpublishAt?: number }): "live" | "scheduled" | "expired" {
  const now = Date.now();
  if (link.publishAt && link.publishAt > now) return "scheduled";
  if (link.unpublishAt && link.unpublishAt <= now) return "expired";
  return "live";
}

interface LinkItemProps {
  link: {
    _id: Id<"links">;
    userId: string;
    anchor: string;
    href: string;
    icon?: string;
    publishAt?: number;
    unpublishAt?: number;
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

  const scheduleStatus = getScheduleStatus(link);
  const isNotLive = scheduleStatus !== "live";

  return (
    <div className={`w-full rounded-lg px-6 py-4 flex items-center justify-between transition-colors cursor-pointer ${
      isNotLive && isOwner
        ? "bg-primary/50 dark:bg-primary/30 border border-dashed border-primary/60"
        : "bg-primary hover:bg-primary-hover"
    }`}>
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
        {isOwner && scheduleStatus === "scheduled" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-0.5 text-xs font-medium shrink-0">
            <PiClock className="h-3 w-3" />
            Scheduled
          </span>
        )}
        {isOwner && scheduleStatus === "expired" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 px-2 py-0.5 text-xs font-medium shrink-0">
            <PiCalendarX className="h-3 w-3" />
            Expired
          </span>
        )}
        {isOwner && scheduleStatus === "live" && (link.publishAt || link.unpublishAt) && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-2 py-0.5 text-xs font-medium shrink-0">
            <PiCalendarCheck className="h-3 w-3" />
            Live
          </span>
        )}
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
            <PiPencilSimple className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="p-2 hover:bg-primary-hover/50 rounded transition-colors text-primary-foreground"
            disabled={isDeleting}
            aria-label="Delete link"
          >
            <PiTrash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
