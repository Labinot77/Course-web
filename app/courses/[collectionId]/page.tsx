import { getRequest } from "@/app/lib/api/Get";
import Course_page from "./component/Course_page";
import { getUserFromDB } from "@/app/lib/User";

interface Props {
  params: Promise<{ collectionId: string }>;
}

const Page = async ({ params }: Props) => {
  const { collectionId } = await params;
  const courseId = collectionId;

  return (
    <>
      <Course_page courseId={courseId} />
    </>
  );
};

export default Page;
