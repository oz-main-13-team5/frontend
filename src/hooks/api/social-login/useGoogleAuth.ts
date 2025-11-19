import { API_BASE_URL } from "@/constants/url-constants";
import { api } from "@/libs/axios";

// 구글 소셜 로그인
export const googleLogin = async () => {
  try {
    const response = await api.get("/auth/social/google/login", { baseURL: API_BASE_URL });

    if (response.data?.auth_url) {
      window.location.href = response.data.auth_url;
    }
  } catch (error) {
    console.error("구글 로그인 실패:", error);
  }
};
