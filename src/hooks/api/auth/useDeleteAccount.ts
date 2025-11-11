import { MSW_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { ApiError } from "@/types/api-response-types/auth-response-types";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useDeleteAccount(
  options?: Omit<UseMutationOptions<void, AxiosError<ApiError>, void>, "mutationFn" | "mutationKey">
) {
  return useMutation<void, AxiosError<ApiError>, void>({
    mutationKey: ["auth", "deleteAccount"],
    mutationFn: async () => {
      await api.delete(`${MSW_BASE_URL}/users/signout`);
    },
    ...options,
  });
}
