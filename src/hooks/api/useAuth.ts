import { MSW_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export function useSendCodeMutation() {
  return useMutation({
    mutationKey: ["auth", "sendCode"],
    mutationFn: (email: string) =>
      api.post(`${MSW_BASE_URL}/users/signup/send/`, { email }).then((res) => res.data),
  });
}

export function useVerifyCodeMutation() {
  return useMutation({
    mutationKey: ["auth", "verifyCode"],
    mutationFn: (payload: { email: string; auth_code: string }) =>
      api
        .post(`${MSW_BASE_URL}/users/signup/verify/`, payload)
        .then((res) => res.data as { verified: boolean }),
  });
}

export function useSignupMutation() {
  return useMutation({
    mutationKey: ["auth", "signup"],
    mutationFn: (payload: { email: string; password: string; nickname: string }) =>
      api.post(`${MSW_BASE_URL}/users/signup`, payload).then((res) => res.data),
  });
}
