import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        savedCourses: {
          connect: { id: courseId },
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save course:", error);
    return NextResponse.json({ error: "Failed to save course" }, { status: 500 });
  }
}