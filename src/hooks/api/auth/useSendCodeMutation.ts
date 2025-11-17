import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { API_BASE_URL } from "@/constants/url-constants";
import type { AxiosError, AxiosResponse } from "axios";
import { api } from "@/libs/axios";
import type { SignUpSendRequest } from "@/types/api-request-types/auth-request-types";
import type {
  SignUpApiErrorResponse,
  SignUpSendResponse,
} from "@/types/api-response-types/auth-response-types";

export default function useSendCodeMutation(
  options?: UseMutationOptions<
    SignUpSendResponse,
    AxiosError<SignUpApiErrorResponse>,
    SignUpSendRequest
  >
) {
  return useMutation<SignUpSendResponse, AxiosError<SignUpApiErrorResponse>, SignUpSendRequest>({
    mutationKey: ["auth", "sendCode"],
    mutationFn: (payload) =>
      api
        .post<
          SignUpSendResponse,
          AxiosResponse<SignUpSendResponse>,
          SignUpSendRequest
        >("/auth/email_send", payload, { baseURL: API_BASE_URL })
        .then((res) => res.data),
    ...options,
  });
}
