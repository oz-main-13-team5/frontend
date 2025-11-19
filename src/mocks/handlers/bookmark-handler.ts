import { MSW_BASE_URL } from "@/constants/url-constants";
import { mockPills } from "@/mocks/data/pill-data";
import type { BoomarkResponse } from "@/types/api-response-types/bookmark-response-types";
import { http, HttpResponse } from "msw";

const BOOKMARK_LIMIT = 20;

const postBookmark = http.post(`${MSW_BASE_URL}/bookmarks`, async ({ request }) => {
  const body = (await request.clone().json()) as { item_seq: string };

  if (!body.item_seq) {
    return new HttpResponse(null, { status: 400 });
  }

  let bookmarkCount = 0;

  for (let i = 0; i < mockPills.length; i++) {
    const pill = mockPills[i];

    if (pill.item_seq === body.item_seq) {
      pill.is_marked = true;
    }

    if (pill.is_marked) {
      bookmarkCount++;
    }
  }

  if (bookmarkCount >= BOOKMARK_LIMIT) {
    const response: BoomarkResponse = {
      success: false,
      message: "북마크는 최대 20개까지만 저장할 수 있습니다.",
      current_count: bookmarkCount,
    };

    return HttpResponse.json(response);
  }

  const response: BoomarkResponse = {
    success: true,
    message: "약품이 북마크에 추가되었습니다.",
    current_count: bookmarkCount + 1,
  };

  return HttpResponse.json(response);
});

const deleteBookmark = http.delete(`${MSW_BASE_URL}/bookmarks`, async ({ request }) => {
  const body = (await request.clone().json()) as { item_seq: string };

  if (!body.item_seq) {
    return new HttpResponse(null, { status: 400 });
  }

  let bookmarkCount = 0;

  for (let i = 0; i < mockPills.length; i++) {
    const pill = mockPills[i];

    // 요청된 약품을 찾아 북마크 해제
    if (pill.item_seq === body.item_seq) {
      pill.is_marked = false;
    }

    if (pill.is_marked) {
      bookmarkCount++;
    }
  }

  const response: BoomarkResponse = {
    success: true,
    message: "북마크에서 삭제되었습니다.",
    current_count: bookmarkCount,
  };

  return HttpResponse.json(response);
});

export const bookmarkHandlers = [postBookmark, deleteBookmark];
