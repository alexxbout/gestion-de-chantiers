import { ToolSelector, VehicleSelector } from "@/components/custom/category-selector";
import CustomForm, { CustomFormProps } from "@/components/custom/custom-form";
import { Button, ButtonText } from "@/components/ui/button";
import { AddIcon, CloseCircleIcon, Icon, SlashIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VehicleStatus } from "@/types/components";
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
                <View className="flex flex-col gap-y-5">
                    <View className="flex flex-row gap-x-2">
                        <View className="p-1 bg-green-500 rounded-full w-max">
                            <Icon as={AddIcon} className="w-4 h-4 text-white" />
                        </View>

                        <Text>Disponible</Text>
                    </View>

                    <View className="flex flex-row gap-x-2">
                        <View className="p-1 bg-orange-500 rounded-full w-max">
                            <Icon as={CloseCircleIcon} className="w-4 h-4 text-white" />
                        </View>
                        <Text>En maintenance</Text>
                    </View>

                    <View className="flex flex-row gap-x-2">
                        <View className="p-1 bg-red-500 rounded-full w-max">
                            <Icon as={SlashIcon} className="w-4 h-4 text-white" />
                        </View>
                        <Text>En utilisation</Text>
                    </View>
                </View>
                
                <VehicleSelector status={VehicleStatus.AVAILABLE} />
            </View>

            <View className="flex flex-col mt-10 gap-y-3">
                <Text className="text-gray-500">Outils</Text>
                <ToolSelector />
            </View>

            <Button className="w-full mt-10" size="md">
                <ButtonText>Démarrer un nouveau chantier</ButtonText>
            </Button>
        </ScrollView>
    );
};

export default Layout;
