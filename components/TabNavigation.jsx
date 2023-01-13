import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import { Home, Search, Upload, Discover, Profile, User } from "../screens";
import { Text, View, Image, Pressable } from "react-native";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

export default function TabNavigation({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarButton: ["User"].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
        tabBarActiveTintColor: "#FF4C29",
        tabBarInactiveTintColor: "#fff",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#2C394B",
          borderTopWidth: 0,
        },
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#082032",
          height: 100,
          shadowColor: "transparent",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "",
          headerRight: () => (
            <View className="px-2 flex flex-row gap-2 items-center">
              <Pressable onPress={() => navigation.navigate("Notifications")}>
                <MaterialCommunityIcons name="bell" color="#fff" size={30} />
              </Pressable>
              <MaterialCommunityIcons name="message" color="#fff" size={30} />
            </View>
          ),
          headerLeft: () => (
            <Text className="text-white text-lg font-semibold px-2 italic">
              Untitled Review App
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={36} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={36} />
          ),
          headerTitle: () => null,
          headerStyle: {
            backgroundColor: "#082032",
            height: 60,
            shadowColor: "transparent",
          },
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="cloud-upload" color={color} size={36} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="planet" color={color} size={36} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View
              className={`border-2 rounded-full ${
                color === "#fff" ? "border-transparent" : "border-main"
              }`}
            >
              <Image
                source={{
                  uri: user?.profile_photo,
                }}
                className="w-[36px] rounded-full aspect-square"
              />
            </View>
          ),
          headerTitle: () => null,
          headerLeft: () => (
            <Text className="text-white pl-2 text-[19px] font-semibold">
              {user?.username}
            </Text>
          ),
          headerRight: () => (
            <Pressable
              className="pr-2 flex flex-row gap-2 items-center"
              onPress={() => navigation.navigate("Settings")}
            >
              <MaterialCommunityIcons name="cog" color="#fff" size={28} />
            </Pressable>
          ),
        }}
      />
      {/* <Tab.Screen
        options={({ route }) => {
          const username = route?.params?.username;
          return {
            headerTitle: () => (
              <Text className="text-white pl-2 text-[19px] font-semibold">
                {username}
              </Text>
            ),
            headerLeft: () => (
              <Pressable
                className="pl-2 flex flex-row gap-2 items-center"
                onPress={() => navigation.goBack()}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  color="#fff"
                  size={28}
                />
              </Pressable>
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
        name="User"
        component={User}
      /> */}
    </Tab.Navigator>
  );
}
