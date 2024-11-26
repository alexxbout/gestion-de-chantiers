import CategorySelector from "@/components/custom/category-selector";
import CustomForm, { CustomFormProps } from "@/components/custom/custom-form";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { CategoryEnum } from "@/types/components";
import { WorksiteStatus } from "@/types/database";
import { useState } from "react";
import { ScrollView, View } from "react-native";

const Layout = () => {
    const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

    const handleFormValuesChange = (values: { [key: string]: any }) => {
        setFormValues(values);
    };

    const worksiteStatusOptions = Object.entries(WorksiteStatus).map(([label, value]) => ({
        label: value,
        value: label.toLowerCase(),
    }));

    const fields: CustomFormProps["fields"] = [
        { key: "title", label: "Titre", placeholder: "Saisir un titre", type: "text", required: true },
        { key: "description", label: "Description", placeholder: "Saisir une description", type: "text", required: true },
        { key: "status", label: "Statut", placeholder: "Choisir le statut du chantier", type: "select", options: worksiteStatusOptions, required: true },
        { key: "start_date", label: "Date de début", placeholder: "jj/mm/aaaa", type: "text", required: true },
        { key: "duration", label: "Nombre de demi-journées", placeholder: "0", type: "text", required: true },
        { key: "location", label: "Localisation", placeholder: "Saisir l'adresse complète du lieu", type: "text", required: true },
        { key: "client", label: "Client", placeholder: "Nom complet du client", type: "text", required: true },
        { key: "phone", label: "Numéro de téléphone du client", placeholder: "0123456789", type: "text", required: true },
    ];

    return (
        <ScrollView className="p-6 bg-white">
            <CustomForm data={formValues} fields={fields} onFormValuesChange={handleFormValuesChange} />

            <View className="flex flex-col mt-10 gap-y-3">
                <Text className="text-gray-500">Véhicules</Text>
                <CategorySelector type={CategoryEnum.VEHICLES} />
            </View>

            <View className="flex flex-col mt-10 gap-y-3">
                <Text className="text-gray-500">Outils</Text>
                <CategorySelector type={CategoryEnum.TOOLS} />
            </View>

            <Button className="w-full mt-10" size="md">
                <ButtonText>Démarrer un nouveau chantier</ButtonText>
            </Button>
        </ScrollView>
    );
};

export default Layout;
