import DefectCard from "@/components/custom/defect";
import Team from "@/components/custom/team";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AlertCircleIcon, CheckIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text/index.web";
import { User } from "@/types/database";
import axios from "axios";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Layout = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [users, setUsers] = useState<User[]>([
        { uid: "0", role: "Equipier", name: "Jean Dupont", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "1", role: "Equipier", name: "Marie Dupond", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "2", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "4", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "5", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "6", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
    ]);
    
    const [lead, setLead] = useState<User>({
        uid: "3",
        role: "Chef de chantier",
        name: "Alexandre Boutinaud",
        email: "",
        assignedChantiers: [0, 1, 2],
        photoURL: "",
    });

    useEffect(() => {
        axios
            .get(`https://tinyfac.es/api/data?limit=${users.length + 1}&quality=0`)
            .then((response) => {
                const updatedLead = {
                    ...lead,
                    photoURL: response.data[0]?.url || "",
                };
    
                const updatedUsers = users.map((user, index) => ({
                    ...user,
                    photoURL: response.data[index + 1]?.url || "",
                }));
    
                setUsers(updatedUsers);
                setLead(updatedLead);
            })
            .catch((error) => {
                console.error("Failed to fetch user photos:", error);
            });
    }, []);

    return (
        <>
            <ScrollView className="bg-white">
                <Image
                    className="w-full h-80"
                    alt="worksite"
                    source={{
                        uri: "https://images.unsplash.com/photo-1565599573128-ae3ef5c9f478?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    }}
                />

                <View className="flex justify-center p-5 gap-y-10">
                    <View className="flex flex-row items-center justify-between w-full">
                        <Text className="text-3xl font-semibold text-black">Test</Text>
                        <Badge size="lg" variant="solid" action="success">
                            <BadgeText>Verified</BadgeText>
                            <BadgeIcon as={CheckIcon} className="ml-2" />
                        </Badge>
                    </View>

                    <View className="flex gap-y-16">
                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Informations</Text>
                            <View className="flex font-light gap-y-5">
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Description</Text>
                                    <Text className="text-lg font-light">Une description du chantier</Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Date de début</Text>
                                    <Text className="text-lg font-light">03/06/2024</Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Client</Text>
                                    <Text className="text-lg font-light">Alexandre Boutinaud</Text>
                                </View>
                            </View>
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Equipe</Text>
                            <Team team={"Une team"} users={users} lead={lead} />
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Anomalies</Text>
                            <DefectCard
                                id={1}
                                date="2023-04-24"
                                description="Une anomalie"
                                reportedBy="Alexandre Boutinaud"
                            />
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

            <BlurView
                className="shadow-[0px_-15px_60px_5px_rgba(0,0,0,0.1)] absolute bottom-0 flex flex-row items-center justify-between w-screen p-4 h-max gap-x-4"
                intensity={25}
                tint="light"
            >
                <Button onPress={() => router.navigate(`/worksites/edit/${id}`)} className="flex-1 text-white" variant="solid" size="lg">
                    <ButtonText>Editer les informations</ButtonText>
                </Button>
                <Button onPress={() => router.navigate(`/defects/${id}`)} variant="solid" action="negative" className="w-max" size="lg">
                    <ButtonIcon as={AlertCircleIcon} size="xl" />
                </Button>
            </BlurView>
        </>
    );
};

export default Layout;