// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuration de Firebase (copiée depuis Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyAl-agz25C0zyynOANVQs8mPzegv9T0S6A",
    authDomain: "gestion-de-chantiers-34eed.firebaseapp.com",
    projectId: "gestion-de-chantiers-34eed",
    storageBucket: "gestion-de-chantiers-34eed.appspot.com",
    messagingSenderId: "528326924813",
    appId: "1:528326924813:web:d528941abe696ef2bf9344",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);