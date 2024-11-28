import { Defect } from "@/types/database";
import { View } from "react-native";
import { AlertCircleIcon, Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { formatDate } from "../utils";

const DefectCard = (props: Defect) => {
    return (
        <View className="flex flex-row w-full p-3 rounded-lg bg-red-50 gap-x-3">
            <Icon as={AlertCircleIcon} size="xl" className="text-red-700" />
            <View className="flex flex-col gap-y-2">
                <Text className="text-red-700" size="md">{props.description}</Text>
                <Text className="text-gray-500" size="md">
                    {formatDate(props.date)}
                </Text>
            </View>
        </View>
    );
};

export default DefectCard;
