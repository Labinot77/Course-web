import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { getUserFromDB } from "@/app/lib/User";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromDB();

    if (!user.email) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // fetch here
    const userWithCourses = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        createdCourses: {
          include: {
            createdBy: true,
            savedBy: true,
          },
        },
      },
    });

    const courses = userWithCourses?.createdCourses || [];

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Failed to save course:", error);
    return NextResponse.json(
      { error: "Failed to save course" },
      { status: 500 }
    );
  }
}
