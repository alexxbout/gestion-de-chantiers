import CustomForm, { CustomFormProps } from "@/components/custom/custom-form";
import { Button, ButtonText } from "@/components/ui/button";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

const Layout = () => {
    // TODO: Load worksites info from the database
    const router = useRouter();;

    const fields: CustomFormProps["fields"] = [
        { key: "description", label: "Description", placeholder: "Décrire l'anomalie", type: "text", required: true },
        { key: "date", label: "Date de l'anomalie", placeholder: "Saisir la date de l'anomalie", type: "date", required: true },
    ];

    return (
        <>
            <ScrollView className="p-6 bg-white">
                <CustomForm data={[]} fields={fields} />
            </ScrollView>

            <BlurView className="shadow-[0px_-15px_60px_5px_rgba(0,0,0,0.1)] absolute bottom-0 flex flex-row items-center justify-center w-screen p-4 h-max" intensity={25} tint="light">
                <Button onPress={() => router.navigate("/worksites")} className="flex-1 text-white" variant="solid" size="lg" action="negative">
                    <ButtonText>Valider cette anomalie</ButtonText>
                </Button>
            </BlurView>
        </>
    );
};

export default Layout;