// 회원가입 요청
export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignUpSendRequest {
  email: string;
}

export interface SignUpVerifyRequest {
  email: string;
  auth_code: string;
}

// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}
