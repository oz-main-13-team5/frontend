import { MSW_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";
import type {
  SignUpApiErrorResponse,
  SignUpResponse,
  SignUpSendResponse,
  SignUpVerifyResponse,
} from "@/types/api-response-types/auth-response-types";
import type {
  SignUpRequest,
  SignUpSendRequest,
  SignUpVerifyRequest,
} from "@/types/api-request-types/auth-request-types";

export function useSendCodeMutation() {
  return useMutation<SignUpSendResponse, AxiosError<SignUpApiErrorResponse>, SignUpSendRequest>({
    mutationKey: ["auth", "sendCode"],
    mutationFn: (payload) =>
      api
        .post<
          SignUpSendResponse,
          AxiosResponse<SignUpSendResponse>,
          SignUpSendRequest
        >(`${MSW_BASE_URL}/users/signup/send/`, payload)
        .then((res) => res.data),
  });
}

export function useVerifyCodeMutation() {
  return useMutation<SignUpVerifyResponse, AxiosError<SignUpApiErrorResponse>, SignUpVerifyRequest>(
    {
      mutationKey: ["auth", "verifyCode"],
      mutationFn: (payload) =>
        api
          .post<
            SignUpVerifyResponse,
            AxiosResponse<SignUpVerifyResponse>,
            SignUpVerifyRequest
          >(`${MSW_BASE_URL}/users/signup/verify/`, payload)
          .then((res) => res.data),
    }
  );
}

export function useSignupMutation() {
  return useMutation<SignUpResponse, AxiosError<SignUpApiErrorResponse>, SignUpRequest>({
    mutationKey: ["auth", "signup"],
    mutationFn: (payload) =>
      api
        .post<
          SignUpResponse,
          AxiosResponse<SignUpResponse>,
          SignUpRequest
        >(`${MSW_BASE_URL}/users/signup`, payload)
        .then((res) => res.data),
  });
}
