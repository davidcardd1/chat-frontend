import { createSlice } from "@reduxjs/toolkit";
import { registerRoom } from "./roomActions";

const initialState = {
  roomInfo: {},
  error: null,
  success: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomCredentials: (state, { payload }) => {
      state.roomInfo = payload;
    },
  },
  extraReducers: {
    [registerRoom.pending]: (state) => {
      state.error = null;
    },
    [registerRoom.fulfilled]: (state, { payload }) => {
      state.success = true;
      state.roomInfo = payload;
    },
    [registerRoom.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setRoomCredentials } = roomSlice.actions;
export default roomSlice.reducer;
