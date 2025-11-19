import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { PillDetail } from "@/types/api-response-types/pill-response-types";
import { useQuery } from "@tanstack/react-query";

// /pills/search-histories/ 응답의 item_seq를 이용해 의약품 상세 정보 요청
// - 검색 결과 completed 상태일 때만 호출
async function fetchPillDetail(itemSeq: string) {
  const { data } = await api.get<PillDetail>(`/pills/${itemSeq}`, { baseURL: API_BASE_URL });
  return data;
}

export default function useImageSearchPillDetail(itemSeq?: string) {
  return useQuery<PillDetail>({
    queryKey: ["pill", "image-search", itemSeq],
    queryFn: () => fetchPillDetail(itemSeq as string),
    enabled: !!itemSeq,
  });
}
