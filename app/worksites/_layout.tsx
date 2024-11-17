import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack screenOptions={{ headerShown: true, headerBlurEffect: "regular" }}>
            <Stack.Screen name="[id]" options={{ title: "Détails"}} />
            <Stack.Screen name="edit/[id]" options={{ title: "Modification"}} />
        </Stack>
    );
};

export default Layout;
