  "use client";

  import { postRequest } from "@/app/lib/api/Post";
  import Image from "next/image";
  import Link from "next/link";
  import { DefaultButton } from "../buttons/Buttons";
  import { useState } from "react";
  import { useRouter } from "next/navigation";

  interface Course {
    id: string;
    title: string;
    duration?: string;
    price?: number;
    imageUrl?: string;
    userData: {
      id: string;
      name: string;
      image: string;
    };
  }

  const Course_card = ({
    id,
    title,
    userData,
    duration,
    price,
    imageUrl,
  }: Course) => {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const saveCourse = async (e: React.MouseEvent) => {
      e.preventDefault(); 
      
      setSaving(true);
      try {
        await postRequest("/api/courses/user/save", {
          courseId: id,
          title,
          instructor,
          duration,
          price,
          imageUrl,
        });
        setSaved(true);
      } catch (error) {
        console.error("Error saving course:", error);
      } finally {
        setSaving(false);
      }
    };

    return (
      <Link
        href={`/courses/${id}`}
        key={id}
        className="w-full p-2 rounded-xl hover:bg-slate-700 transition-colors"
      >
        <div className="relative h-[33vh] w-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover rounded-lg hover:shadow-lg hover:rounded-none transition-all"
          />
        </div>
          {userData.image}
        <div className="flex gap-3 mt-4">
          <div className="justify-start items-center">
              <Image
                onClick={() => router.push(`/user/${userData.id}`)}
                src={userData.image}
                alt={title}
                height={40}
                width={40}
                className="object-cover rounded-full hover:shadow-lg transition-all"
              />
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg font-semibold truncate">{title}</h1>
            <p>{userData.name}</p>
            <ul className="flex gap-2">
              <li>34 Saved</li>
              <li>1 Day ago</li>
            </ul>
          </div>
        </div>

     
        {/* <DefaultButton onClick={saveCourse} isReactive>
          {saved ? "Saved!" : saving ? "Saving..." : "Save Course"}
        </DefaultButton> */}
      </Link>
    );
  };

  export default Course_card;
