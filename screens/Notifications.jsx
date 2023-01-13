import {
  RefreshControl,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetNotificationsQuery, endpoints } from "../store/services/api";
import { Notification } from "../components";

export default function Notifications({ navigation }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { data, isFetching, error } = useGetNotificationsQuery(token);
  const [refreshing, setRefreshing] = React.useState(false);
  const [notifications, setNotifications] = React.useState(null);

  const onRefresh = async () => {
    setRefreshing(true);
    const { data } = await dispatch(endpoints.getNotifications.initiate(token));
    setNotifications(data);
    setRefreshing(false);
  };

  const onEndReached = async () => {
    if (notifications?.next) {
      dispatch(
        endpoints.getNextPage.initiate({ url: notifications.next, token })
      )
        .then((res) => {
          setNotifications({
            ...notifications,
            results: [...notifications.results, ...res.data.results],
            next: res.data.next,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderFooter = () => {
    if (!notifications?.next) return <View className="pb-8" />;
    return (
      <View className="flex flex-row justify-center items-center py-4">
        <ActivityIndicator color="#fff" />
      </View>
    );
  };

  useEffect(() => {
    setNotifications(data);
  }, [data]);

  return (
    <FlatList
      className="bg-primary"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#fff"
        />
      }
      data={notifications && notifications?.results}
      renderItem={({ item }) => (
        <Notification notification={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={onEndReached}
      ListFooterComponent={renderFooter}
      initialNumToRender={20}
    />
  );
}
