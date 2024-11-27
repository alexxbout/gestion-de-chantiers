// src/firebaseConfig.ts
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

export const uploadDataToFirestore = async (file: any, collectionName: string): Promise<void> => {
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

export const findDocumentById = async (targetId: number) => {
    const q = query(collection(db, "your_collection_name"), where("id", "==", targetId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        console.log(`Document trouvé : ${doc.id} =>`, doc.data());
    });

    if (querySnapshot.empty) {
        console.log("Aucun document trouvé avec cet id.");
    }
};

export const clearData = async (collectionName: string): Promise<void> => {
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