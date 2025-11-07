export type SocialProvider = "google" | "kakao";

export interface SocialRequest {
  provider: SocialProvider;
  access_token: string;
}
