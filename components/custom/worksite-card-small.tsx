import { Worksite } from "@/types/database";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import { Text } from "../ui/text";
import { formatDate } from "../utils";

const WorksiteCardSmall = (props: {worksite: Worksite, color: string}) => {
    const router = useRouter();

    const showInfo = (id: number) => {
        router.push({ pathname: "/worksites/[id]", params: { id: id.toString() } });
    };

    return (
        <Pressable onPress={() => showInfo(props.worksite.id)} className="flex flex-col p-3 rounded-md gap-y-5 bg-card" style={{borderColor: props.color, borderWidth: 2}}>
            <Text className="text-xl font-semibold text-black">{props.worksite.title}</Text>

            <View className="flex flex-row items-end justify-between gap-x-5">
                <View className="flex w-full gap-y-2 shrink">
                    <Text className="overflow-hidden truncate whitespace-nowrap">{props.worksite.description}</Text>
                    <Text>{formatDate(props.worksite.startDate)}</Text>
                </View>
                <Button onPress={() => showInfo(props.worksite.id)} className="text-white w-max">
                    <ButtonText>Détails</ButtonText>
                </Button>
            </View>
        </Pressable>
    );
};

export default WorksiteCardSmall;
