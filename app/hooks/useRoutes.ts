'use client'

import { usePathname } from "next/navigation"
import { useMemo } from "react";
import { useCollections } from "./useCourses";
import { getUser } from "./getUser";
import { getAuth } from "firebase/auth";



export const useRoutes1 = () => {
  const pathname = usePathname();
  const { collectionId } = useCollections();
  const routes = useMemo(() => [
    {
      label: "Explore",
      href: '/courses',
      active: pathname === '/courses'  || pathname === `/courses/${collectionId}` || !!collectionId,
    },
    {
      label: "Library",
      href: '/courses/library',
      active: pathname === '/courses/library',
    },
    {
      label: "My Courses",
      href: '/courses/my-courses',
      active: pathname === '/courses/my-courses',
    },
  ], [pathname, collectionId]);

  return routes;
};
