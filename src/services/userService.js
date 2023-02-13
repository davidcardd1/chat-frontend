import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.userToken;
      if (token) {
        // include token in req header
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["messages", "users"],
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (sessionID) => ({
        url: `/user?sessionID=${sessionID}`,
        method: "GET",
      }),
    }),
    getRoomDetails: builder.query({
      query: (roomID) => ({
        url: `/chatroom?roomID=${roomID}`,
        method: "GET",
      }),
    }),
    getMessages: builder.query({
      query: (args) => {
        const { user, sessionID } = args;
        return {
          url: `/messages/${user}`,
          method: "GET",
          params: { sessionID },
        };
      },
      providesTags: ["messages"],
    }),
    getUsers: builder.query({
      query: (args) => {
        const { roomID, sessionID } = args;
        console.log("REQUESTTTT");
        return {
          url: `/${roomID}/users`,
          method: "GET",
          params: { sessionID },
        };
      },
      providesTags: ["users"],
      invalidatesTags: ["messages"],
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserDetailsQuery,
  useGetRoomDetailsQuery,
  useGetMessagesQuery,
  useGetUsersQuery,
} = userApi;
