import { MSW_BASE_URL } from "@/constants/url-constants";
import { bookmarkHandlers } from "@/mocks/handlers/bookmark-handler";
import { authHandlers } from "@/mocks/handlers/auth-handler";
import { pillHandlers } from "@/mocks/handlers/pill-handler";
import { myPageHandlers } from "@/mocks/handlers/my-page-handlers";
import { http, HttpResponse } from "msw";

const getTestMSW = http.get(`${MSW_BASE_URL}/get-test`, () => {
  return HttpResponse.text("msw is working!");
});

export const handlers = [
  getTestMSW,
  ...pillHandlers,
  ...bookmarkHandlers,
  ...authHandlers,
  ...myPageHandlers,
];
