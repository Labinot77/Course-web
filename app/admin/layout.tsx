import React, { ReactNode } from "react";
import Navigation_bar from "../components/Navigation_bar";
import Announcement_bar from "../components/Announcement_bar";
import { getServerUser } from "../lib/getServerUser";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Announcement_bar />

      <div className="max-w-8xl mx-auto py-2">
        <Navigation_bar/>
        {children}
      </div>
    </main>
  );
};

export default layout;
