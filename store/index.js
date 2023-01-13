import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import authSlice from "./features/authSlice";

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
