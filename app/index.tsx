import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
const Stack = createNativeStackNavigator();

export default function Index() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
}
