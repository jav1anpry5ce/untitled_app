import { View, Text, Pressable, Image } from "react-native";
import React from "react";

export default function SearchResult({ navigation, user }) {
  const navigateToUser = (username) => {
    navigation.navigate("User", { username });
  };
  return (
    <Pressable
      className="flex items-center flex-row space-x-3 px-2 pb-1 pt-4"
      onPress={() => navigateToUser(user?.username)}
    >
      <Image
        source={{
          uri: user?.profile_photo,
        }}
        className="aspect-square rounded-full w-[45px] object-cover"
      />
      <View>
        <Text className="text-[16px] font-semibold text-white">
          {user?.username}
        </Text>
        <Text className="text-[12px] text-gray-300">{user?.name}</Text>
      </View>
    </Pressable>
  );
}
