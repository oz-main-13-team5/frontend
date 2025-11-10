import { api } from "@/libs/axios";
import type { LoginRequest } from "@/types/api-request-types/auth-request-types";
import { AxiosError, type AxiosResponse } from "axios";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  LoginApiErrorResponse,
  LoginResponse,
} from "@/types/api-response-types/auth-response-types";
import { MSW_BASE_URL } from "@/constants/url-constants";

// 로그인 요청 처리 TanStack Query 훅
// - /users/login 엔드포인트로 로그인 요청을 보내고,
// - 성공 시 서버에서 받은 user / accessToken을 Zustand 스토어에 저장

export default function useLoginMutation(
  options?: UseMutationOptions<LoginResponse, AxiosError<LoginApiErrorResponse>, LoginRequest>
) {
  return useMutation<LoginResponse, AxiosError<LoginApiErrorResponse>, LoginRequest>({
    mutationKey: ["auth", "login"],
    mutationFn: async (payload) => {
      const res = await api.post<LoginResponse, AxiosResponse<LoginResponse>, LoginRequest>(
        `${MSW_BASE_URL}/users/login`,
        payload
      );

      return res.data;
    },
    ...options,
  });
}
