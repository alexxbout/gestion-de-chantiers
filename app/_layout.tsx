import { Box } from "@/components/ui/box";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import "@/global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

const Layout = () => {
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            setUser(currentUser);
            setInitializing(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!initializing) {
            if (!user && segments[0] !== "(auth)") {
                // Redirection vers login si l'utilisateur n'est pas connecté et qu'il n'est pas sur la route de login
                router.push("/(auth)/login");
            } else if (user && segments[0] === "(auth)") {
                // Redirection vers worksites si l'utilisateur est connecté et qu'il est sur la route de login
                router.push("/(tabs)/worksites");
            }
        }
    }, [user, initializing, segments]);

    if (initializing) {
        return (
            <Box className="flex items-center justify-center w-screen h-screen">
                <ActivityIndicator size="large" />
            </Box>
        );
    }

    return (
        <GluestackUIProvider>
            <Stack screenOptions={{ headerShown: false }} />
        </GluestackUIProvider>
    );
};

export default Layout;