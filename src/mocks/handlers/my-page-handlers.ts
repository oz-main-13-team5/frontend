import { MSW_BASE_URL } from "@/constants/url-constants";
import { mockPills } from "@/mocks/data/pill-data";
import { http, HttpResponse } from "msw";

const BOOKMARK_LIMIT = 20;

const patchNickname = http.patch(`${MSW_BASE_URL}/mypage/nickname/`, async ({ request }) => {
  const body = (await request.clone().json()) as { nickname: string };

  if (!body.nickname) {
    return new HttpResponse(null, { status: 400 });
  }

  return new HttpResponse(null, { status: 200 });
});

const patchPassword = http.patch(`${MSW_BASE_URL}/mypage/password`, async ({ request }) => {
  const body = (await request.clone().json()) as {
    current_password: string;
    new_password: string;
  };

  if (!(body.current_password && body.new_password)) {
    return new HttpResponse(null, { status: 400 });
  }

  return new HttpResponse(null, { status: 200 });
});

// 북마크 조회
const getBookmarks = http.get(`${MSW_BASE_URL}/bookmarks`, () => {
  const bookmarked = mockPills.filter((pill) => pill.is_marked);

  const response = {
    pills: bookmarked,
    total: bookmarked.length,
    limit: BOOKMARK_LIMIT, // 최대 북마크 수
  };

  return HttpResponse.json(response, { status: 200 });
});

export const myPageHandlers = [patchNickname, patchPassword, getBookmarks];
