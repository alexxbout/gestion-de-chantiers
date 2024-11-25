import { User } from "@/types/database";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

const Team = (props: { team: string; users: User[]; lead: User }) => {
    return (
        <View className="flex flex-col p-3 overflow-hidden rounded-lg bg-card gap-y-5">
            <Text className="text-xl font-medium text-black">{props.team}</Text>

            <View className="flex flex-row overflow-x-auto gap-x-5">
                <UserCircle user={props.lead} />

                <View className="flex flex-row gap-x-5">
                    {props.users.map((user) => (
                        <UserCircle key={user.uid} user={user} />
                    ))}
                </View>
            </View>
        </View>
    );
};

const UserCircle = (props: { user: User }) => {

    const [isLead, setIsLead] = useState(false);

    useEffect(() => {
        setIsLead(props.user.role == "Chef de chantier");
    }, [props.user]);

    return (
        <View className="flex flex-col items-center justify-center gap-y-2">
            <Image source={{ uri: props.user.photoURL }} className={"rounded-full w-[50px] h-[50px]" + (isLead ? " border-blue-500 border-[3px]" : "")} />

            <Text className={"text-center" + (isLead ? " text-blue-500 font-semibold" : "")}>{props.user.name.split(" ")[0]}</Text>
        </View>
    );
};

export default Team;
