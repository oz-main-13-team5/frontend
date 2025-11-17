import { PILL_LIST_PAGE_LIMIT, PILL_SEARCH_OPTION_MAP } from "@/constants/api-constants";
import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";
import type { PillList } from "@/types/api-response-types/pill-response-types";
import type { pillSearchOptionFrontend } from "@/types/types";
import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";

type useInfinitePillListOption = Omit<
  UseInfiniteQueryOptions<PillList, Error, InfiniteData<PillList>, readonly unknown[], number>,
  "queryFn" | "queryKey" | "initialPageParam" | "getNextPageParam"
>;

interface PillSearchParam {
  queryParamKey: pillSearchOptionFrontend;
  queryParamValue: string;
}

export default function useInfinitePillList(
  pillSearchParam?: PillSearchParam,
  options?: useInfinitePillListOption
) {
  return useInfiniteQuery({
    queryKey:
      pillSearchParam && pillSearchParam.queryParamValue.trim().length > 0
        ? ["pill", `${pillSearchParam.queryParamKey}=${pillSearchParam.queryParamValue.trim()}`]
        : ["pill"],
    queryFn: async ({ pageParam }) => {
      if (pillSearchParam && pillSearchParam.queryParamValue.trim().length > 0) {
        //검색어가 있을 때
        const { queryParamKey, queryParamValue } = pillSearchParam;

        const trimmedValue = queryParamValue.trim();

        const res = await api.get(`${API_BASE_URL}/pills/search`, {
          params: {
            page: pageParam,
            [PILL_SEARCH_OPTION_MAP[queryParamKey]]: trimmedValue,
          },
        });

        return res.data;
      } else {
        //검색어가 없을 때
        const res = await api.get(`${API_BASE_URL}/pills`, {
          params: {
            page: pageParam,
          },
        });

        return res.data;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page * PILL_LIST_PAGE_LIMIT >= lastPage.total) {
        return null;
      }

      return lastPage.page + 1;
    },
    ...options,
  });
}
