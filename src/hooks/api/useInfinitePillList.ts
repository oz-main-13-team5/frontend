import { MSW_BASE_URL } from "@/constants/url-constants";
import type { PillList } from "@/types/api-response-types/pill-response-types";
import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";

type useInfinitePillListOption = Omit<
  UseInfiniteQueryOptions<PillList, Error, InfiniteData<PillList>, readonly unknown[], number>,
  "queryFn" | "queryKey" | "initialPageParam" | "getNextPageParam"
>;

const LIMIT = 20;

export default function useInfinitePillList(options?: useInfinitePillListOption) {
  return useInfiniteQuery({
    queryKey: ["pill"],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(`${MSW_BASE_URL}/pills`, {
        params: {
          page: pageParam,
        },
      });

      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page * LIMIT < lastPage.total) {
        return null;
      }

      return lastPage.page + 1;
    },
    ...options,
  });
}
