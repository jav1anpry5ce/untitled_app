import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import { InputField } from "../components";
import { useState } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { useDispatch } from "react-redux";
import { register } from "../store/features/authSlice";

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = () => {
    const data = {
      email,
      username,
      name,
      password,
      confirmPassword,
    };
    dispatch(register(data));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="h-full flex items-center justify-center bg-primary px-4">
        <InputField name="Email" icon="email" callback={setEmail} />
        <InputField name="Username" icon="account" callback={setUsername} />
        <InputField name="Name" icon="account" callback={setName} />
        <InputField
          name="Password"
          icon="lastpass"
          type="password"
          callback={setPassword}
        />
        <InputField
          name="Confirm Password"
          icon="lastpass"
          type="password"
          callback={setConfirmPassword}
        />
        <View className="flex flex-row items-center w-full space-x-2">
          <Pressable
            className="rounded grow bg-main p-2 active:bg-main/80"
            onPress={registerUser}
          >
            <Text className="text-white text-center font-semibold text-[17px]">
              Register
            </Text>
          </Pressable>
          {Platform.OS === "ios" && (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP
              }
              buttonStyle={
                AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={5}
              style={{ width: 160, height: 39, marginTop: 0 }}
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
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-white text-[16px]">
            Already have an account? Login
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
