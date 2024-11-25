import Team from "@/components/custom/team";
import Tool from "@/components/custom/tool";
import { User } from "@/types/database";
import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";

const Tab = () => {
    // TODO: Load teams info from the database

    const [users, setUsers] = useState<User[]>([
        { uid: "0", role: "Equipier", name: "Jean Dupont", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "1", role: "Equipier", name: "Marie Dupond", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "2", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "4", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "5", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
        { uid: "6", role: "Equipier", name: "Paul Durand", email: "", assignedChantiers: [0, 1, 2] },
    ]);

    const [lead, setLead] = useState<User>({
        uid: "3",
        role: "Chef de chantier",
        name: "Alexandre Boutinaud",
        email: "",
        assignedChantiers: [0, 1, 2],
        photoURL: "",
    });

    useEffect(() => {
        axios
            .get(`https://tinyfac.es/api/data?limit=${users.length + 1}&quality=0`)
            .then((response) => {
                const updatedLead = {
                    ...lead,
                    photoURL: response.data[0]?.url || "",
                };

                const updatedUsers = users.map((user, index) => ({
                    ...user,
                    photoURL: response.data[index + 1]?.url || "",
                }));

                setUsers(updatedUsers);
                setLead(updatedLead);
            })
            .catch((error) => {
                console.error("Failed to fetch user photos:", error);
            });
    }, []);

    return (
        <View className="flex flex-col h-full p-5 bg-white gap-y-10">
            <Team team={"Une team"} users={users} lead={lead} />
        </View>
    );
};

export default Tab;
