import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  error: null,
  success: false,
};

export const usersRoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setUsersRoom: (state, { payload }) => {
      state.users = payload;
    },
  },
  extraReducers: {},
});

export const { setUsersRoom } = usersRoomSlice.actions;
export default usersRoomSlice.reducer;
