import Course_episodes_list from "@/app/components/Course/Course_episodes_list";
import React from "react";

interface PageProps {
  params: { courseId: string };
}


const page = async ({ params }: PageProps) => {
  const courseId = params.courseId;
  return (
    <section className="h-[85vh] flex gap-4">
      <Course_episodes_list id={courseId} />

      <main className="w-full flex justify-center">
        <div className="bg-primary-foreground h-[50vh] w-[60rem]"></div>
      </main>
    </section>
  );
};

export default page;
