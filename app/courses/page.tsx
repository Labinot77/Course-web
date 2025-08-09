"use client";

import Course_filter_bar from "../components/Course/Course_filter_bar";
import Filter_list from "../components/Course/FilterListForCourses";
import Course_card from "../components/Course/Course_card";
import CourseGridSkeleton from "../components/Course/Course_card_skeleton";
import { useCourse } from "../hooks/useCourse";

const Page = () => {
  const { courses, loading } = useCourse("api/courses/get");
console.log("Courses:", courses);
  return (
    <main className="flex gap-2 h-[85vh] w-full">
      <Filter_list />
      <div className="w-full">
        <Course_filter_bar />
        
        <div className="max-h-[78vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 justify-items-center gap-10 mt-2">
          {loading
            ? <CourseGridSkeleton />
            : courses.map((course) => (
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
                  duration={course.duration || "No duration listed"}
                  price={course.price}
                />
              ))}
        </div>
      </div>
    </main>
  );
};

export default Page;