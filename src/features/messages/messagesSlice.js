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
    resetMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: {},
});

export const { addMessage, setMessages, resetMessages } = messageSlice.actions;
export default messageSlice.reducer;
