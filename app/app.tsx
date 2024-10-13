import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { createStaticNavigation } from "@react-navigation/native";
import Calendar from "./Calendar";
import Defects from "./Defects";
import Team from "./Team";
import Worksites from "./Worksites";

// const Tab = createBottomTabNavigator();

const Tabs = createBottomTabNavigator({
    initialRouteName: "worksites",
    screens: {
        worksites: {
            screen: Worksites,
            options: {
                title: "Chantiers",
            },
        },
        calendar: {
            screen: Calendar,
            options: {
                title: "Calendrier",
            },
        },
        team: {
            screen: Team,
            options: {
                title: "Équipe",
            },
        },
        defects: {
            screen: Defects,
            options: {
                title: "Anomalies",
            },
        },
    },
});

const Navigation = createStaticNavigation(Tabs);

export default function App() {
    return <GluestackUIProvider mode="light" mode="light"><Navigation /></GluestackUIProvider>;
    // return (
    //     <Tab.Navigator
    //         screenOptions={({ route }) => ({
    //             tabBarIcon: ({ focused }) => {
    //                 let icon;

    //                 switch (route.name) {
    //                     case "Chantiers":
    //                         icon = CopyIcon;
    //                         break;
    //                     case "Calendrier":
    //                         icon = CalendarDaysIcon;
    //                         break;
    //                     case "Équipe":
    //                         icon = GlobeIcon;
    //                         break;
    //                     case "Anomalies":
    //                         icon = AlertCircleIcon;
    //                         break;
    //                     default:
    //                         icon = CircleIcon;
    //                         break;
    //                 }

    //                 return <Icon as={icon} color={focused ? "blue" : "gray"} />;
    //             },
    //             tabBarLabel: ({ focused, color }) => {
    //                 return <Text style={{ color: focused ? "blue" : "gray" }}>{route.name}</Text>;
    //             },
    //             headerTitleStyle: {
    //                 color: "black",
    //                 fontSize: 30,
    //                 fontWeight: "600"
    //             },
    //             headerStyle: {
    //                 backgroundColor: "white",
    //                 borderWidth: 0,
    //                 borderBottomWidth: 0,
    //             }
    //         })}>
    //         <Tab.Screen name="Chantiers" component={Worksites} />
    //         <Tab.Screen name="Calendrier" component={Calendar} />
    //         <Tab.Screen name="Équipe" component={Team} />
    //         <Tab.Screen name="Anomalies" component={Defects} />
    //     </Tab.Navigator>
    // );
}
