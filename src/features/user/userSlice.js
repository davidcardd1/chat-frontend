import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./userActions";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  userInfo: {},
  userToken,
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
      state.userToken = payload.userToken;
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
  },
});

export const { logout, setCredentials } = userSlice.actions;
export default userSlice.reducer;
