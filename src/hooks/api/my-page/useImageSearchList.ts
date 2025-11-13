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

    // 이미지 분석 상태가 pending인 항목이 있을 경우에만 2초 주기로 자동 refetch
    // - 모든 항목이 완료되면(refetchInterval = false) 폴링 중단
    refetchInterval: (query) => {
      const records = query.state.data?.records;
      const hasPending = records?.some((record) => record.status === "pending");

      return hasPending ? 2000 : false;
    },

    // 필요 시 백그라운드에서도 일정 주기로 API 호출(폴링) 유지
    // refetchIntervalInBackground: true,
  });
}
