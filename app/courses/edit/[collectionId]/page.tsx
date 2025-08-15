"use client";

import { useCollections } from "@/app/hooks/useCollections";
import { useCourse } from "@/app/hooks/useCourse";

export default function EditCoursePage() {
  const { collectionId } = useCollections();
  const { course, loading } = useCourse(`/api/course/get/${collectionId}`);

  
return (
  <div>
    adsd
  {/* Episodes */}
    </div>
  );
}
