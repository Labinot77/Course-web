import React, { ReactNode } from "react";
import Navigation_bar from "../components/Navigation_bar";
import Announcement_bar from "../components/Announcement_bar";
import { getServerUser } from "../lib/getServerUser";
import { getAuth } from "firebase/auth";

const layout = async ({ children }: { children: ReactNode }) => {

  return (
    <main>
      <Announcement_bar />

      <div className="max-w-8xl mx-auto py-2">
        <Navigation_bar />

        <div className="w-full overflow-hidden">{children}</div>
      </div>
    </main>   
  );
};

export default layout;
