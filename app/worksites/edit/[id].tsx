import CustomForm, { CustomFormProps } from "@/components/custom/custom-form";
import { Button, ButtonText } from "@/components/ui/button";
import { findDocumentById, updateDocument } from "@/firebase/api";
import { CollectionName, Worksite, WorksiteStatus } from "@/types/database";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const Layout = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

    const handleFormValuesChange = (values: { [key: string]: any }) => {
        setFormValues(values);
    };

    const handleSubmit = async () => {
        try {
            await updateDocument(Number.parseInt(id as string), CollectionName.WORKSITE, formValues);
            router.navigate("/worksites");
        } catch (error) {
            console.error("Error updating worksite: ", error);
        }
    };

    useEffect(() => {
        const fetchWorksite = async () => {
            try {
                const fetchedWorksite = await findDocumentById(Number.parseInt(id as string), CollectionName.WORKSITE);
                setFormValues(fetchedWorksite as Worksite);
            } catch (error) {
                console.error("Error fetching worksite: ", error);
            }
        };

        if (id) {
            fetchWorksite();
        }
    }, [id]);

    const worksiteStatusOptions = Object.entries(WorksiteStatus).map(([label, value]) => ({
        label: value,
        value: value,
    }));

    const fields: CustomFormProps["fields"] = [
        { key: "title", label: "Titre", placeholder: "Saisir un titre", type: "text", required: true },
        { key: "description", label: "Description", placeholder: "Saisir une description", type: "text", required: true },
        { key: "status", label: "Statut", placeholder: "Choisir le statut du chantier", type: "select", options: worksiteStatusOptions, required: true },
        { key: "startDate", label: "Date de début", placeholder: "aaaa-mm-jj", type: "text", required: true },
        { key: "duration", label: "Nombre de demi-journées", placeholder: "0", type: "text", required: true },
        { key: "location", label: "Localisation", placeholder: "Saisir l'adresse complète du lieu", type: "text", required: true },
        { key: "client.name", label: "Client", placeholder: "Nom complet du client", type: "text", required: true },
        { key: "client.phone", label: "Numéro de téléphone du client", placeholder: "0123456789", type: "text", required: true },
    ];

    return (
        <>
            <ScrollView className="p-6 pb-32 bg-white">
                <CustomForm data={formValues} fields={fields} onFormValuesChange={handleFormValuesChange} />
            </ScrollView>

            <BlurView className="shadow-[0px_-15px_60px_5px_rgba(0,0,0,0.1)] absolute bottom-0 flex flex-row items-center justify-center w-screen p-4 h-max" intensity={25} tint="light">
                <Button onPress={handleSubmit} className="flex-1 text-white" variant="solid" size="lg">
                    <ButtonText>Valider les changements</ButtonText>
                </Button>
            </BlurView>
        </>
    );
};

export default Layout;