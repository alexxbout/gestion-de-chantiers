import WorksiteCard from "@/components/custom/worksite-card";
import { Button, ButtonText } from "@/components/ui/button";
import { getAllDocuments } from "@/config/firebaseConfig";
import { CollectionName, Worksite, WorksiteStatus } from "@/types/database";
import SegmentedControl, { NativeSegmentedControlIOSChangeEvent } from "@react-native-segmented-control/segmented-control";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { NativeSyntheticEvent, ScrollView, View } from "react-native";

const Tab = () => {
    const router = useRouter();
    const [worksites, setWorksites] = useState<Worksite[]>([]);

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

    const fetchWorksites = async () => {
        try {
            const fetchedWorksites = await getAllDocuments<Worksite[]>(CollectionName.WORKSITE);
            setWorksites(fetchedWorksites.flat());
            console.log("Worksites fetched: ", fetchedWorksites);
        } catch (error) {
            console.error("Error fetching worksites: ", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchWorksites();
        }, [])
    );

    return (
        <ScrollView className="h-full p-6 bg-white">
            <View className="flex flex-col pb-10 bg-white gap-y-8">
                <SegmentedControl values={segmentedValues} selectedIndex={selectedIndex} onChange={handleIndexChange} appearance="light" />

                <Button onPress={() => router.push({ pathname: "../worksites/add" })} className="w-full" size="md">
                    <ButtonText>Démarrer un nouveau chantier</ButtonText>
                </Button>

                {filteredWorksites.map((worksite, index) => (
                    <WorksiteCard key={index} worksite={worksite} />
                ))}
            </View>
        </ScrollView>
    );
};

export default Tab;
