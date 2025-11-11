import { MSW_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { PillList } from "@/types/api-response-types/pill-response-types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

/** depreciate useInfinitePillList로 기능 이관 */
export default function usePillList(
  options?: Omit<UseQueryOptions<PillList>, "queryFn" | "queryKey">
) {
  return useQuery<PillList>({
    queryKey: ["pill"],
    queryFn: async () => {
      const res = await api.get(`${MSW_BASE_URL}/pills`);

      return res.data;
    },
    ...options,
  });
}
