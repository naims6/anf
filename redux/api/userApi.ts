// src/redux/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<any[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUserById: builder.query<any, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
})

export const { useGetUsersQuery, useGetUserByIdQuery } = apiSlice
