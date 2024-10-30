import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";

type NavigationProp = StackNavigationProp<RootStackParamList, "worksite_details">;

export const WorksiteDetails = (props: NavigationProp) => {
    return <View></View>;
};
