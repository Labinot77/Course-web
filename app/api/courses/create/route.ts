import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      imageUrl,
      isFree,
      category,
      price,
      // instructor,
      // instructorId,
    } = body;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        imageUrl,
        isFree,
        category,
        price,
        // instructor,
        // instructorId,
      },
    });

    return NextResponse.json({ courseId: course.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create course:", error);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}