import type { SignUpResponse } from "@/types/api-response-types/auth-response-types";

export const mockSignUpResponse: SignUpResponse = {
  user: {
    id: "c8b1e740-12f4-4b8b-9e6f-1f07a3f7a9b5",
    email: "jane.doe@example.com",
    nickname: "jane_doe",
    is_active: true,
    joined_at: "2025-11-04T02:13:45Z",
    last_login: null,
    provider: null,
  },
  tokens: {
    token_type: "Bearer",
    access_token: "mock-access-token",
    access_expires_in: 900,
    refresh_expires_at: "2025-11-18T02:13:45Z",
  },
};
