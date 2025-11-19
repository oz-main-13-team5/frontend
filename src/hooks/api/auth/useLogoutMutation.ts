import { api } from "@/libs/axios";
import useAuthStore from "@/hooks/stores/useAuthStore";
import type { LogoutResponse } from "@/types/api-response-types/auth-response-types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { JUST_LOGGED_OUT } from "@/constants/key-constants";
import { API_BASE_URL } from "@/constants/url-constants";

export default function useLogoutMutation(
  options?: UseMutationOptions<LogoutResponse, AxiosError, void>
) {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation<LogoutResponse, AxiosError, void>({
    mutationKey: ["auth", "logout"],
    mutationFn: () =>
      api
        .post<LogoutResponse>("/auth/logout", null, { baseURL: API_BASE_URL })
        .then((res) => res.data),
    onSettled: () => {
      clearAuth();
      sessionStorage.setItem(JUST_LOGGED_OUT, "true");
      navigate("/", { replace: true });
    },
    ...options,
  });
}
