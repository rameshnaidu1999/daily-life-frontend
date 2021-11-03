import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
var URL = "https://daily-life-api.herokuapp.com";
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),

  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => ({
        url: "/todos/getall",
        method: "GET",
      }),
    }),

    getTodoById: builder.query({
      query: (id) => ({
        url: `/todo/get/${id}`,
        method: "GET",
      }),
    }),

    getTodoByEmail: builder.query({
      query: (email) => ({
        url: `/todo/get?email=${email}`,
        method: "GET",
      }),
    }),

    getTodoByLimit: builder.query({
      query: (num) => {
        return {
          url: `/posts?_limit=${num}
      `,
          method: "GET",
        };
      },
    }),

    deleteTodo: builder.mutation({
      query: (num) => {
        return {
          url: `/todos/delete/${num}`,
          method: "DELETE",
        };
      },
    }),

    createTodo: builder.mutation({
      query: (newPost) => {
        return {
          url: `/todos/create`,
          method: "POST",
          body: newPost,
        };
      },
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodoByEmailQuery,
  useGetTodoByIdQuery,
} = todoApi;
