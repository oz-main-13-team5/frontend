import { MSW_BASE_URL } from "@/constants/url-constants";
import { mockPills } from "@/mocks/data/pill-data";
import type { PillList } from "@/types/api-response-types/pill-response-types";
import { http, HttpResponse } from "msw";

const PAGE_LIMIT = 20;

const getPillList = http.get(`${MSW_BASE_URL}/pills`, ({ request }) => {
  const url = new URL(request.url);

  const pageParam = Number(url.searchParams.get("page"));
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const startIndex = (page - 1) * PAGE_LIMIT;
  const endIndex = page * PAGE_LIMIT;

  const pillListResponse: PillList = {
    pills: mockPills.slice(startIndex, endIndex),
    page,
    limit: PAGE_LIMIT,
    total: mockPills.length,
  };

  return HttpResponse.json(pillListResponse);
});

export const pillHandlers = [getPillList];
