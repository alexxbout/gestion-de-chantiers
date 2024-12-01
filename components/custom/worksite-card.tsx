import { Worksite, WorksiteStatus } from "@/types/database";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { formatDate } from "../utils";

const WorksiteCard = (props: { worksite: Worksite}) => {
    const router = useRouter();

    const showInfo = (id: number) => {
        router.push({ pathname: "/worksites/[id]", params: { id: id.toString() } });
    };

    return (
        <Pressable onPress={() => showInfo(props.worksite.id)}>
            <View className={"flex flex-col w-full overflow-hidden border-[4px] rounded-xl shadow-[0px_0px_30px_10px_rgba(0,0,0,0.13)] " + getColorStatus(props.worksite.status, "BORDER")}>
                <Image className="w-full h-[370px]" alt="worksite" source={{ uri: props.worksite.pictures.card.value }} />

                <BlurView className="absolute bottom-0 flex flex-row items-end justify-between w-full p-4 h-max gap-x-4" intensity={90} tint="extraLight">
                    <View className="flex flex-col w-full gap-y-2 shrink">
                        <Text className="text-2xl font-semibold text-black">{props.worksite.title}</Text>

                        <View className="flex">
                            <Text className="overflow-hidden truncate whitespace-nowrap">{props.worksite.description}</Text>
                            <Text>{formatDate(props.worksite.startDate)}</Text>
                        </View>
                    </View>

                    <Button onPress={() => showInfo(props.worksite.id)} className="text-white w-max">
                        <ButtonText>Détails</ButtonText>
                    </Button>
                </BlurView>
            </View>
            <View className={"absolute top-0 left-0 px-5 py-2 rounded-br-xl rounded-tl-xl " + getColorStatus(props.worksite.status, "BG")}>
                <Text className="text-sm font-semibold text-white uppercase">{props.worksite.status}</Text>
            </View>
        </Pressable>
    );
};

const getColorStatus = (status: WorksiteStatus, mode: "BG" | "BORDER") => {
    switch (status) {
        case WorksiteStatus.IN_PROGRESS:
            return (mode === "BG" ? "bg" : "border") + "-yellow-500";
        case WorksiteStatus.INTERRUPTED:
            return (mode === "BG" ? "bg" : "border") + "-red-600";
        case WorksiteStatus.COMPLETED:
            return (mode === "BG" ? "bg" : "border") + "-green-600";
        case WorksiteStatus.NOT_STARTED:
            return (mode === "BG" ? "bg" : "border") + "-gray-600";
    }
};

export default WorksiteCard;
