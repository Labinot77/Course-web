// app/api/session/route.ts
import { getAdminAuth, initFirebaseAdmin } from "@/db/firebaseAdmin";
import { NextResponse } from "next/server";

initFirebaseAdmin();                         // ensure app is ready

export async function POST(req: Request) {
  const { token } = await req.json();
  const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 days

  try {
    const sessionCookie = await getAdminAuth().createSessionCookie(token, { expiresIn });
    const res = NextResponse.json({ ok: true });

    res.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: expiresIn / 1000,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
