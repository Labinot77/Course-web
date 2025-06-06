"use client";

import Course_filter_bar from "@/app/components/Course/Course_filter_bar";
import Filter_list from "@/app/components/Course/FilterListForCourses";
import Link from "next/link";

const Page = () => {
  // const { savedCourses, loading } = useSavedCourses();

  return (
    <main className="flex gap-2 h-[85vh] w-full">
      <Filter_list />
      <div className="w-full">
        <Course_filter_bar />

        {/* <div className="max-h-[78vh] overflow-y-auto grid grid-cols-3 justify-items-center gap-2 mt-2">
        
          {loading ? (
            <div className="flex justify-center items-center h-full col-span-3">
              <p className="text-lg">Loading saved courses...</p>
            </div>
          ) : savedCourses.length === 0 ? (
            <div className="flex justify-center items-center h-full col-span-3">
              <p className="text-lg">Empty.</p>
            </div>
          ) : (
            savedCourses.map((course) => (
              <Link
                href={`${course.id}`}
                key={course.id}
                className="border p-4 rounded shadow"
              >
                {course.id}
              </Link>
            ))
          )}
        </div> */}
      </div>
    </main>
  );
};

export default Page;
