// src/firebaseConfig.ts
import { CollectionName } from "@/types/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAl-agz25C0zyynOANVQs8mPzegv9T0S6A",
    authDomain: "gestion-de-chantiers-34eed.firebaseapp.com",
    projectId: "gestion-de-chantiers-34eed",
    storageBucket: "gestion-de-chantiers-34eed.firebasestorage.app",
    messagingSenderId: "528326924813",
    appId: "1:528326924813:web:d528941abe696ef2bf9344",
};

const app = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(app);
export const db = getFirestore(app);

export const uploadDataToFirestore = async (file: any, collectionName: CollectionName): Promise<void> => {
    const collectionRef = collection(db, collectionName);

    for (const data of file) {
        try {
            await addDoc(collectionRef, data);
        } catch (error) {
            console.error("Error adding document: ", error);
            break;
        }
    }
};

export const findDocumentById = async (id: number, collectionName: CollectionName) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log("No matching documents.");
        return null;
    }

    const document = querySnapshot.docs[0].data();

    console.log("Document data:", document);

    return document;
};

export const getAllDocuments = async <T>(collectionName: CollectionName): Promise<T[]> => {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const documents: any[] = [];

    querySnapshot.forEach((doc) => {
        documents.push(doc.data());
    });

    return documents;
};

export const clearData = async (collectionName: CollectionName): Promise<void> => {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach(async (doc) => {
        try {
            await deleteDoc(doc.ref);
            console.log(`Document supprimé : ${doc.id}`);
        } catch (error) {
            console.error("Erreur lors de la suppression du document : ", error);
        }
    });

    console.log("Effacement des données terminé.");
};

export const updateDocument = async (id: number, collectionName: CollectionName, data: any): Promise<void> => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
    }

    querySnapshot.forEach(async (doc) => {
        try {
            await addDoc(collectionRef, data);
            await deleteDoc(doc.ref);
            console.log(`Document updated with id: ${id}`);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    });
};