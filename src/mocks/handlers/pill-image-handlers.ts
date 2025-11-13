import { MSW_BASE_URL } from "@/constants/url-constants";
import { mockPillImageSearchRecords } from "@/mocks/data/pill-image-search";
import { http, HttpResponse } from "msw";

const postPillImage = http.post(`${MSW_BASE_URL}/pills/image`, async ({ request }) => {
  const data = await request.formData();

  const image = data.get("image_base64");
  const filename = data.get("filename");

  if (!(image && filename)) {
    return new HttpResponse(null, { status: 400 });
  }

  return new HttpResponse(null, { status: 200 });
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

export const pillImageHandlers = [postPillImage, getImageSearchList];
