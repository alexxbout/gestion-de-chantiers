import { CalendarDaysIcon, CopyIcon, GlobeIcon, Icon, SettingsIcon } from "@/components/ui/icon";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

const TabLayout = () => {
    return (
        <Tabs
            initialRouteName="worksites"
            screenOptions={{
                tabBarStyle: { position: "absolute" },
                tabBarBackground: () => <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />,
                tabBarActiveTintColor: "blue",
                tabBarLabelPosition: "below-icon",
            }}>
            <Tabs.Screen
                name="worksites"
                options={{
                    title: "Chantiers",
                    tabBarIcon: ({ focused, color, size }) => <Icon as={CopyIcon} color={focused ? "blue" : "gray"} />,
                }}
            />
            <Tabs.Screen
                name="calendar"
                options={{
                    title: "Calendrier",
                    tabBarIcon: ({ focused, color, size }) => <Icon as={CalendarDaysIcon} color={focused ? "blue" : "gray"} />,
                }}
            />
            <Tabs.Screen
                name="team"
                options={{
                    title: "Équipe",
                    tabBarIcon: ({ focused, color, size }) => <Icon as={GlobeIcon} color={focused ? "blue" : "gray"} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Réglages",
                    tabBarIcon: ({ focused, color, size }) => <Icon as={SettingsIcon} color={focused ? "blue" : "gray"} />,
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
