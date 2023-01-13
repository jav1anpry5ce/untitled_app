import { createStackNavigator } from "@react-navigation/stack";
import { Login, Register } from "../screens";

const Stack = createStackNavigator();

export default function UnauthNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#082032",
          height: 100,
          shadowColor: "transparent",
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerStyle: {
            height: 40,
            backgroundColor: "#082032",
            shadowColor: "transparent",
          },
          headerLeft: null,
        }}
      />
    </Stack.Navigator>
  );
}
