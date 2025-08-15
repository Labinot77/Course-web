"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import CourseEpisodesList from "@/app/components/Course/courseEpisodesList";
import { CourseProps } from "@/app/types/types";

export default function EditCoursePage() {
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);
  const [course, setCourse] = useState<CourseProps>({
    id: "1",
    title: "Master React 2025",
    description: "A full React course with projects, hooks, and modern patterns.",
    imgUrl: "/react-course.jpg",
    isFree: false,
    category: "Programming",
    price: 49.99,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    createdBy: {
      id: "u1",
      name: "John Doe",
      email: "john@example.com",
      image: "/avatar.jpg",
    },
    savedBy: [],
    episodes: [
      {
        id: "e1",
        title: "Introduction",
        description: "Course overview and setup instructions.",
        videoUrl: "https://example.com/video1.mp4",
        duration: 600,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: "e2",
        title: "React Basics",
        description: "Learn the fundamentals of React components and JSX.",
        videoUrl: "https://example.com/video2.mp4",
        duration: 1200,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    ],
  });

  const selectedEpisodeData = course.episodes.find((ep) => ep.id === selectedEpisode);

  /** Modal form for editing a field */
  const EditFieldModal = ({
    field,
    label,
    type = "text",
  }: {
    field: keyof CourseProps;
    label: string;
    type?: "text" | "textarea" | "number";
  }) => {
    const form = useForm({
      defaultValues: {
        value: course[field] as any,
      },
    });

    const onSubmit = (data: any) => {
      setCourse((prev) => ({
        ...prev,
        [field]: type === "number" ? parseFloat(data.value) : data.value,
      }));
    };

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <PenSquare className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {label}</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {type === "textarea" ? (
              <Textarea {...form.register("value")} />
            ) : (
              <Input type={type} {...form.register("value")} />
            )}
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <main className="space-y-8 p-4">
      <h2 className="text-center text-2xl font-bold">Course Details</h2>
      <section className="grid grid-cols-3 gap-7">
        <div className="p-4 bg-primary-foreground space-y-2">
          {/* Title */}
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">Course Title</h1>
            <EditFieldModal field="title" label="Course Title" />
          </div>
          <Input disabled value={course.title} />

          {/* Category (Select) */}
          <div className="flex justify-between items-center mt-2">
            <h1 className="font-semibold">Category</h1>
          </div>
          <Select
            value={course.category}
            onValueChange={(val) => setCourse((prev) => ({ ...prev, category: val }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Programming">Programming</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          {/* Price & Free Toggle */}
          <div className="flex justify-between items-center mt-2">
            <h1 className="font-semibold">Price</h1>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={course.isFree}
              onCheckedChange={(checked) => {
                setCourse((prev) => ({ ...prev, isFree: checked, price: checked ? 0 : prev.price }));
              }}
            />
            <span>{course.isFree ? "Free" : "Paid"}</span>
          </div>
          {!course.isFree && (
            <Input
              type="number"
              min="0"
              step="0.01"
              value={course.price}
              onChange={(e) => setCourse((prev) => ({ ...prev, price: parseFloat(e.target.value) }))}
            />
          )}

          {/* Image URL */}
          <div className="flex justify-between items-center mt-2">
            <h1 className="font-semibold">Image URL</h1>
            <EditFieldModal field="imgUrl" label="Image URL" />
          </div>
          <Input disabled value={course.imgUrl} />
        </div>

        {/* Description */}
        <div className="p-4 bg-primary-foreground space-y-2 col-span-2">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">Course Description</h1>
            <EditFieldModal field="description" label="Course Description" type="textarea" />
          </div>
          <Textarea disabled value={course.description} />
        </div>
      </section>

      <Separator />

      {/* Episodes */}
      <div className="h-[70vh] flex gap-8 overflow-hidden">
        <div className="flex-shrink-0 w-80 overflow-y-auto">
          <CourseEpisodesList course={course} onSelectEpisode={setSelectedEpisode} />
        </div>

        <div className="flex-1 h-full overflow-y-auto bg-primary-foreground p-4">
          {selectedEpisodeData ? (
            <div>
              <h2 className="text-xl font-bold">{selectedEpisodeData.title}</h2>
              <p className="mt-2">{selectedEpisodeData.description}</p>
              <p className="mt-2 text-sm text-gray-400">
                Duration: {selectedEpisodeData.duration} seconds
              </p>
            </div>
          ) : (
            <p className="text-gray-500">No episode selected</p>
          )}
        </div>
      </div>
    </main>
  );
}
