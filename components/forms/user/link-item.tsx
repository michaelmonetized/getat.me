"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface LinkItemProps {
  link: {
    _id: Id<"links">;
    anchor: string;
    href: string;
    icon?: string;
  };
  onEdit?: () => void;
}

export function LinkItem({ link, onEdit }: LinkItemProps) {
  const deleteLink = useMutation(api.links.deleteLink);
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

  return (
    <div className="w-full bg-primary hover:bg-primary-hover rounded-lg px-6 py-4 flex items-center justify-between transition-colors cursor-pointer">
      <Link
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 flex-1 min-w-0 text-primary-foreground"
        onClick={(e) => e.stopPropagation()}
      >
        {link.icon && <div className="text-2xl shrink-0">{link.icon}</div>}
        <span className="text-lg font-medium truncate">{link.anchor}</span>
      </Link>
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
    </div>
  );
}
