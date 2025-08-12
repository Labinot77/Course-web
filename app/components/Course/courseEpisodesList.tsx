"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Link from "next/link";
import { DefaultButton } from "../buttons/Buttons";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  id: string;
}

const CourseEpisodesList = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);

  return (
    <main className="flex flex-col justify-between h-full gap-4">
      <div className="w-[19rem] bg-primary-foreground rounded-md h-max p-2 flex flex-col gap-2 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {episodes.length === 0 ? (
            <div className="flex flex-col gap-2">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-7 w-full flex flex-row-reverse items-center">
                    <Skeleton className="h-4 w-4 mr-2 round-sm"/>
                    <Skeleton className="h-4 w-4 mr-2 round-sm"/>
                  </Skeleton>
                ))}
            </div>
          ) : (
            episodes.map((ep) => (
              <Button
                variant="ghost"
                key={ep.id}
                className="flex justify-between items-center p-2 rounded-md"
              >
                <Link
                  href={`/courses/${COURSE_ID}/episode/${ep.id}`}
                  className="flex items-center gap-2"
                >
                  <p>{ep.title}</p>
                  <MdOutlineModeEditOutline />
                </Link>
              </Button>
            ))
          )}
        </ul>
      </div>

      <DefaultButton>Save Course</DefaultButton>
    </main>
  );
};

export default CourseEpisodesList;
