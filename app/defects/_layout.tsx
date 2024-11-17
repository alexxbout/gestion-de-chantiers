import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack screenOptions={{ headerShown: true, headerBlurEffect: "regular" }}>
            <Stack.Screen name="[id]" options={{ title: "Anomalies" }} />
            <Stack.Screen name="add/[id]" options={{ title: "Déclarer une anomalie" }} />
        </Stack>
    );
};

export default Layout;
