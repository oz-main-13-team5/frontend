import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { MSW_BASE_URL } from "@/constants/url-constants";
import type { AxiosError, AxiosResponse } from "axios";
import { api } from "@/libs/axios";
import type { SignUpVerifyRequest } from "@/types/api-request-types/auth-request-types";
import type {
  SignUpApiErrorResponse,
  SignUpVerifyResponse,
} from "@/types/api-response-types/auth-response-types";

export function useVerifyCodeMutation(
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
          >(`${MSW_BASE_URL}/users/signup/verify/`, payload)
          .then((res) => res.data),
      ...options,
    }
  );
}
