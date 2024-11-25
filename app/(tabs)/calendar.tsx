import WorksiteCardSmall from "@/components/custom/worksite-card-small";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { WorksiteStatus } from "@/types/database";
import { WorksiteProp } from "@/types/navigation";
import { useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ScrollView } from "react-native-gesture-handler";

LocaleConfig.locales["fr"] = {
    monthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    monthNamesShort: ["Janv.", "Févr.", "Mars", "Avril", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
    dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

const Tab = () => {
    const [selected, setSelected] = useState("");

    const worksites: WorksiteProp[] = [
        {
            id: 1,
            title: "Les Terrasses",
            description: "Projet résidentiel avec des espaces en terrasses ou en hauteur",
            start_date: "2022-01-01",
            status: WorksiteStatus.COMPLETED,
        },
        {
            id: 2,
            title: "Cœur de Ville",
            description: "Revitalisation urbaine en centre-ville",
            start_date: "2022-01-01",
            status: WorksiteStatus.IN_PROGRESS,
        },
        {
            id: 3,
            title: "Chantier 3",
            description: "Description du chantier 3",
            start_date: "2022-01-01",
            status: WorksiteStatus.INTERRUPTED,
        },
        {
            id: 4,
            title: "Chantier 4",
            description: "Description du chantier 3",
            start_date: "2022-01-01",
            status: WorksiteStatus.INTERRUPTED,
        },
    ];

    return (
        <ScrollView className="flex flex-col h-full p-5 pb-20 bg-white">
            <Calendar
                firstDay={1}
                enableSwipeMonths={true}
                onDayPress={(day: any) => {
                    setSelected(day.dateString);
                }}
                markedDates={{
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
                    <WorksiteCardSmall key={worksite.id} {...worksite} />
                ))}
            </View>
        </ScrollView>
    );
};

export default Tab;
