import WorksiteCard from "@/components/custom/worksite-card";
import { Button, ButtonText } from "@/components/ui/button";
import { getAllDocuments } from "@/config/firebaseConfig";
import { RessourceType, Worksite, WorksiteStatus } from "@/types/database";
import SegmentedControl, { NativeSegmentedControlIOSChangeEvent } from "@react-native-segmented-control/segmented-control";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { NativeSyntheticEvent, ScrollView, View } from "react-native";

const Tab = () => {
    const router = useRouter();
    const [worksites, setWorksites] = useState<Worksite[]>([]);

    // TODO: Load worksites from the database
    // const worksites: WorksiteProp[] = [
    //     {
    //         id: 1,
    //         title: "Les Terrasses",
    //         description: "Projet résidentiel avec des espaces en terrasses ou en hauteur",
    //         start_date: "2022-01-01",
    //         status: WorksiteStatus.COMPLETED,
    //     },
    //     {
    //         id: 2,
    //         title: "Cœur de Ville",
    //         description: "Revitalisation urbaine en centre-ville",
    //         start_date: "2022-01-01",
    //         status: WorksiteStatus.IN_PROGRESS,
    //     },
    //     {
    //         id: 3,
    //         title: "Chantier 3",
    //         description: "Description du chantier 3",
    //         start_date: "2022-01-01",
    //         status: WorksiteStatus.INTERRUPTED,
    //     },
    //     {
    //         id: 3,
    //         title: "Chantier 4",
    //         description: "Description du chantier 3",
    //         start_date: "2022-01-01",
    //         status: WorksiteStatus.INTERRUPTED,
    //     },
    // ];

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [segmentedValues, setSegmentedValues] = useState(["Tous", "Non Réal.", "En cours", "Terminés", "Interr."]);

    const handleIndexChange = (event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
    };

    const filteredWorksites = worksites.filter((worksite) => {
        if (selectedIndex === 0) return true;
        if (selectedIndex === 1) return worksite.status === WorksiteStatus.NOT_STARTED;
        if (selectedIndex === 2) return worksite.status === WorksiteStatus.IN_PROGRESS;
        if (selectedIndex === 3) return worksite.status === WorksiteStatus.COMPLETED;
        if (selectedIndex === 4) return worksite.status === WorksiteStatus.INTERRUPTED;
        return false;
    });

    useEffect(() => {
        const fetchWorksites = async () => {
            try {
                const fetchedWorksites = await getAllDocuments<Worksite[]>(RessourceType.WORKSITE);
                setWorksites(fetchedWorksites.flat());

                console.log("Worksites fetched: ", fetchedWorksites);
            } catch (error) {
                console.error("Error fetching worksites: ", error);
            }
        };

        fetchWorksites();
    }, []);

    return (
        <ScrollView className="h-full p-6 bg-white">
            <View className="flex flex-col pb-10 bg-white gap-y-8">
                <SegmentedControl values={segmentedValues} selectedIndex={selectedIndex} onChange={handleIndexChange} appearance="light" />

                <Button onPress={() => router.push({ pathname: "../worksites/add" })} className="w-full" size="md">
                    <ButtonText>Démarrer un nouveau chantier</ButtonText>
                </Button>

                {filteredWorksites.map((worksite, index) => (
                    <WorksiteCard key={index} id={worksite.id} title={worksite.title} description={worksite.description} startDate={worksite.startDate} status={worksite.status} pictures={worksite.pictures} />
                ))}
            </View>
        </ScrollView>
    );
};

export default Tab;
