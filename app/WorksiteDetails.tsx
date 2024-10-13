import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";

type WorksiteDetailsNavigationProp = StackNavigationProp<RootStackParamList, "worksite_details">;

type Props = {
    navigation: WorksiteDetailsNavigationProp;
};

export default function WorksiteDetails() {
    const navigation = useNavigation<WorksiteDetailsNavigationProp>();
}