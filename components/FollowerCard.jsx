import { View, Text, Pressable, Image } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function FollowerCard({ user, navigation, username }) {
  const currentUser = useSelector((state) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsFollowing(
        currentUser?.following?.find((f) => f?.user.username === user?.username)
      );
    }
  }, [user]);

  return (
    <View className="flex items-center justify-between flex-row mb-3">
      <Pressable
        className="flex flex-row items-center gap-2"
        onPress={() =>
          navigation.navigate("User", {
            username: user?.username,
          })
        }
      >
        <Image
          source={{ uri: user?.profile_photo }}
          className="aspect-square rounded-full object-cover w-[40px]"
        />
        <View>
          <Text className="text-white text-[16px]">{user?.username}</Text>
          <Text className="text-xs text-gray-400">{user?.name}</Text>
        </View>
      </Pressable>
      {username === currentUser?.username ? (
        <Pressable className="rounded bg-secondary p-2">
          <Text className="text-white">Remove</Text>
        </Pressable>
      ) : (
        <Pressable className="rounded bg-secondary p-2">
          {isFollowing ? (
            <Text className="text-white text-xs">Following</Text>
          ) : currentUser?.username === user?.username ? (
            <Text className="text-white text-xs">Edit Profile</Text>
          ) : (
            <Text className="text-white text-xs">Follow</Text>
          )}
        </Pressable>
      )}
    </View>
  );
}
