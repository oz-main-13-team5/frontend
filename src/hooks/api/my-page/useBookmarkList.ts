import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { BookmarkListResponse } from "@/types/api-response-types/bookmark-response-types";
import { useQuery } from "@tanstack/react-query";

export default function useBookmarkList(page = 1) {
  return useQuery<BookmarkListResponse>({
    queryKey: ["my-page", "bookmark", page],
    queryFn: async () => {
      const res = await api.get("/bookmarks", { baseURL: API_BASE_URL, params: { page } });
      return res.data;
    },
  });
}
