import { View, Text, Image } from "react-native";
import PostProfile from "./PostProfile";
import PostActions from "./PostActions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Post({ data, navigation }) {
  return (
    <View className="flex pb-4">
      <PostProfile user={data?.user} navigation={navigation} />
      <Image
        source={{
          uri: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
        }}
        className="aspect-video w-full object-cover object-bottom"
      />
      <View className="flex flex-row items-center justify-between px-2 pt-2">
        <Text className="text-white text-lg font-bold">{data?.title}</Text>
        <View className="text-white flex flex-row items-center">
          <MaterialCommunityIcons
            name="fruit-grapes"
            size={36}
            color="#FF4C29"
          />
          <Text className="text-white font-bold">{data?.rating}</Text>
        </View>
      </View>
      <Text className="text-white text-[16px] px-2">
        {data?.content?.written}
      </Text>
      <PostActions postId={data?.id} likes={data?.likes} />
    </View>
  );
}
