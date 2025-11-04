import { MSW_BASE_URL } from "@/constants/url-constants";
import { mockPills } from "@/mocks/data/pill-data";
import type { PillList } from "@/types/api-response-types/pill-response-types";
import { http, HttpResponse } from "msw";

const getPillList = http.get(`${MSW_BASE_URL}/pills`, () => {
  const pillListResponse: PillList = {
    pills: mockPills,
    page: 1,
    limit: mockPills.length,
    total: mockPills.length,
  };

  return HttpResponse.json(pillListResponse);
});

export const pillHandlers = [getPillList];
