import { View, Pressable, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { endpoints } from "../store/services/api";

export default function PostActions({ postId, likes }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);
  const [numberOfLikes, setNumberOfLikes] = useState(likes?.length || 0);
  const [liked, setLiked] = useState(false);

  const likePost = async () => {
    const response = await dispatch(
      endpoints.likePost.initiate({
        postId,
        token,
      })
    );
    setLiked(
      response.data.likes?.find(
        (l) => l.user?.username === currentUser?.username
      )
    );
    setNumberOfLikes(response.data.likes?.length);
  };

  useEffect(() => {
    if (currentUser) {
      setLiked(likes?.find((l) => l.user?.username === currentUser?.username));
    }
  }, [likes]);

  return (
    <View>
      <View className="px-2 pt-2 flex flex-row items-center justify-between space-x-6">
        <View className="flex flex-row space-x-5">
          <Pressable onPress={likePost}>
            <MaterialCommunityIcons
              name={liked ? "thumb-up" : "thumb-up-outline"}
              size={30}
              color={liked ? "#FF4C29" : "white"}
            />
          </Pressable>
          <MaterialCommunityIcons
            name="thumb-down-outline"
            size={30}
            color="white"
          />
          <Pressable className="rotate-[-45deg]">
            <MaterialCommunityIcons name="send" size={30} color="white" />
          </Pressable>
        </View>
        <View className="flex flex-row space-x-5">
          <MaterialCommunityIcons
            name="content-save-outline"
            size={30}
            color="white"
          />
          <MaterialCommunityIcons name="feather" size={30} color="white" />
          <Pressable>
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={30}
              color="white"
            />
          </Pressable>
        </View>
      </View>
      <Text className="text-white text-[16px] px-2 py-2">
        {numberOfLikes} likes
      </Text>
    </View>
  );
}
