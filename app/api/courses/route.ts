import { getAdminDb, initFirebaseAdmin,} from "@/db/firebaseAdmin";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    initFirebaseAdmin();
    const db = getAdminDb();

    const body = await req.json();
    const courseSchema = z.object({
      title: z.string(),
      description: z.string(),
      imageUrl: z.string().url(),
      isFree: z.boolean(),
      category: z.string(),
      price: z.number(),
      instructorId: z.string(),
      instructor: z.string(),
    });

    const parsed = courseSchema.parse(body);

    const docRef = await db.collection("courses").add({
      ...parsed,
      createdAt: new Date(),
    });

    return NextResponse.json({ courseId: docRef.id });
  } catch (error: any) {
    console.error("🔥 API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
