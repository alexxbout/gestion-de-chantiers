import toolSample from "@/assets/samples/tool_sample.json";
import vehicleSample from "@/assets/samples/vehicle_sample.json";
import worksiteSample from "@/assets/samples/worksite_sample.json";
import { Button, ButtonText } from "@/components/ui/button";
import { clearData, uploadDataToFirestore } from "@/config/firebaseConfig";
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
        </View>
    );
};

export default Tab;
