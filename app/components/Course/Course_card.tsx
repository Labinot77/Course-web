"use client";

import { getUser } from "@/app/hooks/getUser";
import { postRequest } from "@/app/lib/api/Post";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

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
  const user = getUser().user;
  const saveCourse = async (
    courseId: string,
    courseData: Record<string, any>
  ) => {
    if (!user) return;

    try {
      await postRequest("/api/save-course", {
        uid: user.uid,
        courseId,
        courseData,
      });
      console.log("Course saved!");
    } catch (error) {
      console.error("Error saving course:", error);
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

      <Button
        onClick={(e) => {
          e.preventDefault();
          saveCourse(id, {
            title,
            instructor,
            duration,
            price,
            imageUrl,
          });
        }}
      >
        Save Course
      </Button>
    </Link>
  );
};

export default Course_card;
