import Course_filter_bar from "@/app/components/Course/Course_filter_bar";
import Filter_list from "@/app/components/Course/FilterListForCourses";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  // const courses = await getCourses();

  // Filter out the courses that aren't uids
  // const myCourses = courses.filter(
  //   (course) => course.instructorId === user?.uid
  // );

  return (
    <main className="flex gap-2 h-[85vh] w-full">
      <div className="w-full">
        <Course_filter_bar />

        <div className="flex flex-wrap gap-4 p-4">
          {/* {myCourses.map((course) => (
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
          ))} */}
        </div>
      </div>
    </main>
  );
};

export default page;
