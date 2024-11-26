import CustomForm, { CustomFormProps } from "@/components/custom/custom-form";
import { Button, ButtonText } from "@/components/ui/button";
import { WorksiteStatus } from "@/types/database";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";

const Layout = () => {
    // TODO: Load worksites info from the database
    const router = useRouter();

    const data: { [key: string]: string } = {
        title: "Un titre",
        description: "Une description",
        start_date: "2024-06-03",
        end_date: "2024-07-03",
        client: "Alexandre Boutinaud",
        status: "En cours",
    };

    const worksiteStatusOptions = Object.entries(WorksiteStatus).map(([label, value]) => ({
        label: value,
        value: label.toLowerCase(),
    }));

    const fields: CustomFormProps["fields"] = [
        { key: "title", label: "Titre", placeholder: "Saisir un titre", type: "text", required: true },
        { key: "description", label: "Description", placeholder: "Saisir une description", type: "text", required: true },
        { key: "start_date", label: "Date de début", placeholder: "jj/mm/aaaa", type: "text", required: true },
        { key: "end_date", label: "Date de fin", placeholder: "jj/mm/aaaa", type: "text", required: true },
        { key: "client", label: "Client", placeholder: "Saisir le nom et le prénom du client", type: "text", required: true },
        { key: "status", label: "Statut", placeholder: "Choisir le statut du chantier", type: "select", options: worksiteStatusOptions, required: true },
    ];

    return (
        <>
            <ScrollView className="p-6 bg-white">
                <CustomForm data={data} fields={fields} />
            </ScrollView>

            <BlurView className="shadow-[0px_-15px_60px_5px_rgba(0,0,0,0.1)] absolute bottom-0 flex flex-row items-center justify-center w-screen p-4 h-max" intensity={25} tint="light">
                <Button onPress={() => router.navigate("/worksites")} className="flex-1 text-white" variant="solid" size="lg">
                    <ButtonText>Valider les changements</ButtonText>
                </Button>
            </BlurView>
        </>
    );
};

export default Layout;
