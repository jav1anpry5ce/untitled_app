import { View, Text, FlatList } from "react-native";
import { useGetFollowingQuery, endpoints } from "../store/services/api";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FollowerCard } from "../components";

export default function Following({ navigation, route }) {
  const dispatch = useDispatch();
  const username = route?.params?.username;
  const { data, isLoading } = useGetFollowingQuery(username);
  const [following, setFollowing] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const { data } = await dispatch(endpoints.getFollowing.initiate(username));
    setFollowing(data);
    setRefreshing(false);
  };

  const onEndReached = async () => {
    if (following?.next) {
      const { data } = await dispatch(
        endpoints.getNextPage.initiate({ url: following.next })
      );
      setFollowing({
        ...following,
        results: [...following.results, ...data.results],
        next: data.next,
      });
    }
  };

  useEffect(() => {
    setFollowing(data);
  }, [data]);

  return (
    <FlatList
      className="bg-primary p-2"
      data={following?.results}
      renderItem={({ item }) => (
        <FollowerCard user={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item?.username}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
    />
  );
}
