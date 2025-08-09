"use client"

import { useEffect, useState } from "react";
import { getRequest } from "@/app/lib/api/Get";
import { wait } from "../constants/filter";


export const useCourse = (apiUrl: string) => {
  const [courses, setCourses] = useState<any[]>([]);
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
}
