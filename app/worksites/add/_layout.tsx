import { ToolSelector, VehicleSelector } from "@/components/custom/category-selector";
import CustomForm, { CustomFormProps } from "@/components/custom/custom-form";
import { Button, ButtonText } from "@/components/ui/button";
import { AddIcon, CloseCircleIcon, Icon, SlashIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { getAllDocuments } from "@/config/firebaseConfig";
import { VehicleStatus } from "@/types/components";
import { CollectionName, Vehicle } from "@/types/database";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Layout = () => {
    const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [filteredVehicles, setFilteredVehicles] = useState<(Vehicle & { isAvailable: boolean | null })[]>([]);

    // Récupère les véhicules depuis Firebase au chargement du composant
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const fetchedVehicles = await getAllDocuments<Vehicle>(CollectionName.VEHICLE);
                setVehicles(fetchedVehicles);
            } catch (error) {
                console.error("Error fetching vehicles: ", error);
            }
        };

        fetchVehicles();
    }, []);

    // Filtre les véhicules selon les dates fournies
    useEffect(() => {
        const { start_date, duration } = formValues;

        if (start_date && duration) {
            const startDate = new Date(start_date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + parseInt(duration, 10));

            const updatedVehicles = vehicles.map((vehicle) => {
                const isAvailable =
                    vehicle.status === VehicleStatus.AVAILABLE &&
                    (!vehicle.period.start ||
                        !vehicle.period.end ||
                        (new Date(vehicle.period.end) < startDate || new Date(vehicle.period.start) > endDate));

                return { ...vehicle, isAvailable }; // Utilisation temporaire pour déterminer si disponible
            });

            setFilteredVehicles(updatedVehicles);
        } else {
            // Si aucune date n'est fournie, tous les véhicules nécessitent plus d'informations
            setFilteredVehicles(vehicles.map((vehicle) => ({ ...vehicle, isAvailable: null })));
        }
    }, [formValues, vehicles]);

    const handleFormValuesChange = (values: { [key: string]: any }) => {
        setFormValues(values);
    };

    const fields: CustomFormProps["fields"] = [
        { key: "title", label: "Titre", placeholder: "Saisir un titre", type: "text", required: true },
        { key: "description", label: "Description", placeholder: "Saisir une description", type: "text", required: true },
        { key: "start_date", label: "Date de début", placeholder: "aaaa-mm-jj", type: "text", required: true },
        { key: "duration", label: "Nombre de jours", placeholder: "0", type: "text", required: true },
        { key: "location", label: "Localisation", placeholder: "Saisir l'adresse complète", type: "text", required: true },
        { key: "client", label: "Client", placeholder: "Nom complet du client", type: "text", required: true },
        { key: "phone", label: "Numéro de téléphone", placeholder: "0123456789", type: "text", required: true },
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
                
                <VehicleSelector vehicles={filteredVehicles} />
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