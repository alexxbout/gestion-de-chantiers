import CategoryList from "@/components/custom/category-list";
import DefectCard from "@/components/custom/defect";
import TeamCard from "@/components/custom/team";
import WorksiteStatusBadge from "@/components/custom/worksite-status-badge";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text/index.web";
import { formatDate } from "@/components/utils";
import { findDocumentById } from "@/config/firebaseConfig";
import { CategoryEnum } from "@/types/components";
import { CollectionName, Team, Tool, User, Vehicle, Worksite } from "@/types/database";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Layout = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [worksite, setWorksite] = useState<Worksite | null>(null);

    const [tools, setTools] = useState<Tool[]>([]);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const [team, setTeam] = useState<Team | null>(null);
    const [teamLead, setTeamLead] = useState<User | null>(null);
    const [teamWorkers, setTeamWorkers] = useState<User[]>([]);

    const addDaysToDate = (date: Date, days: number) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    };

    useEffect(() => {
        const fetchWorksite = async () => {
            try {
                const fetchedWorksite = await findDocumentById(Number.parseInt(id as string), CollectionName.WORKSITE);
                setWorksite(fetchedWorksite as Worksite);
            } catch (error) {
                console.error("Error fetching worksite: ", error);
            }
        };

        if (id) {
            fetchWorksite();
        }
    }, [id]);

    useEffect(() => {
        const fetchTools = async () => {
            if (!worksite) return;

            try {
                const rawTools = await Promise.all(worksite.materials.map((toolId) => findDocumentById(toolId, CollectionName.TOOL)));

                setTools(rawTools as Tool[]);
            } catch (error) {
                console.error("Error fetching tools: ", error);
            }
        };

        if (worksite?.materials) {
            fetchTools();
        }

        const fetchVehicle = async () => {
            if (!worksite) return;

            try {
                const rawVehicles = await Promise.all(worksite.vehicles.map((vehicleId) => findDocumentById(vehicleId, CollectionName.VEHICLE)));

                setVehicles(rawVehicles as Vehicle[]);
            } catch (error) {
                console.error("Error fetching vehicles: ", error);
            }
        };

        if (worksite?.vehicles) {
            fetchVehicle();
        }

        const fetchTeam = async () => {
            if (!worksite) return;

            try {
                const fetchedTeam = await findDocumentById(worksite.team, CollectionName.TEAM);
                setTeam(fetchedTeam as Team);
            } catch (error) {
                console.error("Error fetching team: ", error);
            }
        };

        if (worksite?.team) {
            fetchTeam();
        }
    }, [worksite]);

    useEffect(() => {
        const fetchTeamLead = async () => {
            if (!team) return;

            try {
                const fetchedTeamLead = await findDocumentById(team.members.lead, CollectionName.USER);
                setTeamLead(fetchedTeamLead as User);
            } catch (error) {
                console.error("Error fetching team lead: ", error);
            }
        };

        if (team?.members.lead) {
            fetchTeamLead();
        }

        const fetchTeamWorkers = async () => {
            if (!team) return;

            try {
                const rawTeamWorkers = await Promise.all(team.members.workers.map((workerId) => findDocumentById(workerId, CollectionName.USER)));

                setTeamWorkers(rawTeamWorkers as User[]);
            } catch (error) {
                console.error("Error fetching team workers: ", error);
            }
        };

        if (team?.members.workers) {
            fetchTeamWorkers();
        }
    }, [team]);

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
                        uri: worksite.pictures.card.value,
                    }}
                />

                <View className="flex justify-center p-5 gap-y-10">
                    <View className="flex flex-col justify-center w-full gap-y-5">
                        <Text className="text-3xl font-semibold text-black">{worksite.title}</Text>
                        <WorksiteStatusBadge status={worksite.status} />
                    </View>

                    <View className="flex gap-y-12">
                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Informations</Text>
                            <View className="flex font-light gap-y-5">
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Description</Text>
                                    <Text className="text-lg font-light">{worksite.description}</Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Date de début</Text>
                                    <Text className="text-lg font-light">{formatDate(worksite.startDate)}</Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Nombre de jours</Text>
                                    <Text className="text-lg font-light">
                                        {worksite.duration} jours : {formatDate(addDaysToDate(worksite.startDate, worksite.duration))}
                                    </Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-light text-gray-400">Client</Text>
                                    <View className="flex flex-row items-center justify-between">
                                        <Text className="text-lg font-light">{worksite.client.name}</Text>
                                        <Text className="text-lg font-light">{worksite.client.phone}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Equipe</Text>
                            {team && teamLead && teamWorkers && <TeamCard name={team.name} members={{ lead: teamLead, workers: teamWorkers }} />}
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Anomalies</Text>

                            {worksite.defects.map((defect) => (
                                <DefectCard key={defect.id} id={defect.id} date={defect.date} description={defect.description} />
                            ))}
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Matériel</Text>
                            <CategoryList category={CategoryEnum.TOOLS} items={tools} />
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Véhicules</Text>
                            <CategoryList category={CategoryEnum.VEHICLES} items={vehicles} />
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Localisation</Text>
                            <Text className="text-lg font-light">{worksite.location}</Text>
                        </View>

                        <View className="flex gap-y-5">
                            <Text className="text-2xl text-black">Photos</Text>
                            <View className="flex flex-row overflow-x-auto gap-x-5 snap-x">
                                {worksite.pictures.gallery.map((picture) => (
                                    <Image
                                        key={picture.id}
                                        className="rounded-md h-[200px] w-[250px] snap-center"
                                        alt="worksite"
                                        source={{
                                            uri: picture.value,
                                        }}
                                    />
                                ))}
                            </View>
                        </View>

                        <View className="py-5" />
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
