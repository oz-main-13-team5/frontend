import { MSW_BASE_URL } from "@/constants/url-constants";
import { mockSignUpResponse } from "@/mocks/data/signup-data";
import type {
  SignUpRequest,
  SignUpSendRequest,
  SignUpVerifyRequest,
} from "@/types/api-request-types/auth-request-types";
import type {
  SignUpApiErrorResponse,
  SignUpResponse,
  SignUpSendResponse,
  SignUpVerifyResponse,
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
        ...mockSignUpResponse,
        user: {
          ...mockSignUpResponse.user,
          id: crypto.randomUUID(),
          email,
          nickname,
          joined_at: new Date().toISOString(),
          provider: null,
        },
        tokens: {
          ...mockSignUpResponse.tokens,
          access_token: "mock-access-" + crypto.randomUUID(),
          refresh_expires_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        },
      },
      { status: 201 }
    );
  }
);

export const authHandlers = [postSignUpSend, postSignUpVerify, postSignUp];
