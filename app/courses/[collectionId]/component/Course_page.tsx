"use client";

import { DefaultButton } from "@/app/components/buttons/Buttons";
import CourseEpisodesList from "@/app/components/Course/courseEpisodesList";
import { useCollections } from "@/app/hooks/useCollections";
import { useCourse } from "@/app/hooks/useCourse";
import { HeaterIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Course_page = ({ courseId }: { courseId: string }) => {
  const { course, loading } = useCourse(`/api/course/get/${courseId}`);
  const { collectionId } = useCollections();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);

  // Use collectionId directly instead of passing it thru the server
  console.log(collectionId)
  useEffect(() => {
    if (!course) return;
    const episodeId = searchParams.get("episodeId");
    const found =
      course.episodes.find((ep) => ep.id === episodeId) || course.episodes[0];
    setSelectedEpisode(found);
  }, [course, searchParams]);

  if (!course) return null;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="h-[81vh] overflow-hidden">
      <section className="h-full flex gap-12">
        <div className="h-full flex-shrink-0">
          <CourseEpisodesList
            course={course}
            onSelectEpisode={setSelectedEpisode} // Pass setter to child
          />
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
                <h1 className="text-lg font-semibold truncate">
                  {selectedEpisode?.title || "No episode selected"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {course.createdBy.name}
                </p>
              </div>
            </div>

            <DefaultButton className="mr-3" variant="destructive">
              <HeaterIcon />
            </DefaultButton>
          </div>

          <div className="bg-slate-950 bg-opacity-45 p-4 mt-8 rounded-md">
            {selectedEpisode?.description || "No description available"}
          </div>
        </main>
      </section>
    </div>
  );
};

export default Course_page;
