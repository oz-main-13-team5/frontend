import { api } from "@/libs/axios";
import useAuthStore from "@/hooks/stores/useAuthStore";
import type { LogoutResponse } from "@/types/api-response-types/auth-response-types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { MSW_BASE_URL } from "@/constants/url-constants";

export default function useLogoutMutation(
  options?: UseMutationOptions<LogoutResponse, AxiosError>
) {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: () =>
      api.post<LogoutResponse>(`${MSW_BASE_URL}/user/logout`).then((res) => res.data),
    onSettled: () => {
      clearAuth();
      navigate("/login", { replace: true });
    },
    ...options,
  });
}
