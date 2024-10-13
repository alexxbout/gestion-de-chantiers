import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AlertCircleIcon, CalendarDaysIcon, CopyIcon, GlobeIcon, Icon } from "@/components/ui/icon";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef, createStaticNavigation, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Calendar from "./Calendar";
import Defects from "./Defects";
import Login from "./Login";
import Team from "./Team";
import Worksites from "./Worksites";

const navigationRef = createNavigationContainerRef<ParamListBase>();

function navigate(name: string, params?: object) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    } else {
        console.log("Navigation not ready");
    }
}

// Déclaration des onglets
const Tabs = createBottomTabNavigator({
    tabBarStyle: { position: "absolute" },
    tabBarBackground: () => <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />,
    screens: {
        worksites: {
            screen: Worksites,
            options: {
                title: "Chantiers",
                tabBarIcon: ({ focused, color, size }) => <Icon as={CopyIcon} color={focused ? "blue" : "gray"}  />,
            },
        },
        calendar: {
            screen: Calendar,
            options: {
                title: "Calendrier",
                tabBarIcon: ({ focused, color, size }) => <Icon as={CalendarDaysIcon} color={focused ? "blue" : "gray"}  />,
            },
        },
        team: {
            screen: Team,
            options: {
                title: "Équipe",
                tabBarIcon: ({ focused, color, size }) => <Icon as={GlobeIcon} color={focused ? "blue" : "gray"}  />,
            },
        },
        defects: {
            screen: Defects,
            options: {
                title: "Anomalies",
                tabBarIcon: ({ focused, color, size }) => <Icon as={AlertCircleIcon} color={focused ? "blue" : "gray"}  />,
            },
        },
    },
});

// Déclaration des routes du Stack
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
            }
        },
    },
});

const Navigation = createStaticNavigation(Stack);

export default function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [isNavigationReady, setIsNavigationReady] = useState(false);

    // Gérer la logique d'authentification
    useEffect(() => {
        console.log("Checking auth state...");
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log("Auth state changed");

            if (user) {
                console.log("User is logged in");
                setUser(user);
                if (isNavigationReady) {
                    navigate("tabs"); // Naviguer vers les Tabs d'abord
                }
            } else {
                console.log("No user logged in");
                setUser(null);
                if (isNavigationReady) {
                    navigate("login"); // Naviguer vers login si pas connecté
                }
            }
            setInitializing(false);
        });

        return () => unsubscribe();
    }, [isNavigationReady]);

    return (
        <GluestackUIProvider>
            {initializing ? (
                <ActivityIndicator size="large" color="#0000ff" />
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
}
