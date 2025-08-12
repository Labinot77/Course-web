import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: params.collectionId,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true, 
          },
        },
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}
