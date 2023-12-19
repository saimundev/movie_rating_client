import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import authSlice from "./features/authSlice";
import { moviesApi } from "./api/moviesApi";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, moviesApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
