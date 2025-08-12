"use client";

import Course_card from "@/app/components/Course/Course_card";
import CourseGridSkeleton from "@/app/components/skeletons/Course_card_skeleton";
import Course_filter_bar from "@/app/components/Course/Course_filter_bar";
import { useCourse } from "@/app/hooks/useCourses";

const page = () => {
  const { courses, loading } = useCourse("/api/courses/user/created-by");
  return (
    <main className="flex gap-2 h-[85vh] w-full">
      <div className="w-full">
        <Course_filter_bar />

        <div className="max-h-[78vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-x-10 gap-y-6 mt-2 px-3">
          {loading ? (
            <CourseGridSkeleton />
          ) : (
            courses.map((course) => (
              <Course_card
                id={course.id}
                title={course.title}
                key={course.id}
                userData={{
                  id: course.createdBy.id,
                  name: course.createdBy.name,
                  image: course.createdBy.image,
                }}
                imageUrl={course.imageUrl || ""}
                duration={course.duration}
                category={course.category}
                price={course.price}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default page;
