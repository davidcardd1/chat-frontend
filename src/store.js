import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import roomReducer from "./features/room/roomSlice";
import { roomApi } from "./features/room/roomService";
import { userApi } from "./features/user/userService";

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomApi.middleware, userApi.middleware),
});
