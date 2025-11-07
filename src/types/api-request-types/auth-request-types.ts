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
