import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { MSW_BASE_URL } from "@/constants/url-constants";
import type { AxiosError, AxiosResponse } from "axios";
import { api } from "@/libs/axios";
import type {
  SignUpApiErrorResponse,
  SignUpResponse,
} from "@/types/api-response-types/auth-response-types";
import type { SignUpRequest } from "@/types/api-request-types/auth-request-types";

export default function useSignupMutation(
  options?: UseMutationOptions<SignUpResponse, AxiosError<SignUpApiErrorResponse>, SignUpRequest>
) {
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
    ...options,
  });
}
