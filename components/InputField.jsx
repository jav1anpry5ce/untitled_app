import { View, Text, TextInput } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function InputField({ icon, name, type, callback }) {
  return (
    <View className="px-4 space-y-1 pb-4">
      <Text className="text-white text-[16px] font-semibold">{name}</Text>
      <View className="flex w-full flex-row space-x-2 items-center rounded bg-accent/50 p-2">
        {icon && <MaterialCommunityIcons name={icon} color="#fff" size={24} />}
        <TextInput
          className="w-full text-white text-[17px]"
          secureTextEntry={type === "password"}
          autoCapitalize="none"
          onChangeText={(text) => callback(text)}
          keyboardType={name === "Email" ? "email-address" : "text"}
        />
      </View>
    </View>
  );
}
