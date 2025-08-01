import React, { ReactNode } from "react";
import Navigation_bar from "../components/Navigation_bar";
import Announcement_bar from "../components/Announcement_bar";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Announcement_bar />

      <div className="mx-auto py-2 max-w-8xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        <Navigation_bar/>
        {children}
      </div>
    </main>
  );
};

export default layout;
