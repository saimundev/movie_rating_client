import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),

  endpoints: (builder) => ({
    getMovies: builder.query<any, any>({
      query: () => ({
        method: "GET",
        url: "movie/get-movies",
      }),
    }),
  }),
});

export const { useGetMoviesQuery } = moviesApi;
