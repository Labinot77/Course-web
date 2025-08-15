import Course_episodes_list from "@/app/components/Course/Course_episodes_list";

interface PageProps {
  params: {
    courseId: string;
    episodeId: string;
  };
}
const page = async ({ params }: PageProps) => {
  return (
    <section className="h-[85vh] flex gap-4">
    <Course_episodes_list id={params.courseId} />

    <main className="w-full flex justify-center">
      <div className="bg-primary-foreground h-[50vh] w-[60rem]"></div>
    </main>
  </section>
)
};

export default page;
