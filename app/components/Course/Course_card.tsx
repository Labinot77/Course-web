"use client";

import { postRequest } from "@/app/lib/api/Post";
import Image from "next/image";
import Link from "next/link";
import { DefaultButton } from "../buttons/Buttons";
import { useState } from "react";

interface Course {
  id: string;
  title: string;
  instructor?: string;
  duration?: string;
  price?: number;
  imageUrl?: string;
}

const Course_card = ({
  id,
  title,
  instructor,
  duration,
  price,
  imageUrl,
}: Course) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveCourse = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    
    setSaving(true);
    try {
      await postRequest("/api/courses/user/save", {
        courseId: id,
        title,
        instructor,
        duration,
        price,
        imageUrl,
      });
      setSaved(true);
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Link
      href={`/courses/${id}`}
      key={id}
      className="w-96 bg-primary-foreground rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="relative h-32 w-full">
        <Image
          src={imageUrl || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-muted-foreground">
          By {instructor || "Unknown Author"}
        </p>
        <p className="text-sm text-muted-foreground">
          {duration || "No duration listed"}
        </p>
        <p className="text-sm text-muted-foreground font-medium">
          {price && price > 0 ? `$${price}` : "Free"}
        </p>
      </div>

      <DefaultButton onClick={saveCourse} isReactive>
        {saved ? "Saved!" : saving ? "Saving..." : "Save Course"}
      </DefaultButton>
    </Link>
  );
};

export default Course_card;
