"use client";

import { useEffect, useState } from "react";
import { getRequest } from "@/app/lib/api/Get";
import { CourseProps } from "../types/types";

export const useCourse = (apiUrl: string) => {
  const [course, setCourse] = useState<CourseProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequest<any>(apiUrl);
        setCourse(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { course, loading };
};
