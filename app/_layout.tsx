import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef, createStaticNavigation, ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
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

const Tabs = createBottomTabNavigator({
    initialRouteName: "login",
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
        login: {
            screen: Login,
            options: {
                headerShown: false,
            },
        },
    },
});

const Stack = createNativeStackNavigator({
    screens: {
        tabs: {
            screen: Tabs,
        },
    },
});

const Navigation = createStaticNavigation(Stack);

export default function App() {
    const [initializing, setInitializing] = useState(true);
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
                    navigate("worksites");
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
