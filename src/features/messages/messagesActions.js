import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:9090";

export const sendMessage = createAsyncThunk(
  "messages/new",
  async ({ sender, receiver, body }, { rejectWithValue }) => {
    try {
      stompClient.send(
        "/app/chat/" + receiver,
        {},
        JSON.stringify({
          body: body,
          sender: sender,
          receiver: receiver,
        })
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
