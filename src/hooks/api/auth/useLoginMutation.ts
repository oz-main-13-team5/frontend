import { api } from "@/libs/axios";
import type { LoginRequest } from "@/types/api-request-types/auth-request-types";
import { AxiosError, type AxiosResponse } from "axios";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useAuthStore } from "@/hooks/stores/useAuthStore";
import type {
  LoginApiErrorResponse,
  LoginResponse,
} from "@/types/api-response-types/auth-response-types";
import { MSW_BASE_URL } from "@/constants/url-constants";

// 로그인 요청 처리 TanStack Query 훅
// - /users/login 엔드포인트로 로그인 요청을 보내고,
// - 성공 시 서버에서 받은 user / accessToken을 Zustand 스토어에 저장

export function useLoginMutation(
  options?: UseMutationOptions<LoginResponse, AxiosError<LoginApiErrorResponse>, LoginRequest>
) {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<LoginResponse, AxiosError<LoginApiErrorResponse>, LoginRequest>({
    mutationKey: ["auth", "login"],
    mutationFn: (payload) =>
      api
        .post<
          LoginResponse,
          AxiosResponse<LoginResponse>,
          LoginRequest
        >(`${MSW_BASE_URL}/users/login`, payload)
        .then((res) => res.data),
    onSuccess: (data) => {
      // 로그인 성공 시, 유저 정보와 엑세스 토근을 전역 상태에 저장
      setAuth({
        user: data.user,
        accessToken: data.tokens.access_token,
      });
    },
    ...options,
  });
}
