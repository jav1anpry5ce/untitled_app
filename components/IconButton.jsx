import { View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";

export default function IconButton({ icon, title, callback }) {
  return (
    <Pressable
      onPress={callback}
      className={`relative flex flex-row items-center w-full rounded  p-2 text-white ${
        title === "Logout"
          ? "bg-main active:bg-main/80"
          : "bg-secondary active:bg-secondary/80"
      }"}`}
    >
      <MaterialCommunityIcons name={icon} color="#fff" size={24} />
      <Text className="absolute left-[45%] translate-x-[-50%] text-[16px] text-white font-semibold">
        {title}
      </Text>
    </Pressable>
  );
}
