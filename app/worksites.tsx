import { VStack } from "@/components/ui/vstack";
import WorksiteCard from "@/components/WorksiteCard";
import { ScrollView } from "react-native";

export default function () {
    return (
        <ScrollView className="h-full p-5 bg-white">
            <VStack space="xl" className="bg-white">
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="En cours" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Interrompu" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Terminé" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="En cours" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Interrompu" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Terminé" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="En cours" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Interrompu" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Terminé" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="En cours" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Interrompu" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Terminé" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="En cours" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Interrompu" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Terminé" />
            </VStack>
        </ScrollView>
    );
}
