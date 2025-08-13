"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Link from "next/link";
import { DefaultButton } from "../buttons/Buttons";
import { Skeleton } from "@/components/ui/skeleton";
import { UseUser } from "@/app/hooks/useUser";

interface Course {
  id: string;
  title: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  episodes: {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

const CourseEpisodesList = ({ course }: { course: Course }) => {
  const { user, status } = UseUser();

  console.log(course)
  return (
    <main className="flex flex-col justify-between h-full gap-4">
      <div className="w-[19rem] bg-primary-foreground rounded-md h-max p-2 flex flex-col gap-2 overflow-y-auto">
        <ul className="flex flex-col gap-2">
        {course.episodes.map((ep) => (
              <Button
                variant="ghost"
                key={ep.id}
                className="flex justify-between items-center p-2 rounded-md"
              >
                {/* Add it in url as &= */}
                <Link
                  href={`/courses/${course.id}/episode/${ep.id}`}
                  className="flex items-center gap-2"
                >
                  <p>{ep.title}</p>
                  <MdOutlineModeEditOutline />
                </Link>
              </Button>
            ))}
        </ul>
      </div>

      {status === "loading" ? (
        <DefaultButton disabled>Loading...</DefaultButton>
      ) : (
        <DefaultButton>
            <Link href={`/courses/edit/${course.id}`} className="w-full">
            {user && course.createdBy.id === user.id
              ? "Edit Course"
              : "Save Course"}
        </Link>
          </DefaultButton>
      )}
    </main>
  );
};

export default CourseEpisodesList;
