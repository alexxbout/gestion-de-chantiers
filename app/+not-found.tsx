import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { View } from "react-native";

const Layout = () => {
    const router = useRouter();

    return (
        <View className="flex items-center justify-center w-screen h-screen">
            <Text className="font-semibold">Oups ! On dirait que cette page n'exsite pas...</Text>
            <Button onPress={() => router.navigate("/(tabs)/worksites")} variant="link">
                <ButtonText className="text-blue-600">Retourner à l'accueil</ButtonText>
            </Button>
        </View>
    );
};

export default Layout;
