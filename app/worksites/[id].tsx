import WorksiteStatusBadge from "@/components/custom/worksite-status-badge";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AlertCircleIcon, CheckIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text/index.web";
import { findDocumentById } from "@/config/firebaseConfig";
import { CollectionName, Worksite } from "@/types/database";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Layout = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [worksite, setWorksite] = useState<Worksite | null>(null);

    // const [users, setUsers] = useState<User[]>([
    //     { uid: "0", role: "Equipier", name: "Jean Dupont", email: "", assignedChantiers: [0, 1, 2] },
    //     { uid: "1", role: "Equipier", name: "Marie Dupond", email: "", assignedChantiers: [0, 1, 2] },
    //     { uid: "2", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
    //     { uid: "4", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
    //     { uid: "5", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
    //     { uid: "6", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
    // ]);

    // const [lead, setLead] = useState<User>({
    //     uid: "3",
    //     role: "Chef de chantier",
    //     name: "Alexandre Boutinaud",
    //     email: "",
    //     assignedChantiers: [0, 1, 2],
    //     photoURL: "",
    // });

    useEffect(() => {
        const fetchWorksite = async () => {
            try {
                const fetchedWorksite = await findDocumentById(Number.parseInt(id as string), CollectionName.WORKSITE);
                setWorksite(fetchedWorksite as Worksite);

                // Assuming the lead and users are part of the worksite data
                // if (fetchedWorksite) {
                //     setLead(fetchedWorksite.lead);
                //     setUsers(fetchedWorksite.users);
                // }
            } catch (error) {
                console.error("Error fetching worksite: ", error);
            }
        };

        fetchWorksite();
    }, [id]);

    // useEffect(() => {
    //     axios
    //         .get(`https://tinyfac.es/api/data?limit=${users.length + 1}&quality=0`)
    //         .then((response) => {
    //             const updatedLead = {
    //                 ...lead,
    //                 photoURL: response.data[0]?.url || "",
    //             };

    //             const updatedUsers = users.map((user, index) => ({
    //                 ...user,
    //                 photoURL: response.data[index + 1]?.url || "",
    //             }));

    //             setUsers(updatedUsers);
    //             setLead(updatedLead);
    //         })
    //         .catch((error) => {
    //             console.error("Failed to fetch user photos:", error);
    //         });
    // }, []);

    if (!worksite) {
        return (
            <View className="flex items-center justify-center h-full">
                <Text className="text-2xl text-black">Chargement...</Text>
            </View>
        );
    }

    return (
        <>
            <ScrollView className="bg-white">
                <Image
                    className="w-full h-80"
                    alt="worksite"
                    source={{
                        uri: worksite.pictures.card.url,
                    }}
                />

                <View className="flex justify-center p-5 gap-y-10">
                    <View className="flex flex-col justify-center w-full gap-y-5">
                        <Text className="text-3xl font-semibold text-black">{worksite.title}</Text>
                        <WorksiteStatusBadge status={worksite.status} />
                    </View>

                    <View className="flex gap-y-16">
                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Informations</Text>
                            <View className="flex font-light gap-y-5">
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Description</Text>
                                    <Text className="text-lg font-light">{worksite.description}</Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Date de début</Text>
                                    <Text className="text-lg font-light">{worksite.startDate.toString()}</Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Client</Text>
                                    <Text className="text-lg font-light">{worksite.client.name}</Text>
                                </View>
                            </View>
                        </View>

                        {/* <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Equipe</Text>
                            <Team team={"Une team"} users={users} lead={lead} />
                        </View> */}

                        {/* <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Anomalies</Text>
                            <DefectCard
                                id={1}
                                date="2023-04-24"
                                description="Une anomalie"
                                reportedBy="Alexandre Boutinaud"
                            />
                        </View> */}

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Localisation</Text>
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Photos</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <BlurView className="shadow-[0px_-15px_60px_5px_rgba(0,0,0,0.1)] absolute bottom-0 flex flex-row items-center justify-between w-screen p-4 h-max gap-x-4" intensity={25} tint="light">
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
