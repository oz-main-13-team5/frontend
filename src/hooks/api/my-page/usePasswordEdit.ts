import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { PasswordEditSchema } from "@/schema/my-page-edit-schema";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export default function usePasswordEdit(
  options?: Omit<
    UseMutationOptions<unknown, Error, Omit<PasswordEditSchema, "confirmPassword">>, //성공과 실패만 있어서 타입 지정은 간단하게 했습니다.
    "mutationFn" | "mutationKey"
  >
) {
  return useMutation({
    mutationKey: ["my-page", "edit", "password"],
    mutationFn: async (payload) => {
      await api.patch(`${API_BASE_URL}/users/me/change-password`, {
        current_password: payload.currentPassword,
        new_password: payload.newPassword,
      });
    },
    ...options,
  });
}
