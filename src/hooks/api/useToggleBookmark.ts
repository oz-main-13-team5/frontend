import { MSW_BASE_URL } from "@/constants/url-constants";
import type { BoomarkResponse } from "@/types/api-response-types/bookmark-response-types";
import { useMutation, type MutateOptions } from "@tanstack/react-query";
import axios from "axios";

interface UseToggleBookmarkParams {
  isDelete: boolean;
  id: string;
}

type useToggleBookmarkOption = Omit<MutateOptions<BoomarkResponse>, "mutationFn" | "mutationKey">;

export default function useToggleBookmark(
  toggleParams: UseToggleBookmarkParams,
  options: useToggleBookmarkOption
) {
  return useMutation<BoomarkResponse>({
    mutationKey: ["bookmark", toggleParams.id, toggleParams.isDelete ? "delete" : "add"],
    mutationFn: async () => {
      const { id, isDelete } = toggleParams;

      if (isDelete) {
        const res = await axios.delete(`${MSW_BASE_URL}/bookmark`, {
          data: {
            item_seq: id,
          },
        });

        return res.data;
      } else {
        const res = await axios.post(`${MSW_BASE_URL}/bookmark`, {
          item_seq: id,
        });

        return res.data;
      }
    },
    ...options,
  });
}
