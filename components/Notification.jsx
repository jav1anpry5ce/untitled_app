import { View, Text, Image, Pressable } from "react-native";
import React from "react";

export default function Notification({ notification, navigation }) {
  const navigateToUser = (username) => {
    navigation.navigate("User", { username });
  };

  return (
    <View className="flex flex-row items-center space-x-2 p-2">
      <Pressable onPress={() => navigateToUser(notification?.user.username)}>
        <Image
          source={{
            uri: "http://10.0.0.233:8000/" + notification?.user.profile_photo,
          }}
          className="w-[40px] aspect-square rounded-full"
        />
      </Pressable>
      <Text className="text-white text-[14px] font-medium max-w-[90%]">
        {notification?.message}
      </Text>
    </View>
  );
}
