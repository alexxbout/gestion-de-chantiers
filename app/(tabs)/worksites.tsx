import WorksiteCard from "@/components/custom/worksite-card";
import { VStack } from "@/components/ui/vstack";
import { WorksiteStatus } from "@/types/database";
import { WorksiteProp } from "@/types/navigation";
import { ScrollView } from "react-native";

const Tab = () => {
    // TODO: Load worksites from the database
    const worksites: WorksiteProp[] = [
        {
            id: 1,
            title: "Chantier 1",
            description: "Description du chantier 1",
            start_date: "2022-01-01",
            status: WorksiteStatus.NOT_STARTED,
        },
        {
            id: 2,
            title: "Chantier 2",
            description: "Description du chantier 2",
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
    ];

    return (
        <ScrollView className="h-full p-5 bg-white">
            <VStack space="xl" className="bg-white">
                {worksites.map((worksite, index) => (
                    <WorksiteCard key={index} id={worksite.id} title={worksite.title} description={worksite.description} start_date={worksite.start_date} status={worksite.status} />
                ))}
            </VStack>
        </ScrollView>
    );
};

export default Tab;
