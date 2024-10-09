import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { BadgeAction } from "@/types/components";
import { Chantier } from "@/types/database";
import { Pressable, Text } from "react-native";
import { Box } from "./ui/box";
import { Button, ButtonIcon, ButtonText } from "./ui/button";
import { AlertCircleIcon, ArrowRightIcon, CheckIcon, ClockIcon, InfoIcon } from "./ui/icon";

interface Props {
    id: number;
    title: string;
    description: string;
    startDate: string;
    status: Chantier["status"];
}

export default function Header(props: Props) {
    const { action, icon, text } = getStatusStyles(props.status);

    const startDate = new Date(props.startDate);
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    const formattedStartDate = startDate.toLocaleDateString("fr-FR", options);

    return (
        <Pressable onPress={() => console.log("Hello")} className="flex flex-col p-2 bg-white border border-gray-400 rounded-md gap-y-2">
            <Text className="text-xl font-semibold">{props.title}</Text>
            <Text className="font-light text-gray-400">{props.description}</Text>
            <Text className="font-light text-gray-400">{formattedStartDate}</Text>

            <Box className="flex flex-row items-center justify-between">
                <Badge size="md" action={action} className="rounded-sm w-max">
                    <BadgeText>{text}</BadgeText>
                    <BadgeIcon as={icon} className="ml-2" />
                </Badge>

                <Button size="md" variant="link" action="primary">
                    <ButtonText>Voir les détails</ButtonText>
                    <ButtonIcon as={ArrowRightIcon} />
                </Button>
            </Box>
        </Pressable>
    );
}

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
