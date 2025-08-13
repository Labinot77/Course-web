// app/api/episodes/create/route.ts
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { courseId } = await req.json();

    if (!courseId) {
      return NextResponse.json({ error: "courseId is required" }, { status: 400 });
    }

    // Create random title and description
    const randomTitle = `Episode ${Math.floor(Math.random() * 1000)}`;
    const randomDescription = `This is a random description for ${randomTitle}.`;

    const episode = await prisma.episode.create({
      data: {
        title: randomTitle,
        description: randomDescription,
        videoUrl: "https://example.com/video.mp4", // placeholder
        courseId,
      },
    });

    return NextResponse.json({ episode }, { status: 201 });
  } catch (error) {
    console.error("Error creating episode:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
