import { Box } from "@/components/ui/box";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import { Stack } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

const AuthLayout = () => {
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            setUser(currentUser);
            setInitializing(false);
        });
        return () => unsubscribe();
    }, []);

    if (initializing) {
        return (
            <Box className="flex items-center justify-center w-screen h-screen">
                <ActivityIndicator size="large" />
            </Box>
        );
    }

    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
    );
}

export default AuthLayout;