import { View, Text, Image, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { endpoints } from "../store/services/api";

export default function ProfileSection({ user, navigation }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [followers, setFollowers] = useState(user?.followers);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsFollowing(
        followers?.find((f) => f.user?.username === currentUser?.username)
      );
    }
  }, [followers]);

  useEffect(() => {
    setFollowers(user?.followers);
  }, [user]);

  const followUser = async () => {
    const response = await dispatch(
      endpoints.followUser.initiate({
        username: user.username,
        token,
      })
    );
    setFollowers(response.data.followers);
  };

  return (
    <View className="flex flex-col">
      <View className="flex flex-row items-center justify-between">
        <Image
          source={{ uri: user?.profile_photo }}
          className="aspect-square w-[75px] rounded-full object-cover"
        />
        <View className="flex grow flex-row items-center justify-evenly text-white">
          <View className="-space-y-1 text-center">
            <Text className="text-white text-[16px] text-center">
              {user?.reviews}
            </Text>
            <Text className="text-white text-[16px] font-semibold text-center">
              Reviews
            </Text>
          </View>
          <Pressable
            className="-space-y-1 text-center"
            onPress={() =>
              navigation.navigate("Followers", { username: user?.username })
            }
          >
            <Text className="text-white text-[16px] text-center">
              {followers?.length}
            </Text>
            <Text className="text-white text-[16px] font-semibold text-center">
              Followers
            </Text>
          </Pressable>
          <Pressable
            className="-space-y-1 text-center"
            onPress={() =>
              navigation.navigate("Following", { username: user?.username })
            }
          >
            <Text className="text-white text-[16px] text-center">
              {user?.following.length}
            </Text>
            <Text className="text-white text-[16px] font-semibold text-center">
              Following
            </Text>
          </Pressable>
        </View>
      </View>
      <View>
        <View className="flex flex-row items-center space-x-1 pt-2">
          <Text className="text-white text-[15px] font-semibold">
            {user?.name}
          </Text>
          <Text className="text-gray-400 text-[14px] font-semibold">
            {user?.pronouns}
          </Text>
        </View>
      </View>
      {currentUser?.username === user?.username ? (
        <Pressable
          className="mt-2 rounded bg-main p-2 font-medium text-white active:bg-main/80"
          onPress={() => navigation.navigate("Edit Profile")}
        >
          <Text className="text-white text-[16px] font-semibold text-center">
            Edit Profile
          </Text>
        </Pressable>
      ) : isFollowing ? (
        <Pressable
          className="w-[100%] mt-2 rounded bg-accent p-2 text-white active:bg-accent/80"
          onPress={followUser}
        >
          <Text className="text-white text-[16px] font-semibold text-center">
            Following
          </Text>
        </Pressable>
      ) : (
        <Pressable
          className="w-[100%] mt-2 rounded bg-main p-2 text-white active:bg-main/80"
          onPress={followUser}
        >
          <Text className="text-white text-[16px] font-semibold text-center">
            Follow
          </Text>
        </Pressable>
      )}
    </View>
  );
}
