import { Box } from "@/components/ui/box";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Import specific methods
import React, { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { FIREBASE_AUTH } from "../config/firebaseConfig"; // Import Firebase Auth instance

export default function () {
    // Define state with TypeScript types
    const [email, setEmail] = useState<string>(""); // Email must be a string
    const [password, setPassword] = useState<string>(""); // Password must be a string
    const [isLogin, setIsLogin] = useState<boolean>(true); // Boolean to toggle login/signup

    // Show/hide password
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
    };

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
        <View className="flex items-center justify-center h-full p-10 bg-white gap-y-20">
            <Text className="text-4xl font-bold text-center">Bonjour 👋</Text>

            <Box className="flex flex-col items-center justify-center w-full gap-y-5">
                <Box className="flex flex-col w-full gap-y-2">
                    <Text className="text-gray-500">Email</Text>
                    <Input className="w-full" variant="outline" size="xl" isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <InputField placeholder="Email" />
                    </Input>
                </Box>

                <Box className="flex flex-col w-full gap-y-2">
                    <Text className="text-gray-500">Mot de passe</Text>
                    <Input className="w-full" variant="outline" size="xl" isDisabled={false} isInvalid={false} isReadOnly={false}>
                        <InputField type={showPassword ? "text" : "password"} placeholder="Mot de passe" />
                        <InputSlot className="pr-2" onPress={handleState}>
                            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} size="md" />
                        </InputSlot>
                    </Input>
                </Box>
            </Box>

            <Box className="flex flex-col w-full gap-y-5">
                <Pressable onPress={handleAuthAction} className="p-3 bg-black rounded-md">
                    <Text className="text-xl font-semibold text-center text-white">{isLogin ? "Connexion" : "S'enregistrer"}</Text>
                </Pressable>

                <Text className="text-center">
                    {isLogin ? "Vous n'avez pas de compte ? " : "Déjà un compte ? "}
                    <Text className="font-bold text-blue-600" onPress={() => setIsLogin(!isLogin)}>
                        {isLogin ? "S'enregistrer" : "Se connecter"}
                    </Text>
                </Text>
            </Box>
        </View>
    );
}
