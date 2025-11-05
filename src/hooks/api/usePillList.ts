import { MSW_BASE_URL } from "@/constants/url-constants";
import type { PillList } from "@/types/api-response-types/pill-response-types";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

/** depreciate useInfinitePillList로 기능 이관 */
export default function usePillList(
  options?: Omit<UseQueryOptions<PillList>, "queryFn" | "queryKey">
) {
  return useQuery<PillList>({
    queryKey: ["pill"],
    queryFn: async () => {
      const res = await axios.get(`${MSW_BASE_URL}/pills`);

      return res.data;
    },
    ...options,
  });
}
