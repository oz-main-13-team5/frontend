// 소셜 로그인 공통 타입
export interface SocialUser {
  id: string;
  email: string;
  nickname: string;
  is_active: boolean;
  joined_at: string;
  last_login: string | null;
  provider: string | null;
}

export interface SocialToken {
  token_type: "Bearer";
  access_token: string;
  access_expires_in: number;
  refresh_expires_at: string;
}

// 구글 소셜 로그인 응답
export interface SocialGoogleResponse {
  user: SocialUser;
  tokens: SocialToken;
}

// 카카오 소셜 로그인 응답
export interface SocialKakaoResponse {
  user: SocialUser;
  tokens: SocialToken;
}

// 소셜 로그인 에러 응답
export interface SocialApiErrorResponse {
  error: string;
  errorCode: string;
  code: number;
}
