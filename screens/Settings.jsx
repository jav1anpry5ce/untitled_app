import { View, Text } from "react-native";
import { logout } from "../store/features/authSlice";
import { IconButton } from "../components";
import { useDispatch } from "react-redux";

export default function Settings() {
  const dispatch = useDispatch();
  return (
    <View className="p-4 bg-primary h-full">
      <IconButton
        icon="logout"
        title="Logout"
        callback={() => dispatch(logout())}
      />
    </View>
  );
}
