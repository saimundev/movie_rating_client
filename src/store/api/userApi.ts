import {
  SignUpProps,
  SignInProps,
  OtpCode,
  resentOTPPros,
} from "@/types/AuthProps";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),

  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpProps | FormData, SignUpProps | FormData>({
      query: (data) => ({
        method: "POST",
        url: "auth/sign-up",
        body: data,
      }),
    }),

    signIn: builder.mutation<SignInProps, SignInProps>({
      query: (data) => ({
        method: "POST",
        url: "auth/sign-in",
        body: data,
      }),
    }),

    otpVerify: builder.mutation<OtpCode, OtpCode>({
      query: (data) => ({
        method: "POST",
        url: `auth/verify-otp`,
        body: data,
      }),
    }),

    resendOTP: builder.mutation<resentOTPPros, resentOTPPros>({
      query: (data) => ({
        method: "POST",
        url: `auth/resend-otp`,
        body: data,
      }),
    }),
  }),
});

export const {
  useOtpVerifyMutation,
  useResendOTPMutation,
  useSignUpMutation,
  useSignInMutation,
} = userApi;
