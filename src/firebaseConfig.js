import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "hackbro2025.firebaseapp.com",
  databaseURL:
    "https://hackbro2025-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hackbro2025",
  storageBucket: "hackbro2025.firebasestorage.app",
  messagingSenderId: "635351198742",
  appId: "1:635351198742:web:2f3d822cf4ed6ef4e19937",
  measurementId: "G-Z8MDD995L9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
