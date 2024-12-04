import WorksiteCardSmall from "@/components/custom/worksite-card-small";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { getAllDocuments } from "@/config/firebaseConfig";
import { CollectionName, Worksite } from "@/types/database";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";

LocaleConfig.locales["fr"] = {
    monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août.", "Sept.", "Oct.", "Nov.", "Déc."],
    dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

const Tab = () => {
    const [selected, setSelected] = useState("");
    const [worksites, setWorksites] = useState<Worksite[]>([]);
    const [worksiteColors, setWorksiteColors] = useState<{ [id: number]: string }>({});
    const [markedDates, setMarkedDates] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchWorksites = async () => {
        try {
            setIsLoading(true);
            const fetchedWorksites = await getAllDocuments<Worksite[]>(CollectionName.WORKSITE);

            const colorsArray = generateDistinctColors(fetchedWorksites.flat().length);
            const colors: { [id: number]: string } = {};

            const dates: { [key: string]: { periods: { startingDay: boolean; endingDay: boolean; color: string }[] } } = {};
            fetchedWorksites.flat().forEach((worksite, index) => {
                const worksiteColor = colorsArray[index];
                colors[worksite.id] = worksiteColor;

                const startDate = new Date(worksite.startDate);
                for (let i = 0; i <= worksite.duration; i++) {
                    const currentDate = new Date(startDate);
                    currentDate.setDate(currentDate.getDate() + i);

                    const formattedDate = currentDate.toISOString().split("T")[0];

                    if (!dates[formattedDate]) {
                        dates[formattedDate] = { periods: [] };
                    }

                    dates[formattedDate].periods.push({
                        startingDay: i === 0,
                        endingDay: i === worksite.duration,
                        color: worksiteColor,
                    });
                }
            });

            setMarkedDates(dates);
            setWorksites(fetchedWorksites.flat());
            setWorksiteColors(colors);
        } catch (error) {
            console.error("Error fetching worksites: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const generateDistinctColors = (numColors: number): string[] => {
        const colors = [];
        const step = 360 / numColors;

        for (let i = 0; i < numColors; i++) {
            const hue = i * step;
            colors.push(`hsl(${hue}, 80%, 50%)`);
        }

        return colors;
    };

    useFocusEffect(
        useCallback(() => {
            fetchWorksites();
        }, [])
    );

    return (
        <ScrollView className="flex flex-col h-full p-5 pb-20 bg-white">
            {isLoading ? (
                <View className="flex flex-col gap-y-5">
                    <Skeleton className="w-full mb-5 h-80" />
                    <Skeleton className="w-2/3 h-8 mb-5" />
                    {Array.from({ length: 3 }).map((_, index) => (
                        <View key={index} className="p-4 rounded-md bg-background-100">
                            <Skeleton className="w-1/2 h-6 mb-2" />
                            <Skeleton className="w-1/3 h-5 mb-2" />
                            <Skeleton className="w-2/3 h-5 mb-2" />
                        </View>
                    ))}
                </View>
            ) : (
                <>
                    <Calendar
                        firstDay={1}
                        enableSwipeMonths={true}
                        onDayPress={(day: any) => {
                            setSelected(day.dateString);
                        }}
                        markingType="multi-period"
                        markedDates={{
                            ...markedDates,
                            [selected]: {
                                selected: true,
                                disableTouchEvent: true,
                                selectedDotColor: "orange",
                            },
                        }}
                    />

                    <View className="flex flex-col gap-y-5">
                        <Text className="pt-10 text-2xl font-medium text-black">{(worksites.length > 0 ? worksites.length : "Aucun") + " chantier" + (worksites.length > 0 ? "s" : "") + " ce jour"}</Text>

                        {worksites.map((worksite) => (
                            <WorksiteCardSmall key={worksite.id} worksite={worksite} color={worksiteColors[worksite.id]} />
                        ))}
                    </View>
                </>
            )}
        </ScrollView>
    );
};

export default Tab;