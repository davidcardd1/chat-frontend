import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9090/",
  }),
  endpoints: (builder) => ({
    getRoomDetails: builder.query({
      query: (roomID) => ({
        url: `/chatroom?roomID=${roomID}`,
        method: "GET",
      }),
    }),
  }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRoomDetailsQuery } = roomApi;
