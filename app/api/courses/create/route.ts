import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const body = await req.json();
    const { title, description, imageUrl, isFree, category, price } = body;

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        imageUrl,
        isFree,
        category,
        price,
        createdById: user.id,
      },
    });

    return NextResponse.json({ courseId: course.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
