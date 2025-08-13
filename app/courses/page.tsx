"use client";

import Course_filter_bar from "../components/Course/Course_filter_bar";
import Filter_list from "../components/Course/FilterListForCourses";
import Course_card from "../components/Course/Course_card";
import CourseGridSkeleton from "../components/skeletons/Course_card_skeleton";
import { useCourses } from "../hooks/useCourses";

const Page = () => {
  const { courses, loading } = useCourses("api/courses/get");

  return (
    <main className="flex gap-2 h-[85vh] w-full">
      <Filter_list />
      <div className="w-full">
        <Course_filter_bar />

        <div className="max-h-[78vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-items-center gap-x-10 gap-y-6 mt-2 px-3">
          {loading ? (
            <CourseGridSkeleton />
          ) : courses.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 mt-4">
              No courses found.
            </div>
          ) : (
            courses.map((course) => (
              <Course_card
                id={course.id}
                title={course.title}
                episodes={course.episodes.length || 0}
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
