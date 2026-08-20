// ==========================================================================
// Creates a new Firebase Auth user (for an accepted intern) from within the
// admin panel, WITHOUT logging the admin out.
//
// Why this is needed: Firebase's client-side createUserWithEmailAndPassword
// automatically signs in as the newly created user, which would kick the
// admin out of their own session. To avoid that, we spin up a temporary,
// separate ("secondary") Firebase app instance just for this one operation,
// create the user on it, then immediately sign out and destroy that instance
// - the admin's own session (on the main app instance) is never touched.
// ==========================================================================
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firebaseConfig } from "./config";

export async function createInternAccount({ name, email, domain, tempPassword }) {
  const secondaryApp = initializeApp(firebaseConfig, `secondary-${Date.now()}`);
  const secondaryAuth = getAuth(secondaryApp);
  const secondaryDb = getFirestore(secondaryApp);

  try {
    const cred = await createUserWithEmailAndPassword(secondaryAuth, email, tempPassword);

    await setDoc(doc(secondaryDb, "users", cred.user.uid), {
      name,
      email,
      role: "intern",
      domain,
      createdAt: serverTimestamp(),
    });

    await signOut(secondaryAuth);
    return { uid: cred.user.uid };
  } finally {
    // Always clean up the temporary app instance, even if something failed.
    await deleteApp(secondaryApp);
  }
}

// Generates a simple, readable temporary password like "Rise-7f3k9a".
// The admin shares this with the candidate in the offer letter and should
// ask them to change it after their first login.
export function generateTempPassword() {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `Rise-${code}`;
}
