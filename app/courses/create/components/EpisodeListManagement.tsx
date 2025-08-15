"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus } from "lucide-react";
import { CourseProps } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DefaultButton } from "@/app/components/buttons/Buttons";

type Props = {
  course: CourseProps;
  onSelectEpisode: (id: string) => void;
  onReorderEpisodes: (episodes: CourseProps["episodes"]) => void;
  onAddEpisode: (episode: CourseProps["episodes"][number]) => void;
};

export default function EpisodeListManagement({
  course,
  onSelectEpisode,
  onReorderEpisodes,
  onAddEpisode,
}: Props) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = course.episodes.findIndex((ep) => ep.id === active.id);
      const newIndex = course.episodes.findIndex((ep) => ep.id === over.id);
      const newEpisodes = arrayMove(course.episodes, oldIndex, newIndex);
      onReorderEpisodes(newEpisodes);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between ">
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={course.episodes.map((ep) => ep.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {course.episodes.map((episode) => (
            <SortableEpisodeItem
              key={episode.id}
              episode={episode}
              onClick={() => onSelectEpisode(episode.id)}
            />
          ))}

          {/* Create Episode Button */}
          <CreateEpisodeButton onAddEpisode={onAddEpisode} />
        </div>
      </SortableContext>
    </DndContext>

        <DefaultButton>
          Save Course
        </DefaultButton>
    </div>

    
  );
}

function SortableEpisodeItem({
  episode,
  onClick,
}: {
  episode: CourseProps["episodes"][number];
  onClick: () => void;
}) {
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
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>
      <span className="flex-1">{episode.title}</span>
    </div>
  );
}

function CreateEpisodeButton({
  onAddEpisode,
}: {
  onAddEpisode: (episode: CourseProps["episodes"][number]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAddEpisode({
      id: `ep-${Date.now()}`,
      title,
      description: "",
      videoUrl: "",
      duration: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setTitle("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Episode
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Episode</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Episode title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={handleAdd}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
