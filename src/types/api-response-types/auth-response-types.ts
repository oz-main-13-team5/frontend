// 로그인/회원가입 공통 타입
export interface User {
  id: string;
  email: string;
  nickname: string;
  is_active: boolean;
  joined_at: string;
  last_login: string | null;
  provider: string | null;
}

export interface Token {
  token_type: "Bearer";
  access_token: string;
  access_expires_in: number;
  refresh_expires_at: string;
}
export interface ApiError {
  error: string;
  code: number;
}

// 회원가입 응답
export interface SignUpResponse {
  user: User;
  tokens: Token;
}

export interface SignUpSendResponse {
  message: string;
}

export interface SignUpVerifyResponse {
  verified: boolean;
}

export type SignUpApiErrorResponse = ApiError;

// 로그인 응답
export interface LoginResponse {
  user: User;
  tokens: Token;
}

export type LoginApiErrorResponse = ApiError;

// 로그아웃 응답
export interface LogoutResponse {
  message: string;
}
