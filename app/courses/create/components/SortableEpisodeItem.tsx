"use client";

import { DefaultButton } from "@/app/components/buttons/Buttons";
import { CourseProps } from "@/app/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";

type SortableEpisodeItemProps = {
  episode: CourseProps["episodes"][number];
  onClick: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function SortableEpisodeItem({
  episode,
  onClick,
  onEdit,
  onDelete,
}: SortableEpisodeItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: episode.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-3 bg-primary-foreground rounded shadow flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      {/* Drag handle */}
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>

      {/* Episode title */}
      <span className="flex-1">{episode.title}</span>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <DefaultButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit(episode.id);
          }}
          variant="ghost"
          isReactive
          className="px-2 py-1"
        >
          <Pencil className="w-4 h-4 text-blue-400" />
        </DefaultButton>

        <DefaultButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete(episode.id);
          }}
          variant="ghost"
          isReactive
          className="px-2 py-1"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </DefaultButton>
      </div>
    </div>
  );
}
