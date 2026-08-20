// ==========================================================================
// FIREBASE CONFIG
// Connected to the "rise-digital-solutions" Firebase project.
// Config keys are public (client-side safe) - security comes from Firestore
// Security Rules and Firebase Auth, not from hiding these keys.
// ==========================================================================
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics only works in a real browser (not during server-side/build
// rendering), so we guard it with isSupported() to avoid build errors.
export let analytics = null;
isSupported().then((supported) => {
  if (supported) analytics = getAnalytics(app);
});

export default app;
