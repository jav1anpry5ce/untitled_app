import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TabNavigation from "./TabNavigation";
import { EditProfile, Notifications, Settings, User } from "../screens";
import Icon from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={({ route, navigation }) => ({
        headerStyle: {
          backgroundColor: "#082032",
          height: 100,
          shadowColor: "transparent",
        },
        headerTintColor: "#fff",
        headerTitle: route.name,
        headerLeft: () => (
          <Pressable
            className="pl-2 flex flex-row gap-2 items-center"
            onPress={() => navigation.goBack()}
          >
            {Platform.OS === "ios" ? (
              <Icon name="chevron-back" size={28} color="#fff" />
            ) : (
              <MaterialCommunityIcons
                name="arrow-left"
                color="#fff"
                size={28}
              />
            )}
          </Pressable>
        ),
      })}
    >
      <Stack.Screen
        name="Main"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="User"
        component={User}
        options={({ route, navigation }) => {
          const username = route?.params?.username;
          return {
            headerTitle: () => (
              <Text className="text-white pl-2 text-[19px] font-semibold">
                {username}
              </Text>
            ),
            headerRight: () => (
              <Pressable
                className="pr-2 flex flex-row gap-2 items-center"
                onPress={() => navigation.navigate("Settings")}
              >
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  color="#fff"
                  size={28}
                />
              </Pressable>
            ),
          };
        }}
      />
      <Stack.Screen name="Edit Profile" component={EditProfile} />
    </Stack.Navigator>
  );
}
