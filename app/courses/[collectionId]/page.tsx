import Course_page from "./component/Course_page";


interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const courseId = params.id;

  // if (!courseData) {
  //   return <div>Course not found</div>;
  // }

  return (
    <>
      <Course_page data={courseData} />
    </>
  );
};

export default Page;
