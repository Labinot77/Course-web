// pages/api/save-course.ts
import { getAdminDb, initFirebaseAdmin } from "@/db/firebaseAdmin";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  initFirebaseAdmin();
  const db = getAdminDb();

  const { uid, courseId, courseData } = req.body;

  try {
    await db
      .collection("users")
      .doc(uid)
      .collection("savedCourses")
      .doc(courseId)
      .set(courseData);

    return res.status(200).json({ message: "Course saved successfully" });
  } catch (error) {
    console.error("Failed to save course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
