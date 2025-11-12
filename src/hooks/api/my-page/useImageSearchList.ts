import { api } from "@/libs/axios";
import type { ImageSearchApiResponse } from "@/types/api-response-types/image-search-types";
import { useQuery } from "@tanstack/react-query";

export default function useImageSearchList() {
  return useQuery<ImageSearchApiResponse>({
    queryKey: ["mypage", "image-search-list"],
    queryFn: async () => {
      const res = await api.get("/my_requests"); // 임시 엔드포인트
      return res.data;
    },
  });
}
