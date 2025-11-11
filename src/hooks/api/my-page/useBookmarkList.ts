import { MSW_BASE_URL } from "@/constants/url-constants";
import type { BookmarkListResponse } from "@/types/api-response-types/bookmark-response-types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useBookmarkList() {
  return useQuery<BookmarkListResponse>({
    queryKey: ["bookmark"],
    queryFn: async () => {
      const res = await axios.get(`${MSW_BASE_URL}/bookmark`);
      return res.data;
    },
  });
}
