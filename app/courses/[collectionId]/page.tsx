"use client";

import { DefaultButton } from "@/app/components/buttons/Buttons";
import CourseEpisodesList from "@/app/courses/[collectionId]/components/EpisodesList";
import { useCourse } from "@/app/hooks/useCourse";
import { Separator } from "@/components/ui/separator";
import { HeaterIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCollections } from "@/app/hooks/useCollections";
import { FaHeart } from "react-icons/fa";

const page = () => {
  const { collectionId } = useCollections();
  const { course, loading } = useCourse(`/api/course/get/${collectionId}`);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  // const [showNoEpisodesModal, setShowNoEpisodesModal] = useState(false);

  // Make a custom hook for the Episode search param so this code is clearer
  // useEffect(() => {
  //   if (!course) return;

  //   if (!course.episodes || course.episodes.length === 0) {
  //     setShowNoEpisodesModal(true);
  //     return;
  //   }

  //   const episodeId = searchParams.get("episodeId");
  //   const found =
  //     course.episodes.find((ep) => ep.id === episodeId) || course.episodes[0];
  //   setSelectedEpisode(found);
  // }, [course, searchParams]);

  if (loading) return <div>Loading...</div>;
  if (!course) return null;

  return (
    <>
      {/* No Episodes Modal
      <Dialog open={showNoEpisodesModal} onOpenChange={setShowNoEpisodesModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>No Episodes Available</DialogTitle>
            <DialogDescription>
              This course currently has no episodes. You cannot access it until
              the creator adds content.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.push("/")}>Go Back Home</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {/* Main Layout */}
      <div className="h-[81vh] overflow-hidden">
        <section className="h-full flex gap-12">
          <div className="h-full flex-shrink-0">
            <CourseEpisodesList
              course={course}
              onSelectEpisode={setSelectedEpisode}
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
                <FaHeart />
              </DefaultButton>
            </div>

            <Separator />

            <div className="bg-slate-950 bg-opacity-45 p-4 mt-8 rounded-md">
              {selectedEpisode?.description || "No description available"}
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default page;
