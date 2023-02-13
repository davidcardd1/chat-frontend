import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    addUnread: (state, { payload }) => {
      state.users.map((user) => {
        if (user[0] === payload) {
          console.log("ADD UNREAD HERE", user, payload);
          user[1][1] += 1;
        }
      });
    },
    resetUnreads: (state, { payload }) => {
      state.users.map((user) => {
        if (user[0] === payload) {
          console.log("RESET UNREAD HERE", user, payload);
          user[1][1] = 0;
        }
      });
    },
    resetUsers: (state) => {
      state.users = [];
    },
    statusChange: (state, { payload }) => {
      console.log(payload);
      state.users.map((user) => {
        if (user[0] === payload.sender) {
          console.log("ADD UNREAD HERE", user, payload);
          user[1][0] = payload.body;
        }
      });
    },
  },
  extraReducers: {},
});

export const { setUsers, addUnread, resetUnreads, resetUsers, statusChange } =
  usersSlice.actions;
export default usersSlice.reducer;
