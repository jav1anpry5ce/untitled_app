import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import { useGetFollowersQuery, endpoints } from "../store/services/api";
import { FollowerCard } from "../components";
import { useDispatch } from "react-redux";

export default function Followers({ route, navigation }) {
  const dispatch = useDispatch();
  const username = route?.params?.username;
  const { data, isLoading } = useGetFollowersQuery(username);
  const [followers, setFollowers] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const { data } = await dispatch(endpoints.getFollowers.initiate(username));
    setFollowers(data);
    setRefreshing(false);
  };

  const onEndReached = async () => {
    if (followers?.next) {
      const { data } = await dispatch(
        endpoints.getNextPage.initiate({ url: followers.next })
      );
      setFollowers({
        ...followers,
        results: [...followers.results, ...data.results],
        next: data.next,
      });
    }
  };

  useEffect(() => {
    setFollowers(data);
  }, [data]);

  return (
    <FlatList
      className="bg-primary p-2"
      data={followers?.results}
      renderItem={({ item }) => (
        <FollowerCard user={item} navigation={navigation} username={username} />
      )}
      keyExtractor={(item) => item?.username}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
    />
  );
}
