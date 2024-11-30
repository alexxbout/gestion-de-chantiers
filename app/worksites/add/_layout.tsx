import { ToolSelector, VehicleSelector } from "@/components/custom/category-selector";
import CustomForm, { CustomFormOption, CustomFormProps } from "@/components/custom/custom-form";
import { Button, ButtonText } from "@/components/ui/button";
import { AddIcon, CloseCircleIcon, Icon, SlashIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { getAllDocuments } from "@/config/firebaseConfig";
import { VehicleStatus } from "@/types/components";
import { CollectionName, Team, Vehicle, Worksite } from "@/types/database";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Layout = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [worksites, setWorksites] = useState<Worksite[]>([]);

    const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
    const [filteredVehicles, setFilteredVehicles] = useState<(Vehicle & { isAvailable: boolean | null })[]>([]);
    const [teamOptions, setTeamOptions] = useState<CustomFormOption[]>([]);
    const [imageURL, setImageURL] = useState<string>("");

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedVehicles, fetchedTeams, fetchedWorksites] = await Promise.all([getAllDocuments<Vehicle>(CollectionName.VEHICLE), getAllDocuments<Team>(CollectionName.TEAM), getAllDocuments<Worksite>(CollectionName.WORKSITE)]);
                setVehicles(fetchedVehicles);
                setTeams(fetchedTeams);
                setWorksites(fetchedWorksites);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const { start_date, duration, team } = formValues;
    
        // Si la date de début ou la durée n'est pas renseignée, affiche tous les véhicules avec statut "gris"
        if (!start_date || !duration) {
            const updatedVehicles = vehicles.map((vehicle) => ({
                ...vehicle,
                isAvailable: null, // Gris, en attente de la date
            }));
            setFilteredVehicles(updatedVehicles);
            return; // Pas besoin de filtrer plus loin
        }
    
        // Sinon, continue avec la logique de filtrage comme avant
        const startDate = new Date(start_date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + parseInt(duration, 10));
    
        // Filtrer les véhicules
        const updatedVehicles = vehicles.map((vehicle) => {
            const isAvailable =
                vehicle.status === VehicleStatus.AVAILABLE &&
                (!vehicle.period.start ||
                    !vehicle.period.end ||
                    new Date(vehicle.period.end) < startDate ||
                    new Date(vehicle.period.start) > endDate);
            return { ...vehicle, isAvailable };
        });
        setFilteredVehicles(updatedVehicles);
    
        // Générer les options des équipes
        const updatedTeamOptions = teams.map((teamItem) => {
            const isAvailable = worksites.every((worksite) => {
                const worksiteStart = new Date(worksite.startDate);
                const worksiteEnd = new Date(worksiteStart);
                worksiteEnd.setDate(worksiteStart.getDate() + worksite.duration);
    
                return (
                    worksite.team !== teamItem.id ||
                    worksiteEnd < startDate ||
                    worksiteStart > endDate
                );
            });
            return {
                label: `${teamItem.name}${!isAvailable ? " (Indisponible)" : ""}`,
                value: teamItem.id.toString(),
                disabled: !isAvailable,
            };
        });
        setTeamOptions(updatedTeamOptions);
    
        // Déselectionner l'équipe si elle devient indisponible
        const selectedTeam = updatedTeamOptions.find((option) => option.value === team);
        if (selectedTeam && selectedTeam.disabled) {
            setFormValues((prevValues) => ({
                ...prevValues,
                team: null, // Réinitialise la sélection
            }));
        }
    }, [formValues, vehicles, teams, worksites]);

    const handleFormValuesChange = (values: { [key: string]: any }) => {
        setFormValues(values);
    };

    const fields: CustomFormProps["fields"] = [
        { key: "title", label: "Titre", placeholder: "Saisir un titre", type: "text", required: true },
        { key: "description", label: "Description", placeholder: "Saisir une description", type: "text", required: true },
        { key: "location", label: "Localisation", placeholder: "Saisir l'adresse complète", type: "text", required: true },
        { key: "client", label: "Client", placeholder: "Nom complet du client", type: "text", required: true },
        { key: "phone", label: "Numéro de téléphone", placeholder: "0123456789", type: "text", required: true },
        { key: "start_date", label: "Date de début", placeholder: "aaaa-mm-jj", type: "text", required: true },
        { key: "duration", label: "Nombre de jours", placeholder: "0", type: "text", required: true },
        {
            key: "team",
            label: "Sélectionner une équipe",
            placeholder: "Choisir une équipe",
            type: "select",
            required: true,
            options: teamOptions,
        },
    ];

    return (
        <ScrollView className="p-6 bg-white">
            <View className="flex flex-col mb-3">
                <Text className="mb-3 text-gray-500">Image de présentation</Text>
                <Input className="w-full" variant="outline" size="xl" isRequired={true}>
                    <InputField type="text" placeholder="Saisir une URL d'image" onChangeText={setImageURL} value={imageURL} />
                </Input>
                {imageURL ? <Image source={{ uri: imageURL }} className="w-full h-[400px] mt-3 rounded-md" resizeMode="cover" /> : <Text className="mt-3 text-gray-400">Aucune image chargée</Text>}
            </View>

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
