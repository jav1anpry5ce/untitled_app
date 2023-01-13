import { RefreshControl, FlatList } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { Post } from "../components";
import { useGetPostsQuery, endpoints } from "../store/services/api";
import { useSelector, useDispatch } from "react-redux";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const [posts, setPosts] = useState(null);
  const { data, error, isLoading } = useGetPostsQuery(token);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const { data } = await dispatch(endpoints.getPosts.initiate(token));
    setPosts(data);
    setRefreshing(false);
  }, []);

  const onEndReached = useCallback(async () => {
    if (posts?.next) {
      dispatch(endpoints.getNextPage.initiate({ url: posts.next, token }))
        .then((res) => {
          setPosts({
            ...posts,
            results: [...posts.results, ...res.data.results],
            next: res.data.next,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  return (
    <FlatList
      className="bg-primary pt-2"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={"#fff"}
        />
      }
      data={posts?.results}
      renderItem={({ item }) => <Post data={item} navigation={navigation} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={onEndReached}
    />
  );
}
