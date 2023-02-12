import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:9090";

export const getUsers = createAsyncThunk(
  "users/get",
  async ({ sessionID }, { rejectWithValue }) => {
    try {
      console.log("GET USERS: ", sessionID);
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
