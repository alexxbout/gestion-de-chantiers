import { Box } from "@/components/ui/box";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText } from "@/components/ui/form-control";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { FIREBASE_AUTH, db, findDocumentByField } from "@/firebase/api";
import { CollectionName, User } from "@/types/database";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";

const Login = () => {
    const router = useRouter();

    const { setUser } = useUser();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isInvalid, setInvalid] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isButtonDisabled = email.length === 0 || password.length === 0 || (!isLogin && name.length === 0);

    const handleState = () => {
        setShowPassword((showState) => !showState);
    };

    const handleAuthAction = async () => {
        try {
            setErrorMessage(null);
            setInvalid(false);

            let user: User | null = null;

            if (isLogin) {
                const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

                user = await findDocumentByField("email", userCredential.user.email, CollectionName.USER);
            } else {
                const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
                const remoteUser = userCredential.user;

                const usersSnapshot = await getDocs(collection(db, CollectionName.USER));
                const lastUserId = usersSnapshot.docs.length > 0 ? Math.max(...usersSnapshot.docs.map((doc) => doc.data().id)) : 0;
                const newUserId = lastUserId + 1;

                if (!remoteUser.email) {
                    throw new Error("Email is required");
                }

                user = {
                    id: newUserId,
                    role: "Equipier",
                    name: name,
                    email: remoteUser.email,
                    assignedChantiers: []
                };

                await addDoc(collection(db, CollectionName.USER), user);
            }

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user as User);

                console.log("User logged in: ", user);
            }

            router.replace("/(tabs)/worksites");
        } catch (error: any) {
            setErrorMessage(error.message);
            setInvalid(true);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
                <View className="flex flex-col items-center justify-center flex-1">
                    <Image className="flex-1 w-full" alt="login" source={{ uri: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />

                    <View className="flex flex-col items-center justify-center flex-1 w-full p-10 gap-y-5">
                        <Text className="text-3xl font-semibold">{isLogin ? "Connexion" : "S'enregistrer"}</Text>

                        {!isLogin && (
                            <FormControl className="flex flex-col items-center justify-center w-full gap-y-5" isInvalid={isInvalid}>
                                <Box className="flex flex-col w-full gap-y-2">
                                    <Text className="text-gray-500">Nom</Text>
                                    <Input className="w-full" variant="outline" size="xl">
                                        <InputField placeholder="Nom" onChangeText={(text) => setName(text)} />
                                    </Input>
                                </Box>
                            </FormControl>
                        )}

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

                            {isInvalid && (
                                <FormControlError>
                                    <FormControlErrorIcon as={AlertCircleIcon} />
                                    <FormControlErrorText>{errorMessage}</FormControlErrorText>
                                </FormControlError>
                            )}
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
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;
