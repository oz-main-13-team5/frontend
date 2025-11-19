import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";

// 카카오 소셜 로그인
export const kakaoLogin = async () => {
  try {
    const response = await api.get("/auth/social/kakao/login", { baseURL: API_BASE_URL });

    if (response.data?.auth_url) {
      window.location.href = response.data.auth_url;
    }
  } catch (error) {
    console.error("카카오 로그인 실패:", error);
  }
};
