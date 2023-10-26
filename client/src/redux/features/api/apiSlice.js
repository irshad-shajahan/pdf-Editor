import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);
    headers.set("credentials", "include");
    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    getUserDetails: builder.query({
      query: () => "/getUserData",
      providesTags: ["user", "doctor"],
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useUserLoginMutation
} = apiSlice;
