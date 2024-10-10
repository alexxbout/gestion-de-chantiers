import { Box } from "@/components/ui/box";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import { RootStackParamList } from "@/types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

type LoginNavigationProp = StackNavigationProp<RootStackParamList, "login">;

export default function () {
    const navigation = useNavigation<LoginNavigationProp>();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isInvalid, setInvalid] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isButtonDisabled = email.length === 0 || password.length === 0;

    const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
    };

    const handleAuthAction = async () => {
        try {
            setErrorMessage(null);
            setInvalid(false);
            if (isLogin) {
                await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
                console.log("Login successful");
            } else {
                await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
                console.log("Registration successful");
            }

            navigation.navigate("app");
        } catch (error: any) {
            setErrorMessage(error.message);
            setInvalid(true);
            console.error("Error during {}:{}", isLogin ? "authentication" : "registration", error.message);
        }
    };

    return (
        <View className="flex items-center justify-center h-full p-10 bg-white gap-y-20">
            <Text className="text-4xl font-bold text-center">Bonjour 👋</Text>

            <FormControl className="flex flex-col items-center justify-center w-full gap-y-5" isInvalid={isInvalid}>
                <Box className="flex flex-col w-full gap-y-2">
                    <Text className="text-gray-500">Email</Text>
                    <Input className="w-full" variant="outline" size="xl">
                        <InputField placeholder="Email" onChangeText={(text) => setEmail(text)} />
                    </Input>
                </Box>
                <Box className="flex flex-col w-full gap-y-2">
                    <Text className="text-gray-500">Mot de passe</Text>
                    <Input className="w-full" variant="outline" size="xl">
                        <InputField type={showPassword ? "text" : "password"} placeholder="Mot de passe" onChangeText={(text) => setPassword(text)} />
                        <InputSlot className="pr-2" onPress={handleState}>
                            <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} size="md" />
                        </InputSlot>
                    </Input>
                </Box>

                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>{errorMessage}</FormControlErrorText>
                </FormControlError>
            </FormControl>

            <Box className="flex flex-col w-full gap-y-5">
                <Pressable onPress={handleAuthAction} className={isButtonDisabled ? "p-3 bg-gray-300 rounded-md" : "p-3 bg-black rounded-md"} disabled={isButtonDisabled}>
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
