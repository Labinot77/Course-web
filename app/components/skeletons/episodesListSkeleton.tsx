"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Link from "next/link";
import { DefaultButton } from "../buttons/Buttons";
import CourseEpisodesList from "../../courses/[collectionId]/components/EpisodesList";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  id: string;
}

const CourseEpisodesListSkeleton = () => {
  return (
    <main className="flex flex-col justify-between h-full gap-4">
      <div className="w-[19rem] bg-primary-foreground rounded-md h-max p-2 flex flex-col gap-2 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {...Array(3).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </ul>
      </div>

      <DefaultButton>Save Course</DefaultButton>
    </main>
  );
};

export default CourseEpisodesListSkeleton;
