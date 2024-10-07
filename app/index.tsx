// index.tsx
import { Chantier } from "@/types/database";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../config/firebaseConfig";

export default function Index() {
    // États pour les données utilisateur et chantier
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [chantierTitle, setChantierTitle] = useState("");
    const [chantierDescription, setChantierDescription] = useState("");
    const [chantiers, setChantiers] = useState<Chantier[]>([]); // État pour stocker les chantiers

    // Fonction pour ajouter un utilisateur et un chantier dans Firestore
    const handleAddDocument = async () => {
        if (userName === "" || userEmail === "" || chantierTitle === "" || chantierDescription === "") {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        try {
            // Ajout d'un utilisateur dans la collection `users`
            const userDoc = await addDoc(collection(db, "users"), {
                name: userName,
                email: userEmail,
                role: "chef_de_chantier", // On peut choisir entre chef de chantier et responsable
                uid: Math.random().toString(36).substring(7), // Identifiant généré temporairement
            });

            // Ajout d'un chantier dans la collection `chantiers`
            const chantierDoc = await addDoc(collection(db, "chantiers"), {
                title: chantierTitle,
                description: chantierDescription,
                status: "non_realise", // Statut initial
                location: "Lieu inconnu", // Valeur temporaire pour l'exemple
                team: [userDoc.id], // Assigner cet utilisateur au chantier
            });

            Alert.alert("Succès", `Documents ajoutés avec l'ID utilisateur: ${userDoc.id}, ID chantier: ${chantierDoc.id}`);

            // Réinitialiser les champs
            setUserName("");
            setUserEmail("");
            setChantierTitle("");
            setChantierDescription("");
            // Mettre à jour la liste des chantiers
            fetchChantiers();
        } catch (e) {
            Alert.alert("Erreur", "Impossible d'ajouter les documents.");
            console.error("Error adding documents: ", e);
        }
    };

    // Fonction pour récupérer les chantiers depuis Firestore
    const fetchChantiers = async () => {
        try {
            const chantiersSnapshot = await getDocs(collection(db, "chantiers"));
            const chantiersList: Chantier[] = chantiersSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Chantier, "id">), // Exclure 'id' de l'interface
            }));

            setChantiers(chantiersList);
        } catch (error) {
            console.error("Error fetching chantiers: ", error);
            Alert.alert("Erreur", "Impossible de récupérer les chantiers.");
        }
    };

    // Récupérer les chantiers lorsque le composant est monté
    useEffect(() => {
        fetchChantiers();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ajouter un utilisateur et un chantier à Firestore</Text>

            {/* Formulaire pour l'utilisateur */}
            <TextInput style={styles.input} placeholder="Nom de l'utilisateur" value={userName} onChangeText={(text) => setUserName(text)} />
            <TextInput style={styles.input} placeholder="Email de l'utilisateur" value={userEmail} onChangeText={(text) => setUserEmail(text)} />

            {/* Formulaire pour le chantier */}
            <TextInput style={styles.input} placeholder="Titre du chantier" value={chantierTitle} onChangeText={(text) => setChantierTitle(text)} />
            <TextInput style={styles.input} placeholder="Description du chantier" value={chantierDescription} onChangeText={(text) => setChantierDescription(text)} />

            <Button title="Ajouter utilisateur et chantier" onPress={handleAddDocument} />

            {/* Affichage des chantiers */}
            <FlatList
                data={chantiers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.chantierItem}>
                        <Text style={styles.chantierTitle}>{item.title}</Text>
                        <Text>{item.description}</Text>
                    </View>
                )}
                style={styles.chantiersList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        marginBottom: 15,
        width: "100%",
        paddingHorizontal: 10,
    },
    chantiersList: {
        marginTop: 20,
        width: "100%",
    },
    chantierItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    chantierTitle: {
        fontWeight: "bold",
    },
});
