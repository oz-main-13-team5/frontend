import { PILL_LIST_PAGE_LIMIT } from "@/constants/api-constants";
import { MSW_BASE_URL } from "@/constants/url-constants";
import { mockPills } from "@/mocks/data/pill-data";
import type { Pill, PillList } from "@/types/api-response-types/pill-response-types";
import { http, HttpResponse } from "msw";

const getPillList = http.get(`${MSW_BASE_URL}/pills`, ({ request }) => {
  const url = new URL(request.url);

  const pageParam = Number(url.searchParams.get("page"));
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const startIndex = (page - 1) * PILL_LIST_PAGE_LIMIT;
  const endIndex = page * PILL_LIST_PAGE_LIMIT;

  const pillListResponse: PillList = {
    pills: mockPills.slice(startIndex, endIndex),
    page,
    limit: PILL_LIST_PAGE_LIMIT,
    total: mockPills.length,
  };

  return HttpResponse.json(pillListResponse);
});

const getPillSearchList = http.get(`${MSW_BASE_URL}/pills/search`, ({ request }) => {
  const url = new URL(request.url);

  const itemNameValue = url.searchParams.get("item_name");
  const enterpriseNameValue = url.searchParams.get("entp_name");
  const efcy_qesitm = url.searchParams.get("efcy_qesitm");

  let filteredMockList: Pill[];

  if (itemNameValue) {
    //약 이름으로 검색
    const trimedValue = itemNameValue;
    filteredMockList = mockPills.filter((pill) => pill.item_name.includes(trimedValue));
  } else if (enterpriseNameValue) {
    //제조사 명으로 검색
    const trimedValue = enterpriseNameValue;
    filteredMockList = mockPills.filter((pill) => pill.entp_name.includes(trimedValue));
  } else if (efcy_qesitm) {
    //효능으로 검색
    const trimedValue = efcy_qesitm;
    filteredMockList = mockPills.filter((pill) => pill.efcy_qesitm.includes(trimedValue));
  } else {
    return HttpResponse.json({}, { status: 400 });
  }

  const pageParam = Number(url.searchParams.get("page"));
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const startIndex = (page - 1) * PILL_LIST_PAGE_LIMIT;
  const endIndex = page * PILL_LIST_PAGE_LIMIT;

  const pillListResponse: PillList = {
    pills: filteredMockList.slice(startIndex, endIndex),
    page,
    limit: PILL_LIST_PAGE_LIMIT,
    total: filteredMockList.length,
  };

  return HttpResponse.json(pillListResponse);
});

export const pillHandlers = [getPillList, getPillSearchList];
