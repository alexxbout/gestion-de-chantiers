import WorksiteCard from "@/components/custom/worksite-card";
import { WorksiteStatus } from "@/types/database";
import { WorksiteProp } from "@/types/navigation";
import { ScrollView, View } from "react-native";

const Tab = () => {
    // TODO: Load worksites from the database
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
            id: 3,
            title: "Chantier 4",
            description: "Description du chantier 3",
            start_date: "2022-01-01",
            status: WorksiteStatus.INTERRUPTED,
        },
    ];

    return (
        <ScrollView className="h-full p-6 bg-white">
            <View className="flex flex-col pb-10 bg-white gap-y-8">
                {worksites.map((worksite, index) => (
                    <WorksiteCard key={index} id={worksite.id} title={worksite.title} description={worksite.description} start_date={worksite.start_date} status={worksite.status} />
                ))}
            </View>
        </ScrollView>
    );
};

export default Tab;
