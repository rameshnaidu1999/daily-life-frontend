import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
var URL = "https://daily-life-api.herokuapp.com";
export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),

  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "/posts/getall",
        method: "GET",
      }),
    }),

    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/get/${id}`,
        method: "GET",
      }),
    }),

    getPostByLimit: builder.query({
      query: (num) => {
        return {
          url: `/posts?_limit=${num}
      `,
          method: "GET",
        };
      },
    }),

    deletePost: builder.mutation({
      query: (num) => {
        return {
          url: `/posts/${num}`,
          method: "DELETE",
        };
      },
    }),

    createPost: builder.mutation({
      query: (newPost) => {
        return {
          url: `/posts/create`,
          method: "POST",
          body: newPost,
        };
      },
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetPostByIdQuery,
  useGetPostByLimitQuery,
  useDeletePostMutation,
  useCreatePostMutation,
} = postApi;
