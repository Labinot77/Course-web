// lib/getCourses.ts
import { getFirestore } from "firebase-admin/firestore";
import "server-only";

export const getCourses = async () => {
  const firestore = getFirestore();
  const coursesSnapshot = await firestore.collection("courses").get();
  const courses = coursesSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      instructor: data.instructor,
      instructorId: data.instructorId,
      price: data.price,
      duration: data.duration,
      imageUrl: data.imageUrl,
      category: data.category,
    };
  });

    return courses;
};
