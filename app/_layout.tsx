import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import "@/global.css";
import { Stack } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "../gesture-handler";

export default function RootLayout() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        console.log("Checking auth state...");
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                console.log("User is logged in");
                setUser(user);
            } else {
                console.log("No user logged in");
                setUser(null);
            }
            setInitializing(false);
        });

        return () => unsubscribe();
    }, []);

    if (initializing) {
        return (
            <View className="flex items-center justify-center h-full">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <GluestackUIProvider mode="light">
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="app" />
            </Stack>
        </GluestackUIProvider>
    );
}
