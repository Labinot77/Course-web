"use client";

import { useCollections } from "@/app/hooks/useCollections";
import { useCourse } from "@/app/hooks/useCourse";
import { UseUser } from "@/app/hooks/useUser";
import NotAuthenticated from "@/app/no-access/page";
import { redirect } from "next/navigation";

export default function EditCoursePage() {
  const { collectionId } = useCollections();
  const { course, loading } = useCourse(`/api/course/get/${collectionId}`);
  const { user, status } = UseUser();

  if ((status !== "loading" && user?.id) === (!loading && course?.createdBy.id)) {
    redirect("/courses")
  }  


return (
  <div>
    Colleciton = {collectionId}
  {/* Episodes */}
    </div>
  );
}
