import { VStack } from "@/components/ui/vstack";
import WorksiteCard from "@/components/WorksiteCard";
import { View } from "react-native";

export default function () {
    return (
        <View className="flex flex-col h-full bg-white p-7 gap-y-10">
            <VStack space="lg">
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="En cours" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Interrompu" />
                <WorksiteCard id={1} title="Chantier 1" description="Description du chantier 1" startDate="01/01/2022" status="Terminé" />
            </VStack>
        </View>
    );
}
