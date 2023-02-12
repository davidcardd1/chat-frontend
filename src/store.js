import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import roomReducer from "./features/room/roomSlice";
import messagesReducer from "./features/messages/messagesSlice";
import { userApi } from "./services/userService";

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    messages: messagesReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
