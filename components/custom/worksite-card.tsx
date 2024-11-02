import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { AlertCircleIcon, ArrowRightIcon, CheckIcon, ClockIcon, InfoIcon } from "@/components/ui/icon";
import { BadgeAction } from "@/types/components";
import { WorksiteProp } from "@/types/navigation";
import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { Button, ButtonIcon, ButtonText } from "../ui/button";

const WorksiteCard = (props: WorksiteProp) => {
    const router = useRouter();

    const { action, icon, text } = getStatusStyles(props.status);

    const showInfo = (id: number) => {
        router.push({ pathname: `/worksites/info/[id]`, params: { id: id.toString() } });
    }

    return (
        <Pressable onPress={() => showInfo(props.id)} className="flex flex-col px-3 py-2 bg-white border border-gray-300 rounded-lg gap-y-2">
            <Text className="text-xl font-semibold">{props.title}</Text>
            <Text className="font-light text-gray-400">{props.description}</Text>
            <Text className="font-light text-gray-400">{formatDate(props.start_date)}</Text>

            <Box className="flex flex-row items-center justify-between">
                <Badge size="lg" action={action} className="rounded-sm w-max">
                    <BadgeText>{text}</BadgeText>
                    <BadgeIcon as={icon} className="ml-2" />
                </Badge>

                <Button onPress={() => showInfo(props.id)} size="md" variant="link" action="primary">
                    <ButtonText>Voir les détails</ButtonText>
                    <ButtonIcon as={ArrowRightIcon} />
                </Button>
            </Box>
        </Pressable>
    );
};

const getStatusStyles = (status: string): { action: BadgeAction; icon: React.ElementType; text: string } => {
    switch (status) {
        case "Non réalisé":
            return {
                action: BadgeAction.MUTED,
                icon: InfoIcon,
                text: "Non réalisé",
            };
        case "En cours":
            return {
                action: BadgeAction.WARNING,
                icon: ClockIcon,
                text: "En cours",
            };
        case "Interrompu":
            return {
                action: BadgeAction.ERROR,
                icon: AlertCircleIcon,
                text: "Interrompu",
            };
        case "Terminé":
            return {
                action: BadgeAction.SUCCESS,
                icon: CheckIcon,
                text: "Terminé",
            };
        default:
            return {
                action: BadgeAction.MUTED,
                icon: InfoIcon,
                text: "Statut inconnu",
            };
    }
};

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("fr-FR", options);
};

export default WorksiteCard;
