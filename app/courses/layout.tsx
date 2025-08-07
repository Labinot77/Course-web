import React, { ReactNode } from "react";
import Navigation_bar from "../components/Navigation_bar";
import Announcement_bar from "../components/Announcement_bar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth?reason=unauthenticated");
  }

  return (
    <main>
      <Announcement_bar />

      <div className="mx-auto py-2 max-w-8xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        <Navigation_bar />

        <div className="w-full overflow-hidden">{children}</div>
      </div>
    </main>
  );
};

export default layout;
