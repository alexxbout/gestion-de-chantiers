import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <GluestackUIProvider mode="light">
            <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="index" />
            </Stack>
        </GluestackUIProvider>
    );
}