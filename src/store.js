import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import roomReducer from "./features/room/roomSlice";
import messagesReducer from "./features/messages/messagesSlice";
import usersReducer from "./features/users/usersSlice";
import { userApi } from "./services/userService";

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    messages: messagesReducer,
    users: usersReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
