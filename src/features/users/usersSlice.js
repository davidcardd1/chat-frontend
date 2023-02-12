import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      payload.forEach((element) => {
        element.push(0);
        state.users.push(element);
      });
    },
    addUnread: (state, { payload }) => {
      state.users.map((user) => {
        if (user[0] == payload) {
          console.log("ADD UNREAD HERE", user, payload);
          user[2] += 1;
        }
      });
    },
  },
  extraReducers: {},
});

export const { setUsers, addUnread } = usersSlice.actions;
export default usersSlice.reducer;
