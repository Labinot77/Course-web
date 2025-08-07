"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useCollections } from "./useCollections";
import { UseUser } from "./useUser";

export const useRoutes = () => {
  const pathname = usePathname();
  const { collectionId } = useCollections();
  const { user } = UseUser();

  // Giving me an error beause I need to define it
  const isAdmin = user?.isAdmin === true;

  const routes = useMemo(() => {
    const baseRoutes = [
      {
        label: "Explore",
        href: "/courses",
        active:
          pathname === "/courses" ||
          pathname === `/courses/${collectionId}` ||
          !!collectionId,
        admin: false,
      },
      {
        label: "Library",
        href: "/courses/library",
        active: pathname === "/courses/library",
        admin: false,
      },
      {
        label: "My Courses",
        href: "/courses/my-courses",
        active: pathname === "/courses/my-courses",
        admin: false,
      },
    ];

    if (isAdmin) {
      baseRoutes.push({
        label: "Admin",
        href: "/admin",
        active: pathname === "/admin",
        admin: true,
      });
    }

    return baseRoutes;
  }, [pathname, collectionId, isAdmin]);

  return routes;
};
