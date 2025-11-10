import { MSW_BASE_URL } from "@/constants/url-constants";
import { http, HttpResponse } from "msw";

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

export const myPageHandlers = [patchNickname, patchPassword];
