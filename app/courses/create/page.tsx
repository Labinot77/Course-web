"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EpisodeListManagement from "./components/EpisodeListManagement";
import EditFieldModal from "./components/EditFieldModal";
import { CourseProps } from "@/app/types/types";
import { Categories, Price } from "@/app/constants/filter";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const courseFormSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  imgUrl: z.string().url(),
  isFree: z.boolean(),
  category: z.string().min(2),
  price: z.number().min(0),
  episodes: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(2),
      description: z.string(),
      videoUrl: z.string().url(),
      duration: z.number().min(0),
      createdAt: z.string().optional(), // ← optional for form
      updatedAt: z.string().optional(), // ← optional for form
    })
  ),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

export default function EditCoursePage() {
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      description: "",
      imgUrl: "",
      isFree: true,
      category: "",
      price: 0,
      episodes: [],
    },
  });

  const {
    fields: episodes,
    append,
    move,
    update,
  } = useFieldArray({
    control: form.control,
    name: "episodes",
    keyName: "key",
  });

  const selectedEpisodeData = episodes.find((ep) => ep.id === selectedEpisode);

  const handleReorderEpisodes = (episodes: CourseFormValues["episodes"]) => {
    form.setValue("episodes", episodes); // update react-hook-form state
  };

  const handleAddEpisode = (episode: CourseProps["episodes"][number]) => {
    append(episode);
  };

  const onSubmit = (data: CourseFormValues) => {
    console.log("Course submitted:", data);
  };

  // Add description and video upload func to episode modal, seperate everything into diff components

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
      <section className="grid grid-cols-3 gap-7">
        <div className="space-y-1">
          {/* Title */}
          <div className="bg-primary-foreground">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Course Title</CardTitle>
                <EditFieldModal
                  label="Course Title"
                  field="title"
                  form={form}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Input
                className="w-full -mt-3"
                disabled
                {...form.register("title")}
              />
            </CardContent>
          </div>

          <div className="bg-primary-foreground">
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={form.getValues("category")}
                onValueChange={(val) => form.setValue("category", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </div>

          {/* Price */}
          <div className="bg-primary-foreground">
            <CardHeader>
              Price
              <CardDescription>Amount is in credits</CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                className="w-full"
                type="number"
                min={0}
                step={1.0}
                {...form.register("price", { valueAsNumber: true })}
              />
            </CardContent>
            {/* <h1 className="font-semibold mb-1">Price</h1> */}
          </div>

          <div className="bg-primary-foreground">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Image URL</CardTitle>
                <EditFieldModal label="Image URL" field="imgUrl" form={form} />
              </div>
            </CardHeader>
            <CardContent>
              <Input
                className="w-full -mt-3"
                disabled
                {...form.register("imgUrl")}
              />
            </CardContent>
          </div>
        </div>

        <div className="bg-primary-foreground p-4 col-span-2 space-y-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Course Description</CardTitle>
              <EditFieldModal
                label="Course Description"
                field="description"
                type="textarea"
                form={form}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              className="resize-none -mt-3"
              rows={5}
              disabled
              {...form.register("description")}
            />
          </CardContent>
        </div>
      </section>

      <Separator />

      {/* Episodes */}
      <div className="h-[70vh] flex gap-8 overflow-hidden">
        <div className="flex-shrink-0 w-80 overflow-y-auto">
          <EpisodeListManagement
            course={{ ...form.getValues(), episodes }}
            onSelectEpisode={setSelectedEpisode}
            onReorderEpisodes={handleReorderEpisodes}
            onAddEpisode={handleAddEpisode}
            onSave={form.handleSubmit(onSubmit)}
          />
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

    </form>
  );
}
