import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.0.0.233:8000/api" }),
  prepareHeaders: (headers, { getState }) => {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Content-Type", "application/json");
    return headers;
  },
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (token) => ({
        url: "/posts",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `TOKEN ${token}`,
        },
      }),
    }),
    getPost: builder.query({
      query: (username) => ({
        url: `/posts/${username}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getReview: builder.query({
      query: () => "/reviews",
    }),
    getUsers: builder.query({
      query: (username) => ({
        url: `/search-users/${username}`,
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (username) => ({
        url: `/get-user/${username}`,
        method: "GET",
      }),
    }),
    getNextPage: builder.query({
      query: ({ url, token }) => ({
        url: url,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `TOKEN ${token}`,
        },
      }),
    }),
    followUser: builder.mutation({
      query: (body) => ({
        url: `/follow-user/`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `TOKEN ${body.token}`,
        },
      }),
    }),
    getFollowers: builder.query({
      query: (username) => ({
        url: `/get-followers/${username}`,
        method: "GET",
      }),
    }),
    getFollowing: builder.query({
      query: (username) => ({
        url: `/get-following/${username}`,
        method: "GET",
      }),
    }),
    getNotifications: builder.query({
      query: (token) => ({
        url: `/notifications/`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `TOKEN ${token}`,
        },
      }),
    }),
    likePost: builder.mutation({
      query: ({ postId, token }) => ({
        url: `/posts/${postId}/like/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `TOKEN ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetReviewQuery,
  useGetUsersQuery,
  useGetUserQuery,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetNotificationsQuery,
  endpoints,
} = api;
