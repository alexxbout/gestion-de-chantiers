import { WorksiteStatus } from "@/types/database";
import { Badge, BadgeIcon, BadgeText } from "../ui/badge";
import { CheckCircleIcon, CircleIcon, ClockIcon, SlashIcon } from "../ui/icon";

const WorksiteStatusBadge = (props: { status: WorksiteStatus }) => {
    const { action, icon } = getColorStatus(props.status);

    return (
        <Badge size="lg" variant="solid" action={action} className="w-max">
            <BadgeIcon as={icon} className="mr-2" />
            <BadgeText>{props.status}</BadgeText>
        </Badge>
    );
};

const getColorStatus = (status: WorksiteStatus): { action: "error" | "warning" | "success" | "info" | "muted"; icon: React.ElementType } => {
    switch (status) {
        case WorksiteStatus.IN_PROGRESS:
            return { action: "warning", icon: ClockIcon };
        case WorksiteStatus.INTERRUPTED:
            return { action: "error", icon: SlashIcon };
        case WorksiteStatus.COMPLETED:
            return { action: "success", icon: CheckCircleIcon };
        case WorksiteStatus.NOT_STARTED:
            return { action: "muted", icon: CircleIcon };
    }
};

export default WorksiteStatusBadge;