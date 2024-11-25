import { WorksiteProp } from "@/types/navigation";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import { Text } from "../ui/text";
import { formatDate } from "../utils";

const WorksiteCardSmall = (props: WorksiteProp) => {
    const router = useRouter();

    const showInfo = (id: number) => {
        router.push({ pathname: "/worksites/[id]", params: { id: id.toString() } });
    };

    return (
        <Pressable onPress={() => showInfo(props.id)} className="flex flex-col p-3 rounded-md gap-y-5 bg-card">
            <Text className="text-xl font-semibold text-black">{props.title}</Text>

            <View className="flex flex-row items-end justify-between gap-x-5">
                <View className="flex w-full gap-y-2 shrink">
                    <Text className="overflow-hidden truncate whitespace-nowrap">{props.description}</Text>
                    <Text>{formatDate(props.start_date)}</Text>
                </View>
                <Button onPress={() => showInfo(props.id)} className="text-white w-max">
                    <ButtonText>Détails</ButtonText>
                </Button>
            </View>
        </Pressable>
    );
};

export default WorksiteCardSmall;
