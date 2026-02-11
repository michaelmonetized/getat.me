"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortable-item";

interface Link {
  _id: Id<"links">;
  userId: string;
  anchor: string;
  href: string;
  icon?: string;
}

interface SortableLinksProps {
  links: Link[];
  handle: string;
  onEdit: (id: Id<"links">) => void;
}

export function SortableLinks({ links, handle, onEdit }: SortableLinksProps) {
  const [items, setItems] = useState(links);
  const reorderLinks = useMutation(api.links.reorderLinks);

  // Update items when links prop changes
  useEffect(() => {
    setItems(links);
  }, [links]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item._id === active.id);
      const newIndex = items.findIndex((item) => item._id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      // Persist the new order
      try {
        await reorderLinks({
          linkIds: newItems.map((item) => item._id),
        });
      } catch (err) {
        console.error("Failed to reorder links:", err);
        // Revert on error
        setItems(links);
      }
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {items.map((link) => (
            <SortableItem
              key={link._id}
              link={link}
              handle={handle}
              onEdit={() => onEdit(link._id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
