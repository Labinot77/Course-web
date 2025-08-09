"use client";

import Course_filter_bar from "@/app/components/Course/Course_filter_bar";
import Filter_list from "@/app/components/Course/FilterListForCourses";
import Course_card from "@/app/components/Course/Course_card";
import { useCourse } from "@/app/hooks/useCourse";
import CourseGridSkeleton from "@/app/components/Course/Course_card_skeleton";

const Page = () => {
  const { courses, loading } = useCourse("/api/courses/saved");

  return (
    <main className="flex gap-2 h-[85vh] w-full">
      <Filter_list />
      <div className="w-full">
        <Course_filter_bar />

        <div className="max-h-[78vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-items-center gap-10 mt-2">
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

export default Page;
