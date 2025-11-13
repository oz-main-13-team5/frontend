import { MSW_BASE_URL } from "@/constants/url-constants";
import { mockPills } from "@/mocks/data/pill-data";
import { mockPillImageSearchRecords } from "@/mocks/data/pill-image-search";
import { http, HttpResponse } from "msw";

const BOOKMARK_LIMIT = 20;

const patchNickname = http.patch(`${MSW_BASE_URL}/me/nickname`, async ({ request }) => {
  const body = (await request.clone().json()) as { nickname: string };

  if (!body.nickname) {
    return new HttpResponse(null, { status: 400 });
  }

  return new HttpResponse(null, { status: 200 });
});

const patchPassword = http.patch(`${MSW_BASE_URL}/me/password`, async ({ request }) => {
  const body = (await request.clone().json()) as { current_password: string; new_password: string };

  if (!(body.current_password && body.new_password)) {
    return new HttpResponse(null, { status: 400 });
  }

  return new HttpResponse(null, { status: 200 });
});

// 북마크 조회
const getBookmarks = http.get(`${MSW_BASE_URL}/bookmark`, () => {
  const bookmarked = mockPills.filter((pill) => pill.is_marked);

  const response = {
    pills: bookmarked,
    total: bookmarked.length,
    limit: BOOKMARK_LIMIT, // 최대 북마크 수
  };

  return HttpResponse.json(response, { status: 200 });
});

// 이미지 검색 요청 목록
const getImageSearchList = http.get(`${MSW_BASE_URL}/my_requests`, () => {
  return HttpResponse.json(
    {
      records: mockPillImageSearchRecords,
    },
    { status: 200 }
  );
});

// 이미지 검색 목록에 약 이름/북마크 반영용 핸들러
// - mockPills에서 해당 item_seq의 의약품 정보 반환
// - ImageSearchPillListItem 컴포넌트에서 이미지 검색 결과가 completed 상태일 때 참조됨
const getPillDetail = http.get(`${MSW_BASE_URL}/pills/:itemSeq`, ({ params }) => {
  const { itemSeq } = params as { itemSeq: string };
  const pill = mockPills.find((p) => p.item_seq === itemSeq);

  if (!pill) {
    return HttpResponse.json({ error: "요청한 의약품의 정보가 없습니다." }, { status: 404 });
  }

  return HttpResponse.json(pill, { status: 200 });
});

export const myPageHandlers = [
  patchNickname,
  patchPassword,
  getBookmarks,
  getImageSearchList,
  getPillDetail,
];
