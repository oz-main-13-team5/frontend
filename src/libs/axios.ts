import { MSW_BASE_URL } from "@/constants/url-constants";
import useAuthStore from "@/hooks/stores/useAuthStore";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
  console.log("요청 인터셉터 실행");

  const token = useAuthStore.getState().accessToken;

  // headers가 undefined일 수 있으므로 안전하게 기본값 설정
  config.headers = config.headers ?? {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("요청 전송:", config.url, config.method);
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  // 성공 응답
  (response) => response,

  // 실패 응답
  async (error: AxiosError) => {
    const { response, config } = error;

    // accessToken 만료 감시 및 중복 재시도 방지
    if (response?.status === 401 && config && !(config as any)._retry) {
      (config as any)._retry = true;

      try {
        // refresh 요청 (rToken은 쿠키로 자동 전송)
        const { data } = await axios.post(
          `${MSW_BASE_URL}/user/token/refresh`,
          {},
          { withCredentials: true }
        );
        console.log("새 accessToken 발급 성공");

        // 새 accessToken 전역 상태에 저장
        const newAccessToken = data?.tokens?.access_token ?? data?.access_token;
        if (newAccessToken) {
          const state = useAuthStore.getState();
          useAuthStore.setState({ ...state, accessToken: newAccessToken });
          console.log("accessToken 업데이트 완료");

          return api(config);
        }
      } catch (refreshError) {
        // refresh 자체가 실패하면 로그인 상태 초기화
        console.log("refresh 실패로 로그아웃 처리");
        useAuthStore.getState().clearAuth();
      }
    }
    return Promise.reject(error);
  }
);
