import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // slice name
  tagTypes: ["Users"], // 1. Define tag types
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"], // 2. This query provides 'Users' tag
    }),

    // now we going to add user in our db or api POST
    postUsers: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: JSON.stringify(newUser), // json-server automatically JSON parse karega
      }),
      invalidatesTags: ["Users"], //  This mutation invalidates 'Users' tag
    }),
    // update
    updateUsers: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PUT", // ya PATCH bhi kar sakte ho
        body: patch,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, usePostUsersMutation, useDeleteUsersMutation , useUpdateUsersMutation} = apiSlice;
