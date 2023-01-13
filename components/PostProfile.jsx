import { View, Text, Image, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

export default function PostProfile({ user, navigation }) {
  const navigateToUser = (username) => {
    navigation.navigate("User", { username });
  };

  return (
    <View className="flex flex-row items-center justify-between gap-2 px-2 mb-2">
      <Pressable
        onPress={() => navigateToUser(user?.username)}
        className="flex flex-row items-center space-x-2"
      >
        <Image
          source={{
            uri: user?.profile_photo,
          }}
          className="aspect-square rounded-full object-cover w-[32px]"
        />
        <Text className="text-white">{user?.username}</Text>
      </Pressable>
      <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
    </View>
  );
}
