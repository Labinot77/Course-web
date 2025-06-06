"use client"

import SaveCourseButton from "@/app/components/Course/Save_course_button";
import Course_episodes_list from "@/app/components/Course/Course_episodes_list";
import CourseEpisodesListPublic from "@/app/components/Course/Course_episodes_list_public";

interface CoursePageProps {
  data: {
    id: string;
    title: string;
    description: string;
    duration?: number;
    videoUrl?: string;
    [key: string]: any;
  };
}


const Course_page = ({ data }: CoursePageProps) => {
  const courseId = data.id;
  return (
    <div>
      {/* <h2>{data.title}</h2> */}

      <section className="h-[85vh] flex gap-4">
      <CourseEpisodesListPublic id={courseId} />

      <main className="w-full flex justify-center">
        <div className="bg-primary-foreground h-[50vh] w-[60rem]"></div>
      </main>
    </section>
      {/* <SaveCourseButton courseId={courseId} /> */}
    </div>
  );
};

export default Course_page;
