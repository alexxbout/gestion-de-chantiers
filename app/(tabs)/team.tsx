import TeamCard from "@/components/custom/team";
import { Text } from "@/components/ui/text";
import { findDocumentById, getAllDocuments } from "@/config/firebaseConfig";
import { CollectionName, Team, User } from "@/types/database";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Teams = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [teamMembers, setTeamMembers] = useState<{ [key: number]: { lead: User; workers: User[] } }>({});

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const fetchedTeams = await getAllDocuments<Team>(CollectionName.TEAM);
                setTeams(fetchedTeams);
            } catch (error) {
                console.error("Error fetching teams: ", error);
            }
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            const members: { [key: number]: { lead: User; workers: User[] } } = {};

            for (const team of teams) {
                try {
                    const lead = await findDocumentById(team.members.lead, CollectionName.USER);
                    const workers = await Promise.all(team.members.workers.map((workerId) => findDocumentById(workerId, CollectionName.USER)));

                    members[team.id] = {
                        lead: lead as User,
                        workers: workers as User[],
                    };
                } catch (error) {
                    console.error(`Error fetching members for team ${team.id}: `, error);
                }
            }

            setTeamMembers(members);
        };

        if (teams.length > 0) {
            fetchTeamMembers();
        }
    }, [teams]);

    if (teams.length === 0) {
        return (
            <View className="flex items-center justify-center h-full">
                <Text className="text-2xl text-black">Chargement...</Text>
            </View>
        );
    }

    return (
        <ScrollView className="bg-white">
            <View className="flex flex-col p-5 gap-y-10">
                {teams.map((team) => (
                    <View key={team.id} className="flex flex-col gap-y-5">
                        {teamMembers[team.id] && (
                            <TeamCard
                                name={team.name}
                                members={{
                                    lead: teamMembers[team.id].lead,
                                    workers: teamMembers[team.id].workers,
                                }}
                            />
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Teams;