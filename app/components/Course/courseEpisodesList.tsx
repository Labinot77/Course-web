"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { DefaultButton } from "../buttons/Buttons";
import { UseUser } from "@/app/hooks/useUser";
import Link from "next/link";
import { CourseProps } from "@/app/types/types";
import { useRouter } from "next/dist/client/components/navigation";

const CourseEpisodesList = ({
  course,
  onSelectEpisode,
}: {
  course: CourseProps;
  onSelectEpisode: (ep: any) => void;
}) => {
  const router = useRouter();
  const { user, status } = UseUser();

  return (
    <main className="flex flex-col justify-between h-full gap-4">
      <div className="w-[19rem] bg-primary-foreground rounded-md h-max p-2 flex flex-col gap-2 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {course.episodes.map((ep: any) => (
            <Button
              key={ep.id}
              variant="ghost"
              onClick={() => {
                onSelectEpisode(ep);
                router.push(`?episodeId=${ep.id}`, { scroll: false }); // updates query
              }}
              className="flex py-4 px-2 rounded-md justify-between"
            >
              <p>{ep.title}</p>
              <p>{ep.duration || "4 Minutes"}</p>
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
