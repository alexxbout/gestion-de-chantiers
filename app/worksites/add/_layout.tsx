import { ToolSelector, VehicleSelector } from "@/components/custom/category-selector";
import CustomForm, { CustomFormOption, CustomFormProps } from "@/components/custom/custom-form";
import { Button, ButtonText } from "@/components/ui/button";
import { AddIcon, CloseCircleIcon, Icon, SlashIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { getAllDocuments, updateDocument, uploadDataToFirestore } from "@/firebase/api";
import { VehicleStatus } from "@/types/components";
import { CollectionName, Team, Tool, Vehicle, Worksite, WorksiteStatus } from "@/types/database";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Layout = () => {
    const router = useRouter();

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [tools, setTools] = useState<Tool[]>([]);

    const [teams, setTeams] = useState<Team[]>([]);
    const [worksites, setWorksites] = useState<Worksite[]>([]);

    const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
    const [filteredVehicles, setFilteredVehicles] = useState<(Vehicle & { isAvailable: boolean | null })[]>([]);
    const [teamOptions, setTeamOptions] = useState<CustomFormOption[]>([]);
    const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [imageURL, setImageURL] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedVehicles, fetchedTools, fetchedTeams, fetchedWorksites] = await Promise.all([getAllDocuments<Vehicle>(CollectionName.VEHICLE), getAllDocuments<Tool>(CollectionName.TOOL), getAllDocuments<Team>(CollectionName.TEAM), getAllDocuments<Worksite>(CollectionName.WORKSITE)]);
                setVehicles(fetchedVehicles);
                setTools(fetchedTools);
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

        if (!start_date || !duration) {
            const updatedVehicles = vehicles.map((vehicle) => ({
                ...vehicle,
                isAvailable: null,
            }));
            setFilteredVehicles(updatedVehicles);
            setSelectedVehicles([]);
            return;
        }

        const startDate = new Date(start_date);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + parseInt(duration, 10));

        const updatedVehicles = vehicles.map((vehicle) => {
            const isAvailable =
                vehicle.status === VehicleStatus.AVAILABLE &&
                vehicle.periods.every((period) => {
                    if (!period.start || !period.end) return true;
                    const periodStart = new Date(period.start);
                    const periodEnd = new Date(period.end);
                    return periodEnd < startDate || periodStart > endDate;
                });
            return { ...vehicle, isAvailable };
        });

        setFilteredVehicles(updatedVehicles);
        setSelectedVehicles([]);

        const updatedTeamOptions = teams.map((teamItem) => {
            const isAvailable = worksites.every((worksite) => {
                const worksiteStart = new Date(worksite.startDate);
                const worksiteEnd = new Date(worksiteStart);
                worksiteEnd.setDate(worksiteStart.getDate() + worksite.duration);
                return worksite.team !== teamItem.id || worksiteEnd < startDate || worksiteStart > endDate;
            });
            return {
                label: `${teamItem.name}${!isAvailable ? " (Indisponible)" : ""}`,
                value: teamItem.id.toString(),
                disabled: !isAvailable,
            };
        });
        setTeamOptions(updatedTeamOptions);

        const selectedTeam = updatedTeamOptions.find((option) => option.value === team);
        if (selectedTeam && selectedTeam.disabled) {
            setFormValues((prevValues) => ({
                ...prevValues,
                team: null,
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

    const toggleVehicleSelection = (vehicleId: string) => {
        setSelectedVehicles((prevSelected) => (prevSelected.includes(vehicleId) ? prevSelected.filter((id) => id !== vehicleId) : [...prevSelected, vehicleId]));
    };

    const toggleToolSelection = (toolId: string) => {
        setSelectedTools((prevSelectedTools) => (prevSelectedTools.includes(toolId) ? prevSelectedTools.filter((t) => t !== toolId) : [...prevSelectedTools, toolId]));
    };

    const getMaxId = (worksites: Worksite[]) => {
        return worksites.reduce((maxId, worksite) => (worksite.id > maxId ? worksite.id : maxId), 0);
    };

    const handleFormSubmission = () => {
        const selectedVehiclesIds = filteredVehicles.filter((vehicle) => selectedVehicles.includes(vehicle.id.toString())).map((vehicle) => vehicle.id);

        const selectedToolsIds = tools.filter((tool) => selectedTools.includes(tool.id.toString())).map((tool) => tool.id);

        const newWorksite: Worksite = {
            id: getMaxId(worksites) + 1,
            title: formValues.title,
            description: formValues.description,
            status: WorksiteStatus.NOT_STARTED,
            startDate: formValues.start_date,
            duration: parseInt(formValues.duration, 10),
            location: formValues.location,
            client: {
                name: formValues.client,
                phone: formValues.phone,
            },
            vehicles: selectedVehiclesIds,
            materials: selectedToolsIds,
            team: parseInt(formValues.team, 10),
            defects: [],
            pictures: {
                card: {
                    type: "url",
                    value: imageURL,
                },
                gallery: [],
            },
        };

        sendWorksite(newWorksite);

        const startDate = new Date(newWorksite.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + newWorksite.duration);

        const updatedVehicles = vehicles.map((vehicle) => {
            if (selectedVehiclesIds.includes(vehicle.id)) {
                return {
                    ...vehicle,
                    periods: [
                        ...vehicle.periods,
                        {
                            start: startDate.toISOString(),
                            end: endDate.toISOString(),
                        },
                    ],
                    status: VehicleStatus.AVAILABLE,
                };
            }
            return vehicle;
        });

        // for each vehicle, update the periods
        updatedVehicles.forEach((vehicle) => {
            updateDocument(vehicle.id, CollectionName.VEHICLE, vehicle);
        });

    };

    const sendWorksite = async (worksite: Worksite) => {
        try {
            await uploadDataToFirestore([worksite], CollectionName.WORKSITE);
            console.log("Worksite sent:", worksite);

            router.navigate("/worksites");
        } catch (error) {
            console.error("Error sending worksite:", error);
        }
    };

    const addSampleData = () => {
        // picture : https://images.unsplash.com/photo-1541663625919-69012d49aa6a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
        // title : Tour Eiffel
        // description : Réparation de la structure métallique
        // location : Paris
        // client : Société de construction
        // phone : 0123456789
        
        setFormValues({
            title: "Tour Eiffel",
            description: "Réparation de la structure métallique",
            location: "Paris",
            client: "Société de construction",
            phone: "0123456789",
            start_date: "",
            duration: "",
        });

        setImageURL("https://images.unsplash.com/photo-1541663625919-69012d49aa6a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    }

    return (
        <ScrollView className="p-6 bg-white">
            <Button onPress={() => addSampleData()} className="mb-3">
                <ButtonText>Test data</ButtonText>
            </Button>

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
                <VehicleSelector vehicles={filteredVehicles} selectedVehicles={selectedVehicles} toggleVehicleSelection={toggleVehicleSelection} />
            </View>

            <View className="flex flex-col mt-10 gap-y-3">
                <Text className="text-gray-500">Outils</Text>
                <ToolSelector tools={tools} selectedTools={selectedTools} toggleToolSelection={toggleToolSelection} />
            </View>

            <Button className="w-full mt-10" size="md" onPress={() => handleFormSubmission()}>
                <ButtonText>Démarrer un nouveau chantier</ButtonText>
            </Button>
        </ScrollView>
    );
};

export default Layout;
