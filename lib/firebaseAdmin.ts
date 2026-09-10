// Server-side Firebase Admin (used by the nurture queue and other background jobs).
// Optional: returns null when the service-account env vars are not configured so
// the rest of the app degrades gracefully.

import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let adminApp: App | null = null;
let adminDb: Firestore | null = null;
let initialized = false;

export function getAdminDb(): Firestore | null {
  if (initialized) return adminDb;
  initialized = true;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.warn(
      "⚠️  Firebase Admin not configured — nurture queue disabled. Set FIREBASE_ADMIN_* env vars to enable the 3-email welcome sequence."
    );
    return null;
  }

  try {
    adminApp = getApps().length
      ? (getApps()[0] as App)
      : initializeApp({
          credential: cert({ projectId, clientEmail, privateKey }),
        });
    adminDb = getFirestore(adminApp);
    return adminDb;
  } catch (err) {
    console.error("Failed to initialize Firebase Admin:", err);
    return null;
  }
}
