import { Input, InputField } from "@/components/ui/input";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import specific methods
import React, { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../config/firebaseConfig"; // Import Firebase Auth instance

export default function () {
    // Define state with TypeScript types
    const [email, setEmail] = useState<string>(""); // Email must be a string
    const [password, setPassword] = useState<string>(""); // Password must be a string
    const [isLogin, setIsLogin] = useState<boolean>(true); // Boolean to toggle login/signup

    // Handle authentication actions
    const handleAuthAction = async () => {
        try {
            if (isLogin) {
                // Logging in a user
                const cred = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
                console.log(cred);

                Alert.alert("Logged in successfully");
            } else {
                // Registering a new user
                await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
                Alert.alert("User registered successfully");
            }
        } catch (error: any) {
            // Type 'error' as 'any' to access 'message'
            Alert.alert("Error:", error.message);
        }
    };

    return (
        <View className="flex items-center justify-center h-full p-5 bg-white">
            <Text className="text-4xl font-bold text-center">Bonjour 👋</Text>

            <Input variant="outline" size="xl" isDisabled={false} isInvalid={false} isReadOnly={false}>
                <InputField placeholder="Login" />
            </Input>

            <Input variant="outline" size="xl" isDisabled={false} isInvalid={false} isReadOnly={false}>
                <InputField placeholder="Mot de passe" />
            </Input>

            <Button title={isLogin ? "Login" : "Sign Up"} onPress={handleAuthAction} />

            <Text>
                {isLogin ? "Need an account? " : "Already have an account? "}
                <Text onPress={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Login"}</Text>
            </Text>
        </View>
    );
}
