import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { BoomarkResponse } from "@/types/api-response-types/bookmark-response-types";
import { useMutation, type MutateOptions } from "@tanstack/react-query";

interface UseToggleBookmarkParams {
  isDelete: boolean;
  id: string;
}

type useToggleBookmarkOption = Omit<MutateOptions<BoomarkResponse>, "mutationFn" | "mutationKey">;

export default function useToggleBookmark(
  toggleParams: UseToggleBookmarkParams,
  options?: useToggleBookmarkOption
) {
  return useMutation<BoomarkResponse>({
    mutationKey: ["bookmark", toggleParams.id, toggleParams.isDelete ? "delete" : "add"],
    mutationFn: async () => {
      const { id, isDelete } = toggleParams;

      if (isDelete) {
        const res = await api.delete(`${API_BASE_URL}/bookmarks/${encodeURIComponent(id)}`);
        return res.data;
      } else {
        const res = await api.post(`${API_BASE_URL}/bookmarks/`, {
          item_seq: id,
        });

        return res.data;
      }
    },
    ...options,
  });
}
