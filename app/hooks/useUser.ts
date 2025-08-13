"use client"

import { useSession } from "next-auth/react";

// export const UseUser = () => {
//   const { data: session } = useSession();
//   const user = session?.user;

//   return { user };
// }


export const UseUser = () => {
  const { data: session, status } = useSession();

  return {
    user: session?.user || null,
    status,
  };
};
