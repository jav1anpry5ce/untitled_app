import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://10.0.0.233:8000/api/login/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await AsyncStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://10.0.0.233:8000/api/register/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.get("http://10.0.0.233:8000/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      await AsyncStorage.removeItem("token");
      return null;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const token = await AsyncStorage.getItem("token");
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
  await AsyncStorage.removeItem("token");
  return res.data;
});

const initialState = {
  user: null,
  isAuth: false,
  token: null,
  errors: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isAuth = true;
      state.errors = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.errors = action.payload;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    // builder.addCase(getCurrentUser.rejected, (state, action) => {
    //   state.user = null;
    //   state.isAuth = false;
    //   state.token = null;
    // });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = null;
      state.isAuth = false;
      state.token = null;
    });
  },
});

export const { setUser, setIsAuth, setToken } = authSlice.actions;
export default authSlice.reducer;
