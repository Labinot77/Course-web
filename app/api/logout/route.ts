import { NextResponse } from "next/server";

export async function POST() {
  // Clear the session cookie (adjust the name to match yours)
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set({
    name: "session", // or your session cookie name
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0), // expire immediately
  });

  return response;
}
