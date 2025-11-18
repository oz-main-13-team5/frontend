import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { NicknameEditSchema } from "@/schema/my-page-edit-schema";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export default function useNicknameEdit(
  options?: Omit<
    UseMutationOptions<unknown, Error, NicknameEditSchema>, //성공과 실패만 있어서 타입 지정은 간단하게 했습니다.
    "mutationFn" | "mutationKey"
  >
) {
  return useMutation({
    mutationKey: ["my-page", "edit", "nickname"],
    mutationFn: async (payload) => {
      await api.patch(`${API_BASE_URL}/users/me`, {
        nickname: payload.nickname,
      });
    },
    ...options,
  });
}
