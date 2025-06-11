import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1YnSS-p8aGIf464qyaLrNyvu3Wbd3ODc",
  authDomain: "authentication-ab.firebaseapp.com",
  projectId: "authentication-ab",
  storageBucket: "authentication-ab.firebasestorage.app",
  messagingSenderId: "181985244843",
  appId: "1:181985244843:web:4a57490a1b1f4ffcfb69ee",
  measurementId: "G-V4ETZR4GJX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
