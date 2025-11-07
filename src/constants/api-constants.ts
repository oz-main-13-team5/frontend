import type { pillSearchOptionBackend, pillSearchOptionFrontend } from "@/types/types";

export const PILL_LIST_PAGE_LIMIT = 20;

/** 프론트에서 사용하는 value -> 백엔드로 보내는 파라미터 key*/
export const PILL_SEARCH_OPTION_MAP: Record<pillSearchOptionFrontend, pillSearchOptionBackend> = {
  itemName: "item_name",
  enterpriseName: "entp_name",
  efficacy: "efcy_qesitm",
} as const;

// Refresh Token 만료 기간(일 단위)
export const REFRESH_TOKEN_EXPIRE_DAYS = 14;

// 시간 계산용: 1일(24시간)을 밀리초로 환산한 값
export const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Access Token 만료 시간(초) / 기본값: 900초 = 15분
export const ACCESS_TOKEN_EXPIRE_SECONDS = 900;
