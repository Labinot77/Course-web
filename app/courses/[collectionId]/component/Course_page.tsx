"use client";

import { DefaultButton } from "@/app/components/buttons/Buttons";
import CourseEpisodesList from "@/app/components/Course/courseEpisodesList";
import { useCourse } from "@/app/hooks/useCourse";
import { HeaterIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Course_page = ({ courseId }: { courseId: string }) => {
  const { course, loading } = useCourse(`/api/course/get/${courseId}`);
  const router = useRouter();

  if (!course) return <p>Course not found</p>;
  

  return (
    <div className="h-[81vh] overflow-hidden">
      <section className="h-full flex gap-12">
        <div className="h-full flex-shrink-0">
          {/* Pass episodes list here and is course saved */}
          <CourseEpisodesList />
        </div>

        <main className="w-full h-screen overflow-y-auto pr-2">
          <div className="bg-primary-foreground h-[55vh] w-full"></div>

          <div className="flex justify-between mt-4">
            <div className="flex gap-3">
              <div className="justify-start items-center">
                <Image
                  onClick={() => router.push(`/user/${course.createdBy.id}`)}
                  src={course.createdBy.image || "/default-avatar.png"}
                  alt={course.title}
                  height={40}
                  width={40}
                  className="object-cover rounded-full hover:shadow-lg transition-all cursor-pointer"
                />
              </div>

              <div className="flex flex-col w-full -mt-1.5">
                <h1 className="text-lg font-semibold truncate">Current episode title</h1>
                <p className="text-sm text-muted-foreground">
                  {course.createdBy.name}
                </p>
                <div className="flex justify-between">
                  <ul className="flex gap-2 text-sm text-muted-foreground">
                  </ul>
                </div>
              </div>
            </div>

            <DefaultButton className="mr-3" variant="destructive">
              <HeaterIcon />
            </DefaultButton>
          </div>

          {/* Dummy content to test scrolling */}
          {Array(6).fill(null).map((_, i) => (
            <div
              key={i}
              className="bg-slate-950 bg-opacity-45 p-4 mt-8 rounded-md"
            >
              Description of episode
            </div>
          ))}
        </main>
      </section>
    </div>
  );
};

export default Course_page;
