import { AlertCircleIcon, CalendarDaysIcon, CircleIcon, CopyIcon, GlobeIcon, Icon } from "@/components/ui/icon";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import calendar from "./calendar";
import defects from "./defects";
import team from "./team";
import worksites from "./worksites";

const Tab = createBottomTabNavigator();

export default function () {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let icon;

                    switch (route.name) {
                        case "Chantiers":
                            icon = CopyIcon;
                            break;
                        case "Calendrier":
                            icon = CalendarDaysIcon;
                            break;
                        case "Équipe":
                            icon = GlobeIcon;
                            break;
                        case "Anomalies":
                            icon = AlertCircleIcon;
                            break;
                        default:
                            icon = CircleIcon;
                            break;
                    }

                    return <Icon as={icon} color={focused ? "blue" : "gray"} />;
                },
                tabBarLabel: ({ focused, color }) => {
                    return <Text style={{ color: focused ? "blue" : "gray" }}>{route.name}</Text>;
                },
                headerTitleAlign: "left",
                headerTitleStyle: {
                    color: "black",
                    fontSize: 30,
                    fontWeight: "600"
                },
                headerStyle: {
                    backgroundColor: "white",
                    borderWidth: 0,
                    borderBottomWidth: 0,
                }
            })}>
            <Tab.Screen name="Chantiers" component={worksites} />
            <Tab.Screen name="Calendrier" component={calendar} />
            <Tab.Screen name="Équipe" component={team} />
            <Tab.Screen name="Anomalies" component={defects} />
        </Tab.Navigator>
    );
}
