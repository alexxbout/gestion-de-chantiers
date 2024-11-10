import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
    return (
        <Stack screenOptions={{ headerShown: true, headerBlurEffect: "regular" }}>
            <Stack.Screen name="[id]" options={{ title: "Détails"}} />
            <Stack.Screen name="edit/[id]" options={{ title: "Modification"}} />
        </Stack>
    );
};

export default Layout;
