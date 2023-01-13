import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { InputField } from "../components";
import { useState } from "react";
import { login } from "../store/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import * as AppleAuthentication from "expo-apple-authentication";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.auth.errors);

  const handleLogin = () => {
    const data = {
      username,
      password,
    };
    dispatch(login(data));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="h-full flex items-center justify-center bg-primary px-4">
        {errors?.error && (
          <Text className="text-main text-[16px]">{errors.error}</Text>
        )}
        <InputField name="Username" icon="account" callback={setUsername} />
        <InputField
          name="Password"
          icon="lastpass"
          type="password"
          callback={setPassword}
        />
        <View className="flex flex-row items-center w-full space-x-2">
          <Pressable
            className="grow rounded bg-main p-2 active:bg-main/80"
            onPress={handleLogin}
          >
            <Text className="text-white text-center font-semibold text-[17px]">
              Login
            </Text>
          </Pressable>
          {Platform.OS === "ios" && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={5}
              style={{ width: 160, height: 39 }}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  console.log(credential);
                  // signed in
                } catch (e) {
                  if (e.code === "ERR_CANCELED") {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            />
          )}
        </View>
        <Pressable
          className="mt-2"
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="text-white text-[16px]">
            Don&apos;t have an account? Create one
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
