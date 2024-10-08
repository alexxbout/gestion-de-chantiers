import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./login";
const Stack = createNativeStackNavigator();

export default function Index() {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
    );
}
