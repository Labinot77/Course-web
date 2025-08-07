// "use client"

// import { useEffect, useState } from "react";
// import { getRequest } from "@/app/lib/api/Get";

// const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// export const useCourse = (apiUrl: string) => {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getRequest<any[]>(apiUrl)
//       .then((data) => setCourses(data))
//       .finally(() => setLoading(false));
//   }, [apiUrl]);

//   return { courses, loading };
// }

"use client"

import { useEffect, useState } from "react";
import { getRequest } from "@/app/lib/api/Get";


export const useCourse = (apiUrl: string) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequest<any[]>(apiUrl);
        setCourses(data);
        // await wait(100); // ⏳ Wait 1 second before stopping loading
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { courses, loading };
}
