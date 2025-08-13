import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: await params.collectionId,
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
        episodes: {
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,  
            updatedAt: true,
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
