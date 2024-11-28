import { Button, ButtonText } from "@/components/ui/button";
import { clearData, uploadDataToFirestore } from "@/config/firebaseConfig";
import teamSample from "@/samples/team-sample.json";
import toolSample from "@/samples/tool-sample.json";
import userSample from "@/samples/user-sample.json";
import vehicleSample from "@/samples/vehicle-sample.json";
import worksiteSample from "@/samples/worksite-sample.json";
import { CollectionName } from "@/types/database";
import { View } from "react-native";

const Tab = () => {
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
                break;
            case CollectionName.TEAM:
                uploadDataToFirestore(teamSample, type);
                break;
            default:
                console.error("Type de ressource inconnu.");
        }
    };

    const clear = () => {
        console.log("Effacement des ressources");
        clearData(CollectionName.VEHICLE);
        clearData(CollectionName.TOOL);
        clearData(CollectionName.WORKSITE);
    };

    return (
        <View className="flex flex-col h-full p-5 bg-white gap-y-5">
            <Button onPress={() => clear()} action="negative">
                <ButtonText>Effacer toutes les données</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.VEHICLE)}>
                <ButtonText>Ajouter des véhicules</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.TOOL)}>
                <ButtonText>Ajouter des outils</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.WORKSITE)}>
                <ButtonText>Ajouter des chantiers</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.USER)}>
                <ButtonText>Ajouter des utilisateurs</ButtonText>
            </Button>

            <Button onPress={() => add(CollectionName.TEAM)}>
                <ButtonText>Ajouter des équipes</ButtonText>
            </Button>
        </View>
    );
};

export default Tab;
