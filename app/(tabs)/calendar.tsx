import WorksiteCardSmall from "@/components/custom/worksite-card-small";
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

    const fetchWorksites = async () => {
        try {
            const fetchedWorksites = await getAllDocuments<Worksite[]>(CollectionName.WORKSITE);

            // Générer des couleurs distinctes
            const colorsArray = generateDistinctColors(fetchedWorksites.flat().length);
            const colors: { [id: number]: string } = {};

            // Générer les périodes marquées
            const dates: { [key: string]: { periods: { startingDay: boolean; endingDay: boolean; color: string }[] } } = {};
            fetchedWorksites.flat().forEach((worksite, index) => {
                const worksiteColor = colorsArray[index];
                colors[worksite.id] = worksiteColor;

                // Calcul des périodes
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
        }
    };

    const generateDistinctColors = (numColors: number): string[] => {
        const colors = [];
        const step = 360 / numColors; // Division équidistante sur le cercle chromatique

        for (let i = 0; i < numColors; i++) {
            const hue = i * step; // Calcul de la teinte
            colors.push(`hsl(${hue}, 80%, 50%)`); // Saturation élevée, luminosité modérée
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
        </ScrollView>
    );
};

export default Tab;