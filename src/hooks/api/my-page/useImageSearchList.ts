import { MSW_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { ImageSearchApiResponse } from "@/types/api-response-types/image-search-types";
import { useQuery } from "@tanstack/react-query";

export default function useImageSearchList() {
  return useQuery<ImageSearchApiResponse>({
    queryKey: ["mypage", "image-search-list"],
    queryFn: async () => {
      const res = await api.get(`${MSW_BASE_URL}/my_requests`);
      return res.data;
    },
  });
}
