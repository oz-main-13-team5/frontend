import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constants/url-constants";
import type { AxiosError, AxiosResponse } from "axios";
import { api } from "@/libs/axios";
import type { SignUpVerifyRequest } from "@/types/api-request-types/auth-request-types";
import type {
  SignUpApiErrorResponse,
  SignUpVerifyResponse,
} from "@/types/api-response-types/auth-response-types";

export default function useVerifyCodeMutation(
  options?: UseMutationOptions<
    SignUpVerifyResponse,
    AxiosError<SignUpApiErrorResponse>,
    SignUpVerifyRequest
  >
) {
  return useMutation<SignUpVerifyResponse, AxiosError<SignUpApiErrorResponse>, SignUpVerifyRequest>(
    {
      mutationKey: ["auth", "verifyCode"],
      mutationFn: (payload) =>
        api
          .post<
            SignUpVerifyResponse,
            AxiosResponse<SignUpVerifyResponse>,
            SignUpVerifyRequest
          >("/auth/email_verify/", payload, { baseURL: API_BASE_URL })
          .then((res) => res.data),
      ...options,
    }
  );
}
