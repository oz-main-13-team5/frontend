export interface SignUpResponse {
  user: {
    id: string;
    email: string;
    nickname: string;
    is_active: boolean;
    joined_at: string;
    last_login: string | null;
    provider: string | null;
  };
  tokens: {
    token_type: "Bearer";
    access_token: string;
    access_expires_in: number;
    refresh_expires_at: string;
  };
}
