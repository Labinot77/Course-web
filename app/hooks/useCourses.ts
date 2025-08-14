"use client";

import { useEffect, useState } from "react";
import { getRequest } from "@/app/lib/api/Get";
import { CourseProps } from "../types/types";

// interface CourseProps {
//   id: string;
//   title: string;
//   description: string;
//   duration: string;
//   category: string;
//   price: number;
//   imageUrl: string;
//   episodes: {
//     id: string;
//     title: string;
//     description: string;
//     duration: string;
//     createdAt: string;
//     updatedAt: string;
//   }[];
//     createdBy: {
//     id: string;
//     name: string;
//     image: string;
//   }
// }

export const useCourses = (apiUrl: string) => {
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequest<any[]>(apiUrl);
        setCourses(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { courses, loading };
};
