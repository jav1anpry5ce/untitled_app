import { ScrollView, View, RefreshControl } from "react-native";
import { useGetUserQuery, endpoints } from "../store/services/api";
import { ProfileSection } from "../components";
import { SkeletonLoading } from "../components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function User({ route, navigation }) {
  const dispatch = useDispatch();
  const username = route.params.username;
  const [user, setUser] = useState(null);
  const { data, isLoading } = useGetUserQuery(username);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const { data } = await dispatch(endpoints.getUser.initiate(username));
    setUser(data);
    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUser(null);
    });
    return unsubscribe;
  }, [navigation]);

  if (isLoading) {
    return <SkeletonLoading />;
  }
  return (
    <ScrollView
      className="bg-primary px-2"
      refreshControl={
        <RefreshControl
          tintColor="#fff"
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <ProfileSection
        user={user ? user : data}
        route={route}
        navigation={navigation}
      />
    </ScrollView>
  );
}
