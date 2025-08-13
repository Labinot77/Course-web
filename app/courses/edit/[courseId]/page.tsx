"use client";

import { postRequest } from "@/app/lib/api/Post";
import React from "react";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

const Page = ({ params }: PageProps) => {
  const { courseId } = React.use(params); // ✅ unwrap params

  const handleCreateEpisode = async () => {
    try {
      const data = await postRequest("/api/course/post", { courseId });
      console.log("Created episode:", data.episode);
      alert(`Episode created: ${data.episode.title}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="h-[85vh] flex flex-col gap-4 p-4">
      <h1>Edit Course ID: {courseId}</h1>
      <button
        onClick={handleCreateEpisode}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Random Episode
      </button>
    </section>
  );
};

export default Page;
