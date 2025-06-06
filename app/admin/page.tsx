"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect } from "react";

// Reusable add function
export const addAnnouncement = async () => {
  const docRef = await addDoc(collection(db, "announcements"), {
    title:
      "This is a demo website for the purpose of showcasing, any course isn't actually real.",
    description:
      "This is a demo website for the purpose of showcasing, any course isn't actually real.",
    state: true,
  });
  console.log("Document written with ID: ", docRef.id);
};

// Main page component
const Page = () => {
  useEffect(() => {
    window.addAnnouncement = addAnnouncement;
  }, []);

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
