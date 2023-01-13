import StackNavigation from "./components/StackNavigation";
import UnauthNavigation from "./components/UnauthNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsAuth,
  getCurrentUser,
  setToken,
} from "./store/features/authSlice";

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (auth.isAuth) {
      dispatch(getCurrentUser());
    }
  }, [auth.isAuth]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(setIsAuth(true));
        dispatch(setToken(token));
      }
      setIsReady(true);
    };
    checkAuth();
  }, [auth.isAuth]);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (isReady) {
    if (auth.isAuth) {
      return (
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        <UnauthNavigation />
      </NavigationContainer>
    );
  }
}
