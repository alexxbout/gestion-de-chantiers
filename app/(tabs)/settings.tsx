import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useUser } from "@/context/UserContext";
import { clearData, createUserAccount, uploadDataToFirestore } from "@/firebase/api";
import teamSample from "@/samples/team-sample.json";
import toolSample from "@/samples/tool-sample.json";
import userSample from "@/samples/user-sample.json";
import vehicleSample from "@/samples/vehicle-sample.json";
import worksiteSample from "@/samples/worksite-sample.json";
import { CollectionName } from "@/types/database";
import { View } from "react-native";

const Tab = () => {
    const {user, logout} = useUser();

    if (user?.role !== "Responsable") {
        return (
            <Text className="p-5">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</Text>
        );
    }

    const add = (type: CollectionName) => {
        console.log("Ajout de ressource de type", type);

        switch (type) {
            case CollectionName.VEHICLE:
                uploadDataToFirestore(vehicleSample, type);
                break;
            case CollectionName.TOOL:
                uploadDataToFirestore(toolSample, type);
                break;
            case CollectionName.WORKSITE:
                uploadDataToFirestore(worksiteSample, type);
                break;
            case CollectionName.USER:
                uploadDataToFirestore(userSample, type);

                userSample.forEach(async (user) => {
                    await createUserAccount(user.email, "password");
                });
                break;
            case CollectionName.TEAM:
                uploadDataToFirestore(teamSample, type);
                break;
            default:
                console.error("Type de ressource inconnu.");
        }
    };

    const addAll = () => {
        console.log("Ajout de toutes les ressources");
        add(CollectionName.VEHICLE);
        add(CollectionName.TOOL);
        add(CollectionName.WORKSITE);
        add(CollectionName.USER);
        add(CollectionName.TEAM);
    }

    const clear = () => {
        console.log("Effacement des ressources");
        clearData(CollectionName.VEHICLE);
        clearData(CollectionName.TOOL);
        clearData(CollectionName.WORKSITE);
        clearData(CollectionName.USER);
        clearData(CollectionName.TEAM);
    };

    return (
        <View className="flex flex-col h-full p-5 bg-white gap-y-5">
            <Button onPress={() => logout()} action="negative">
                <ButtonText>Déconnexion</ButtonText>
            </Button>

            <Button onPress={() => clear()} action="negative" className="mt-10">
                <ButtonText>Effacer toutes les ressources</ButtonText>
            </Button>

            <Button onPress={() => addAll()} action="positive">
                <ButtonText>Ajouter toutes les ressources</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.VEHICLE)} action="positive" className="mt-10">
                <ButtonText>Ajouter des véhicules</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.TOOL)} action="positive">
                <ButtonText>Ajouter des outils</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.WORKSITE)} action="positive">
                <ButtonText>Ajouter des chantiers</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.USER)} action="positive">
                <ButtonText>Ajouter des utilisateurs</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.TEAM)} action="positive">
                <ButtonText>Ajouter des équipes</ButtonText>
            </Button>
        </View>
    );
};

export default Tab;
