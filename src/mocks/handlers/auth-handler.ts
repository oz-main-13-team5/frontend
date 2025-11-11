import {
  ACCESS_TOKEN_EXPIRE_SECONDS,
  MS_PER_DAY,
  REFRESH_TOKEN_EXPIRE_DAYS,
} from "@/constants/api-constants";
import { MSW_BASE_URL } from "@/constants/url-constants";
import { mockSignUpResponse } from "@/mocks/data/signup-data";
import type {
  LoginRequest,
  SignUpRequest,
  SignUpSendRequest,
  SignUpVerifyRequest,
} from "@/types/api-request-types/auth-request-types";
import {
  type LoginApiErrorResponse,
  type LoginResponse,
  type SignUpApiErrorResponse,
  type SignUpResponse,
  type SignUpSendResponse,
  type SignUpVerifyResponse,
} from "@/types/api-response-types/auth-response-types";
import { http, HttpResponse } from "msw";

// 임시 인증코드
const verificationCodes = new Map<string, string>();

// 인증코드 전송 API
const postSignUpSend = http.post<never, SignUpSendRequest>(
  `${MSW_BASE_URL}/users/signup/send/`,
  async ({ request }) => {
    const body = await request.json();
    const { email } = body;

    // 6자리 랜덤 숫자 생성
    const mockAuthCode = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("");

    // 메모리에 저장
    verificationCodes.set(email, mockAuthCode);
    console.log(`mock인증코드: ${mockAuthCode}`);

    return HttpResponse.json<SignUpSendResponse>({
      message: "인증번호가 발송 되었습니다.",
    });
  }
);

// 인증코드 확인 API
const postSignUpVerify = http.post<never, SignUpVerifyRequest>(
  `${MSW_BASE_URL}/users/signup/verify/`,
  async ({ request }) => {
    const body = await request.json();
    const { email, auth_code } = body;

    // 저장된 코드와 비교
    const savedCode = verificationCodes.get(email);

    if (savedCode !== auth_code) {
      console.log(`인증번호가 일치하지 않습니다.`);
      return HttpResponse.json<SignUpApiErrorResponse>(
        { error: "인증번호가 일치하지 않습니다.", code: 400 },
        { status: 400 }
      );
    }

    console.log(`인증 성공`);
    return HttpResponse.json<SignUpVerifyResponse>({
      verified: true,
    });
  }
);

// 회원가입 API
const postSignUp = http.post<never, SignUpRequest>(
  `${MSW_BASE_URL}/users/signup`,
  async ({ request }) => {
    const body = (await request.json()) as SignUpRequest;
    const { email, nickname } = body;

    // 중복 이메일 테스트 (mock signup-data 기반)
    if (email === mockSignUpResponse.user.email) {
      console.log(`이미 가입된 이메일입니다.`);
      return HttpResponse.json<SignUpApiErrorResponse>(
        {
          error: "이미 가입된 이메일입니다.",
          code: 400,
        },
        { status: 400 }
      );
    }

    // 정상 응답
    return HttpResponse.json<SignUpResponse>(
      {
        user: {
          id: crypto.randomUUID(),
          email,
          nickname,
          is_active: true,
          joined_at: new Date().toISOString(),
          last_login: null,
          provider: null,
        },
      },
      { status: 201 }
    );
  }
);

// 로그인 API
const postLogin = http.post<never, LoginRequest>(
  `${MSW_BASE_URL}/users/login`,
  async ({ request }) => {
    const body = (await request.json()) as LoginRequest;
    const { email, password } = body;

    if (email !== "jane.doe@example.com" || password !== "Password123!") {
      return HttpResponse.json<LoginApiErrorResponse>(
        { error: "이메일 또는 비밀번호를 확인해주세요", code: 401 },
        { status: 401 }
      );
    }

    return HttpResponse.json<LoginResponse>({
      user: {
        id: "user1",
        email,
        nickname: "jane_doe",
        is_active: true,
        joined_at: new Date().toISOString(),
        last_login: null,
        provider: null,
      },
      tokens: {
        token_type: "Bearer",
        access_token: "mock-access-" + crypto.randomUUID(),
        access_expires_in: ACCESS_TOKEN_EXPIRE_SECONDS,
        refresh_expires_at: new Date(
          Date.now() + REFRESH_TOKEN_EXPIRE_DAYS * MS_PER_DAY
        ).toISOString(),
      },
    });
  }
);

// 토큰 갱신 API
const postRefresh = http.post(`${MSW_BASE_URL}/user/token/refresh`, async () => {
  return HttpResponse.json({
    tokens: {
      token_type: "Bearer",
      access_token: "mock-access-" + crypto.randomUUID(),
      access_expires_in: ACCESS_TOKEN_EXPIRE_SECONDS,
      refresh_expires_at: new Date(
        Date.now() + REFRESH_TOKEN_EXPIRE_DAYS * MS_PER_DAY
      ).toISOString(),
    },
  });
});

// 로그아웃 API
const postLogout = http.post(`${MSW_BASE_URL}/user/logout`, async () => {
  return HttpResponse.json({ message: "로그아웃하셨습니다" });
});

// 회원 탈퇴 API
const deleteAccount = http.delete(`${MSW_BASE_URL}/users/signout`, async () => {
  return new HttpResponse(null, { status: 204 });
});

export const authHandlers = [
  postSignUpSend,
  postSignUpVerify,
  postSignUp,
  postLogin,
  postRefresh,
  postLogout,
  deleteAccount,
];
