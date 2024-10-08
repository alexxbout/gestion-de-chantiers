
// AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './Login'; // Adjust the path as necessary
const Stack = createNativeStackNavigator();

export default function Index(){
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={AuthScreen} />
        </Stack.Navigator>
    );
};
