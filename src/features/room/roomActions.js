import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:9090";

export const registerRoom = createAsyncThunk(
  "chatroom/new",
  async (roomName, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/chatroom/new` + "?roomName=" + roomName
      );
      return data;
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

export const getRoom = createAsyncThunk();
