import { Box } from "@/components/ui/box";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import "@/global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
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
                // Remplacez par replace pour éviter d'accumuler l'historique
                router.replace("/(auth)/login");
            } else if (user && segments[0] === "(auth)") {
                router.replace("/(tabs)/worksites");
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
