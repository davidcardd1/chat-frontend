import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
  },
  extraReducers: {},
});

export const { addMessage, setMessages } = messageSlice.actions;
export default messageSlice.reducer;
