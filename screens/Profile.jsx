import { ScrollView, RefreshControl } from "react-native";
import { ProfileSection } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../store/features/authSlice";
import { useState, useCallback } from "react";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(getCurrentUser());
    setRefreshing(false);
  }, [user]);

  return (
    <ScrollView
      className="bg-primary p-2"
      refreshControl={
        <RefreshControl
          tintColor={"#fff"}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <ProfileSection user={user} navigation={navigation} />
    </ScrollView>
  );
}
