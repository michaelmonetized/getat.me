"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PiPlus,
  PiPencilSimple,
  PiTrash,
  PiCheck,
  PiX,
} from "react-icons/pi";

export function SectionManager() {
  const { user } = useUser();
  const sections = useQuery(
    api.sections.getUserSections,
    user?.id ? { userId: user.id } : "skip"
  );
  const createSection = useMutation(api.sections.createSection);
  const updateSection = useMutation(api.sections.updateSection);
  const deleteSection = useMutation(api.sections.deleteSection);

  const [newName, setNewName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<Id<"sections"> | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !user?.id) return;
    setIsAdding(true);
    try {
      await createSection({ name: newName.trim(), userId: user.id });
      setNewName("");
    } catch (err) {
      console.error("Failed to create section:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdate = async (id: Id<"sections">) => {
    if (!editName.trim() || !user?.id) return;
    try {
      await updateSection({ id, name: editName.trim(), userId: user.id });
      setEditingId(null);
    } catch (err) {
      console.error("Failed to update section:", err);
    }
  };

  const handleDelete = async (id: Id<"sections">) => {
    if (!user?.id) return;
    if (!confirm("Delete this section? Links in it will become uncategorized.")) return;
    try {
      await deleteSection({ id, userId: user.id });
    } catch (err) {
      console.error("Failed to delete section:", err);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Link Sections
      </h3>

      {/* Existing sections */}
      {sections?.map((section) => (
        <div
          key={section._id}
          className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2"
        >
          {editingId === section._id ? (
            <>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="flex-1 h-8 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUpdate(section._id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                autoFocus
              />
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => handleUpdate(section._id)}
              >
                <PiCheck className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => setEditingId(null)}
              >
                <PiX className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <span className="flex-1 text-sm font-medium">{section.name}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => {
                  setEditingId(section._id);
                  setEditName(section.name);
                }}
              >
                <PiPencilSimple className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-destructive"
                onClick={() => handleDelete(section._id)}
              >
                <PiTrash className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      ))}

      {/* Add new section */}
      <form onSubmit={handleCreate} className="flex gap-2">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New section name..."
          disabled={isAdding}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isAdding || !newName.trim()}
          size="icon"
          className="shrink-0"
          aria-label="Add section"
        >
          <PiPlus className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
