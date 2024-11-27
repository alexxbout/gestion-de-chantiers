import toolSample from "@/assets/samples/tool_sample.json";
import vehicleSample from "@/assets/samples/vehicle_sample.json";
import worksiteSample from "@/assets/samples/worksite_sample.json";
import { Button, ButtonText } from "@/components/ui/button";
import { clearData, uploadDataToFirestore } from "@/config/firebaseConfig";
import { View } from "react-native";

enum RessourceType {
    VEHICLE = "vehicle",
    TOOL = "tool",
    WORKSITE = "worksite",
}

const Tab = () => {
    console.log("Véhicules chargés:", vehicleSample);

    const add = (type: RessourceType) => {
        console.log("Ajout de ressource de type", type);

        switch (type) {
            case RessourceType.VEHICLE:
                uploadDataToFirestore(vehicleSample, type);
                break;
            case RessourceType.TOOL:
                uploadDataToFirestore(toolSample, type);
                break;
            case RessourceType.WORKSITE:
                uploadDataToFirestore(worksiteSample, type);
                break;
            default:
                console.error("Type de ressource inconnu.");
        }
    };

    const clear = () => {
        console.log("Effacement des ressources");
        clearData(RessourceType.VEHICLE);
        clearData(RessourceType.TOOL);
        clearData(RessourceType.WORKSITE);
    };

    return (
        <View className="flex flex-col h-full p-5 bg-white gap-y-5">
            <Button onPress={() => clear()} action="negative">
                <ButtonText>Effacer toutes les données</ButtonText>
            </Button>

            <Button onPress={() => add(RessourceType.VEHICLE)}>
                <ButtonText>Ajouter des véhicules</ButtonText>
            </Button>

            <Button onPress={() => add(RessourceType.TOOL)}>
                <ButtonText>Ajouter des outils</ButtonText>
            </Button>

            <Button onPress={() => add(RessourceType.WORKSITE)}>
                <ButtonText>Ajouter des chantiers</ButtonText>
            </Button>
        </View>
    );
};

export default Tab;
