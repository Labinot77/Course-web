"use client";

import { Button } from "@/components/ui/button";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect } from "react";

// Reusable add function
export const addAnnouncement = async () => {

};

// Main page component
const Page = () => {

  return (
    <div>
      {/* You can still use this button if needed */}
      {/* <Button onClick={addAnnouncement} variant="outline">Add</Button> */}
    </div>
  );
};

export default Page;

// Optional export for usage elsewhere
export const test = () => {
  "use client";
  addAnnouncement();
  return null;
};
