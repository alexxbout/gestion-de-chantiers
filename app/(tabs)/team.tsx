import TeamCard from "@/components/custom/team";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useUser } from "@/context/UserContext";
import { findDocumentById, getAllDocuments } from "@/firebase/api";
import { CollectionName, Team, User } from "@/types/database";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Teams = () => {
    const { user } = useUser();

    if (user?.role !== "Responsable") {
        return (
            <Text className="p-5">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</Text>
        );
    }

    const [teams, setTeams] = useState<Team[]>([]);
    const [teamMembers, setTeamMembers] = useState<{ [key: number]: { lead: User; workers: User[] } }>({});
    const [isLoadingTeams, setIsLoadingTeams] = useState(true); // Indicateur de chargement des équipes
    const [isLoadingMembers, setIsLoadingMembers] = useState(false); // Indicateur de chargement des membres

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                setIsLoadingTeams(true);
                const fetchedTeams = await getAllDocuments<Team>(CollectionName.TEAM);
                setTeams(fetchedTeams);
            } catch (error) {
                console.error("Error fetching teams: ", error);
            } finally {
                setIsLoadingTeams(false);
            }
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            const members: { [key: number]: { lead: User; workers: User[] } } = {};

            try {
                setIsLoadingMembers(true);
                for (const team of teams) {
                    const lead = await findDocumentById(team.members.lead, CollectionName.USER);
                    const workers = await Promise.all(team.members.workers.map((workerId) => findDocumentById(workerId, CollectionName.USER)));

                    members[team.id] = {
                        lead: lead as User,
                        workers: workers as User[],
                    };
                }
                setTeamMembers(members);
            } catch (error) {
                console.error("Error fetching team members: ", error);
            } finally {
                setIsLoadingMembers(false);
            }
        };

        if (teams.length > 0) {
            fetchTeamMembers();
        }
    }, [teams]);

    const isLoading = isLoadingTeams || isLoadingMembers;

    return (
        <ScrollView className="bg-white">
            <View className="flex flex-col p-5 gap-y-10">
                {isLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                          <View key={index} className="p-4 rounded-md bg-background-100">
                              <Skeleton className="w-1/2 h-8 mb-4" />
                              <Skeleton className="w-1/3 h-6 mb-2" />
                              <Skeleton className="w-2/3 h-6 mb-2" />
                          </View>
                      ))
                    : teams.map((team) => (
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
