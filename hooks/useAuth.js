import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      setToken(token);
    });
  }, [token]);

  const login = async (data) => {
    axios
      .post("http://10.0.0.233:8000/api/login/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        AsyncStorage.setItem("token", data.token).then(() => {
          setIsAuth(true);
        });
      });
  };

  const register = async (data) => {
    axios
      .post("http://10.0.0.233:8000/api/register/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {});
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("http://10.0.0.233:8000/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      setIsAuth(false);
      setUser(null);
    }
  };

  const logout = async () => {
    const res = await axios.post(
      "http://10.0.0.233:8000/api/logout/",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (res.status === 200) {
      AsyncStorage.removeItem("token").then(() => {
        setIsAuth(false);
        setUser(null);
      });
    }
  };

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuth) getCurrentUser();
  }, [isAuth]);

  return { user, token, isAuth, login, register, logout };
}
