import { Box } from "@/components/ui/box";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AlertCircleIcon, CalendarDaysIcon, CopyIcon, GlobeIcon, Icon } from "@/components/ui/icon";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import "@/global.css";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef, createStaticNavigation, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Calendar } from "./Calendar";
import { Defects } from "./Defects";
import { Login } from "./Login";
import { Team } from "./Team";
import { Worksites } from "./Worksites";

const navigationRef = createNavigationContainerRef<ParamListBase>();

const navigate = (name: string, params?: object) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    } else {
        console.log("Navigation not ready");
    }
};

const Tabs = createBottomTabNavigator({
    tabBarStyle: { position: "absolute" },
    tabBarBackground: () => <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />,
    tabBarOptions: {
        labelPosition: "below-icon",
    },
    screens: {
        worksites: {
            screen: Worksites,
            options: {
                title: "Chantiers",
                tabBarIcon: ({ focused, color, size }) => <Icon as={CopyIcon} color={focused ? "blue" : "gray"} />,
            },
        },
        calendar: {
            screen: Calendar,
            options: {
                title: "Calendrier",
                tabBarIcon: ({ focused, color, size }) => <Icon as={CalendarDaysIcon} color={focused ? "blue" : "gray"} />,
            },
        },
        team: {
            screen: Team,
            options: {
                title: "Équipe",
                tabBarIcon: ({ focused, color, size }) => <Icon as={GlobeIcon} color={focused ? "blue" : "gray"} />,
            },
        },
        defects: {
            screen: Defects,
            options: {
                title: "Anomalies",
                tabBarIcon: ({ focused, color, size }) => <Icon as={AlertCircleIcon} color={focused ? "blue" : "gray"} />,
            },
        },
    },
});

const Stack = createNativeStackNavigator({
    initialRouteName: "login",
    screens: {
        login: {
            screen: Login,
            options: {
                headerShown: false,
            },
        },
        tabs: {
            screen: Tabs,
            options: {
                headerShown: false,
            },
        },
    },
});

const Navigation = createStaticNavigation(Stack);

const App = () => {
    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [isNavigationReady, setIsNavigationReady] = useState(false);

    useEffect(() => {
        console.log("Checking auth state...");
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log("Auth state changed");

            if (user) {
                console.log("User is logged in");
                setUser(user);
                if (isNavigationReady) {
                    navigate("tabs");
                }
            } else {
                console.log("No user logged in");
                setUser(null);
                if (isNavigationReady) {
                    navigate("login");
                }
            }
            setInitializing(false);
        });

        return () => unsubscribe();
    }, [isNavigationReady, initializing]);

    return (
        <GluestackUIProvider>
            {initializing ? (
                <Box className="flex items-center justify-center w-screen h-screen">
                    <ActivityIndicator size="large" />
                </Box>
            ) : (
                <Navigation
                    ref={navigationRef}
                    onReady={() => {
                        console.log("Navigation is ready");
                        setIsNavigationReady(true);
                    }}
                />
            )}
        </GluestackUIProvider>
    );
};

export default App;