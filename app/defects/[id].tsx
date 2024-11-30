import DefectCard from "@/components/custom/defect";
import { Button, ButtonText } from "@/components/ui/button";
import { findDocumentById } from "@/config/firebaseConfig";
import { CollectionName, Worksite } from "@/types/database";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Layout = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [worksite, setWorksite] = useState<Worksite | null>();

    useEffect(() => {
        const fetchWorksite = async () => {
            try {
                const fetchedWorksite = await findDocumentById(Number.parseInt(id as string), CollectionName.WORKSITE);
                setWorksite(fetchedWorksite as Worksite);
            } catch (error) {
                console.error("Error fetching worksite: ", error);
            }
        };

        if (id) {
            fetchWorksite();
        }
    }, [id]);

    return (
        <>
            <ScrollView className="bg-white">
                <View className="flex justify-center p-5 gap-y-4">
                    {worksite && worksite.defects.map((defect, index) => (
                        <DefectCard key={index} id={defect.id} description={defect.description} date={defect.date} />
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
