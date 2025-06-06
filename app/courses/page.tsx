import { getCourses } from "../lib/getCourses";
import Course_filter_bar from "../components/Course/Course_filter_bar";
import Filter_list from "../components/Course/FilterListForCourses";
import Link from "next/link";
import Image from "next/image";
import { initFirebaseAdmin } from "@/db/firebaseAdmin";

const Page = async () => {
  initFirebaseAdmin();
  const courses = await getCourses();

  return (
    <main className="flex gap-2 h-[85vh] w-full">
      <Filter_list />
      <div className="w-full">
        <Course_filter_bar />

        <div className="max-h-[78vh] overflow-y-auto grid grid-cols-3 justify-items-center gap-2 mt-2">
          {courses.map((course) => (
            <Link
              href={`/courses/${course.id}`}
              key={course.id}
              className="w-96 h-64 bg-primary-foreground rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative h-32 w-full">
                <Image
                  src={course.imageUrl || "/placeholder.png"}
                  alt={course.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold truncate">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  By {course.instructor || "Unknown Author"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {course.duration || "No duration listed"}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {course.price && course.price > 0
                    ? `$${course.price}`
                    : "Free"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
