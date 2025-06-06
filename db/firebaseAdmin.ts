/**  lib/firebaseAdmin.ts  */
import "server-only";          // ✅ make sure code never ships to the browser
import admin from "firebase-admin";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n"); // unescape new-lines in the env var
}

/** Initialise once per server process */
export function initFirebaseAdmin() {
  if (admin.apps.length) return admin.app(); // already initialised

  const params: FirebaseAdminAppParams = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY!),
  };

  const credential = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey: params.privateKey,
  });

  return admin.initializeApp({ credential });
}

/** Convenience helpers */
export function getAdminAuth() {
  return admin.auth();               // after initFirebaseAdmin()
}

export function getAdminDb() {
  return admin.firestore();          // after initFirebaseAdmin()
}
