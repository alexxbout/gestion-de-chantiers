import WorksiteCard from "@/components/custom/worksite-card";
import { Button, ButtonText } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllDocuments } from "@/config/firebaseConfig";
import { CollectionName, Worksite, WorksiteStatus } from "@/types/database";
import SegmentedControl, { NativeSegmentedControlIOSChangeEvent } from "@react-native-segmented-control/segmented-control";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { NativeSyntheticEvent, ScrollView, View } from "react-native";

const Tab = () => {
    const router = useRouter();
    const [worksites, setWorksites] = useState<Worksite[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
            setIsLoading(true);
            const fetchedWorksites = await getAllDocuments<Worksite[]>(CollectionName.WORKSITE);
            setWorksites(fetchedWorksites.flat());
        } catch (error) {
            console.error("Error fetching worksites: ", error);
        } finally {
            setIsLoading(false);
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

                {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                          <View key={index} className="w-full p-4 rounded-md bg-background-100">
                              <Skeleton className="mb-4 rounded-sm h-44" />
                              <Skeleton className="h-6 mb-2" />
                              <Skeleton className="w-2/3 h-4" />
                          </View>
                      ))
                    : filteredWorksites.map((worksite, index) => <WorksiteCard key={index} worksite={worksite} />)}
            </View>
        </ScrollView>
    );
};

export default Tab;