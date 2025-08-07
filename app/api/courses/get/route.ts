import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function GET(req: NextRequest) {
  try {
    const courses = await prisma.course.findMany();
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}