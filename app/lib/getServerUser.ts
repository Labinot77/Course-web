// lib/getServerUser.ts
import { getAdminAuth, initFirebaseAdmin } from "@/db/firebaseAdmin";
import { cookies } from "next/headers";

export async function getServerUser() {
  initFirebaseAdmin();
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;

  try {
    return await getAdminAuth().verifySessionCookie(session, true);
  } catch {
    return null;            
  }
}
