import {
  IMAGE_SEARCH_MAX_COUNT,
  IMAGE_SEARCH_REFETCH_INTERVAL_MS,
} from "@/constants/api-constants";
import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { ImageSearchApiResponse } from "@/types/api-response-types/image-search-types";
import { useQuery } from "@tanstack/react-query";

export default function useImageSearchList() {
  return useQuery<ImageSearchApiResponse>({
    queryKey: ["mypage", "image-search-list"],
    queryFn: async () => {
      const res = await api.get("/pills/search-histories/", { baseURL: API_BASE_URL });
      const data = res.data;

      // 리스트 10개만 노출 (명세 참고)
      data.records = data.records.slice(0, IMAGE_SEARCH_MAX_COUNT);
      return data;
    },

    // 이미지 분석 상태가 pending인 항목이 있을 경우에만 2초 주기로 자동 refetch
    // - 모든 항목이 완료되면(refetchInterval = false) 폴링 중단
    refetchInterval: (query) => {
      const records = query.state.data?.records;
      const hasPending = records?.some((record) => record.status === "pending");
      return hasPending ? IMAGE_SEARCH_REFETCH_INTERVAL_MS : false;
    },

    // 필요 시 백그라운드에서도 일정 주기로 API 호출(폴링) 유지
    // refetchIntervalInBackground: true,
  });
}
