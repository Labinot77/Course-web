// This is an API route that sets a user as admin
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initFirebaseAdmin } from "@/db/firebaseAdmin";

export async function POST(req: Request) {
  try {
    // Only allow authorized requests (e.g. check if the requester is admin)
    const body = await req.json();
    const { uid } = body;

    if (!uid) {
      return NextResponse.json({ error: "Missing UID" }, { status: 400 });
    }

    initFirebaseAdmin(); // ensure Firebase Admin is initialized
    const auth = getAuth();

    await auth.setCustomUserClaims(uid, { admin: true });

    return NextResponse.json({ message: `Admin claim set for ${uid}` });
  } catch (error) {
    console.error("Error setting admin claim:", error);
    return NextResponse.json({ error: "Failed to set admin claim" }, { status: 500 });
  }
}
