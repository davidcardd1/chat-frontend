import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, userStatus } from "./userActions";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const userCookie = cookies.get("userSession")
  ? cookies.get("userSession")
  : null;

const initialState = {
  userInfo: { sessionID: userCookie },
  error: null,
  stompClient: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = {};
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    //login
    [userLogin.pending]: (state) => {
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // register
    [registerUser.pending]: (state) => {
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.success = true;
      state.userInfo = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [userStatus.pending]: (state) => {
      state.error = null;
    },
    [userStatus.fulfilled]: (state, { payload }) => {
      state.success = true;
      state.userInfo = payload;
    },
    [userStatus.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { logout, setCredentials } = userSlice.actions;
export default userSlice.reducer;
