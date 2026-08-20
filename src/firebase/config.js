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
  apiKey: "AIzaSyBaAXcaKtHte73hlBZ0mDEpF3VCYs4-blQ",
  authDomain: "rise-digital-solutions.firebaseapp.com",
  projectId: "rise-digital-solutions",
  storageBucket: "rise-digital-solutions.firebasestorage.app",
  messagingSenderId: "151399318718",
  appId: "1:151399318718:web:11cffeaf91206b9f888aef",
  measurementId: "G-CWT3JBD6EE",
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
