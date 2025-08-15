"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Save, Trash2, Pencil } from "lucide-react";
import { useCollections } from "@/app/hooks/useCollections";
import { useCourse } from "@/app/hooks/useCourse";

export default function EditCoursePage() {
  const { collectionId } = useCollections();
  const { course, loading } = useCourse(`/api/course/get/${collectionId}`);

  const [title, setTitle] = useState(course?.title || "");
  const [description, setDescription] = useState(course?.description || "");
  const [isFree, setIsFree] = useState(course?.price === 0);
  const [price, setPrice] = useState(course?.price || 0);
  const [episodes, setEpisodes] = useState(course?.episodes || []);

  const handleSaveCourse = () => {
    // TODO: Call API to save course
    console.log({ title, description, price: isFree ? 0 : price, episodes });
  };

  const handleAddEpisode = () => {
    const newEp = {
      id: Date.now().toString(),
      title: "New Episode",
      description: "",
    };
    setEpisodes([...episodes, newEp]);
  };

  const handleUpdateEpisode = (id: string, field: string, value: string) => {
    setEpisodes((prev) =>
      prev.map((ep) =>
        ep.id === id ? { ...ep, [field]: value } : ep
      )
    );
  };

  const handleDeleteEpisode = (id: string) => {
    setEpisodes((prev) => prev.filter((ep) => ep.id !== id));
  };

  if (loading) return <p>Loading course...</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Course Info */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex items-center gap-4">
            <Switch checked={isFree} onCheckedChange={setIsFree} />
            <span>{isFree ? "Free" : "Paid"}</span>
            {!isFree && (
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-24"
                placeholder="Price"
              />
            )}
          </div>
          <Button onClick={handleSaveCourse} className="flex items-center gap-2">
            <Save size={16} /> Save Course
          </Button>
        </CardContent>
      </Card>

      {/* Episodes */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Episodes</CardTitle>
          <Button variant="outline" onClick={handleAddEpisode} className="flex items-center gap-2">
            <PlusCircle size={16} /> Add Episode
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="p-4 border rounded-lg space-y-2 bg-muted/30"
            >
              <div className="flex justify-between items-center">
                <Input
                  value={ep.title}
                  onChange={(e) =>
                    handleUpdateEpisode(ep.id, "title", e.target.value)
                  }
                  placeholder="Episode Title"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDeleteEpisode(ep.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <Textarea
                value={ep.description}
                onChange={(e) =>
                  handleUpdateEpisode(ep.id, "description", e.target.value)
                }
                placeholder="Episode Description"
                rows={3}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
