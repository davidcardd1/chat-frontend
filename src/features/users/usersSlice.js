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
        element.push(0); // TODO: bring number from database
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
    resetUnreads: (state, { payload }) => {
      state.users.map((user) => {
        if (user[0] == payload) {
          console.log("RESET UNREAD HERE", user, payload);
          user[2] = 0;
        }
      });
    },
  },
  extraReducers: {},
});

export const { setUsers, addUnread, resetUnreads } = usersSlice.actions;
export default usersSlice.reducer;
