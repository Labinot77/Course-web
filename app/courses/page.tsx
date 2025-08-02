import Course_filter_bar from "../components/Course/Course_filter_bar";
import Filter_list from "../components/Course/FilterListForCourses";
import Link from "next/link";
import Image from "next/image";
import Course_card from "../components/Course/Course_card";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth()
  console.log(session?.user)
// Add courses from db
  return (
    <main className="flex gap-2 h-[85vh] w-full">
      <Filter_list />
      <div className="w-full">
        <Course_filter_bar />

        <div className="max-h-[78vh] overflow-y-auto grid grid-cols-3 justify-items-center gap-2 mt-2">
          {/* {courses.map((course) => (
            <Course_card
              id={course.id}
              title={course.title}
              key={course.id}
              imageUrl={course.imageUrl || "/placeholder.png"}
              instructor={course.instructor || "Unknown Author"}
              duration={course.duration || "No duration listed"}
              price={course.price}
            />
          ))} */}
        </div>
      </div>
    </main>
  );
};

export default Page;
