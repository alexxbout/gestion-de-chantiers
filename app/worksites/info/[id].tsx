import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { AlertCircleIcon, CheckIcon, Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text/index.web";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Info = () => {
    const router = useRouter();
    return (
        <>
            <ScrollView>
                <Image className="w-full h-80" alt="worksite" source={{ uri: "/assets/images/worksite1.jpg" }} />

                <View className="flex justify-center p-5 gap-y-10">
                    <View className="flex flex-row items-center justify-between w-full">
                        <Text className="text-3xl font-semibold text-black">Test</Text>

                        <Badge className="" size="lg" variant="solid" action="success">
                            <BadgeText>Verified</BadgeText>
                            <BadgeIcon as={CheckIcon} className="ml-2" />
                        </Badge>
                    </View>

                    <View className="flex gap-y-20">
                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Informations</Text>

                            <View className="flex font-light gap-y-5">
                                <View>
                                    <Text className="text-lg font-light text-gray-500">Description</Text>
                                    <Text className="text-lg font-light">Une description du chantier</Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-light text-gray-500">Date de début</Text>
                                    <Text className="text-lg font-light">03/06/2024</Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-light text-gray-500">Client</Text>
                                    <Text className="text-lg font-light">Alexandre Boutinaud</Text>
                                </View>
                            </View>
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Anomalies</Text>

                            <View className="flex font-light gap-y-5">
                                <View className="flex flex-row items-center w-full p-3 bg-red-100 rounded-lg gap-x-2">
                                    <Icon as={AlertCircleIcon} size="lg" className="text-red-800" />
                                    <Text className="text-base text-red-800">Une description du chantier</Text>
                                </View>
                            </View>
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Localisation</Text>
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Photos</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Button onPress={() => router.navigate("/worksites")} className="fixed z-10 top-5 left-5" size="md" variant="solid" action="primary">
                <ButtonText>Retour</ButtonText>
            </Button>
        </>
    );
};

export default Info;
