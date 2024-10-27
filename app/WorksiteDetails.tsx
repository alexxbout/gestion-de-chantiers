import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";

type NavigationProp = StackNavigationProp<RootStackParamList, "worksiteDetails">;

// type Props = {
//     navigation: NavigationProp;
//     route: { params: { id: string } };
// }

export const WorksiteDetails = () => {
    return <View></View>;
};
