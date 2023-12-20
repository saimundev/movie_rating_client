import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",

  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  tagTypes: ["List"],

  endpoints: (builder) => ({
    getMovies: builder.query<any, any>({
      query: () => ({
        method: "GET",
        url: "movie/get-movies",
      }),
    }),

    getWatchList: builder.query<any, any>({
      query: ({ userId }) => ({
        method: "GET",
        url: `movie/getWatch-list/${userId}`,
      }),
      providesTags: ["List"],
    }),

    addWatchList: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: "movie/watch-list",
        body: data,
      }),
      invalidatesTags: ["List"],
    }),

    removeWatchList: builder.mutation<any, any>({
      query: ({ listId }) => ({
        method: "DELETE",
        url: `movie/remove-watchList/${listId}`,
      }),
      invalidatesTags: ["List"],
    }),

    createRating: builder.mutation<any, any>({
      query: (data) => ({
        method: "POST",
        url: `movie/rating`,
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useAddWatchListMutation,
  useGetWatchListQuery,
  useRemoveWatchListMutation,
  useCreateRatingMutation,
} = moviesApi;
