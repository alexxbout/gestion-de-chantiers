import DefectCard from "@/components/custom/defect";
import { Button, ButtonText } from "@/components/ui/button";
import { Defect } from "@/types/database";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

const Layout = () => {
    // TODO: Load worksites info from the database
    const router = useRouter();

    const defects: Defect[] = [
        {
            id: 1,
            description: "Fortes intempéries",
            date: "2024-06-03",
            reportedBy: "Alexandre Boutinaud",
        },
        {
            id: 2,
            description: "Panne de matériel",
            date: "2024-06-03",
            reportedBy: "Alexandre Boutinaud",
        },
        {
            id: 3,
            description: "Absence d'électricité",
            date: "2024-06-03",
            reportedBy: "Alexandre Boutinaud",
        },
    ];

    const { id } = useLocalSearchParams();

    return (
        <>
            <ScrollView className="bg-white">
                <View className="flex justify-center p-5 gap-y-4">
                    {defects.map((defect, index) => (
                        <DefectCard key={index} id={defect.id} description={defect.description} date={defect.date} reportedBy={defect.reportedBy} />
                    ))}
                </View>
            </ScrollView>

            <BlurView className="shadow-[0px_-15px_60px_5px_rgba(0,0,0,0.1)] absolute bottom-0 flex flex-row items-center w-screen p-4 h-max" intensity={25} tint="light">
                <Button onPress={() => router.navigate(`/defects/add/${id}`)} className="flex-1 text-white" variant="solid" size="lg" action="negative">
                    <ButtonText>Déclarer une anomalie</ButtonText>
                </Button>
            </BlurView>
        </>
    );
};

export default Layout;
