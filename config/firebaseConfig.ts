// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (copied from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAl-agz25C0zyynOANVQs8mPzegv9T0S6A",
  authDomain: "gestion-de-chantiers-34eed.firebaseapp.com",
  projectId: "gestion-de-chantiers-34eed",
  storageBucket: "gestion-de-chantiers-34eed.appspot.com",
  messagingSenderId: "528326924813",
  appId: "1:528326924813:web:d528941abe696ef2bf9344",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth and Firestore
export const FIREBASE_AUTH = getAuth(app);
export const db = getFirestore(app);
