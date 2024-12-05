import { CollectionName } from "@/types/database";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(app);
export const db = getFirestore(app);

/**
 * Crée un compte utilisateur avec email et mot de passe.
 * @param email - L'adresse email de l'utilisateur.
 * @param password - Le mot de passe de l'utilisateur.
 * @returns L'utilisateur créé.
 */
export const createUserAccount = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        return userCredential.user;
    } catch (error) {
        console.log("Erreur lors de la création de l'utilisateur : ", error);
    }
};

/**
 * Envoie des données à Firestore.
 * @param file - Les données à envoyer.
 * @param collectionName - Le nom de la collection Firestore.
 */
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

/**
 * Recherche un document par champ.
 * @param field - Le champ à rechercher.
 * @param value - La valeur du champ.
 * @param collectionName - Le nom de la collection Firestore.
 * @returns Le document trouvé ou null.
 */
export const findDocumentByField = async <T>(field: string, value: any, collectionName: CollectionName): Promise<T | null> => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(field, "==", value));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log("No matching documents.");
        return null;
    }

    let document: any = null;

    querySnapshot.forEach((doc) => {
        document = doc.data();
    });

    return document;
};

/**
 * Recherche un document par identifiant.
 * @param id - L'identifiant du document.
 * @param collectionName - Le nom de la collection Firestore.
 * @returns Le document trouvé ou null.
 */
export const findDocumentById = async <T>(id: number, collectionName: CollectionName): Promise<T | null> => {
    return findDocumentByField("id", id, collectionName);
};

/**
 * Récupère tous les documents d'une collection.
 * @param collectionName - Le nom de la collection Firestore.
 * @returns Les documents trouvés.
 */
export const getAllDocuments = async <T>(collectionName: CollectionName): Promise<T[]> => {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    const documents: any[] = [];

    querySnapshot.forEach((doc) => {
        documents.push(doc.data());
    });

    return documents;
};

/**
 * Efface toutes les données d'une collection.
 * @param collectionName - Le nom de la collection Firestore.
 */
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

/**
 * Met à jour un document.
 * @param id - L'identifiant du document.
 * @param collectionName - Le nom de la collection Firestore.
 * @param data - Les données à mettre à jour.
 */
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