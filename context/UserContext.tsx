import { FIREBASE_AUTH } from "@/firebase/api";
import { User } from "@/types/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = await AsyncStorage.getItem("user"); // Utilisez localStorage pour le web
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await signOut(FIREBASE_AUTH); // Déconnexion Firebase
            await AsyncStorage.removeItem("user"); // Supprimer les données utilisateur du stockage
            setUser(null);
            console.log("Utilisateur déconnecté avec succès.");
        } catch (error) {
            console.error("Erreur lors de la déconnexion : ", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook personnalisé pour accéder au contexte utilisateur
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
