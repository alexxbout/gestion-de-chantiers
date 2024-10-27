import { VStack } from "@/components/ui/vstack";
import { WorksiteCard } from "@/components/WorksiteCard";
import { WorksiteStatus } from "@/types/database";
import { WorksiteProp } from "@/types/navigation";
import { ScrollView } from "react-native";

export const Worksites = () => {
    // TODO: Load worksites from the database
    const worksites: WorksiteProp[] = [
        {
            id: 1,
            title: "Chantier 1",
            description: "Description du chantier 1",
            startDate: "2022-01-01",
            status: WorksiteStatus.NOT_STARTED
        },
        {
            id: 2,
            title: "Chantier 2",
            description: "Description du chantier 2",
            startDate: "2022-01-01",
            status: WorksiteStatus.IN_PROGRESS
        },
        {
            id: 3,
            title: "Chantier 3",
            description: "Description du chantier 3",
            startDate: "2022-01-01",
            status: WorksiteStatus.INTERRUPTED
        },
    ];


    return (
        <ScrollView className="h-full p-5 bg-white">
            <VStack space="xl" className="bg-white">
                { worksites.map((worksite, index) => <WorksiteCard key={index} id={worksite.id} title={worksite.title} description={worksite.description} startDate={worksite.startDate} status={worksite.status} />)}
            </VStack>
        </ScrollView>
    );
};
