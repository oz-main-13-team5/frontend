import type { pillSearchOptionBackend, pillSearchOptionFrontend } from "@/types/types";

export const PILL_LIST_PAGE_LIMIT = 20;

/** 프론트에서 사용하는 value -> 백엔드로 보내는 파라미터 key*/
export const PILL_SEARCH_OPTION_MAP: Record<pillSearchOptionFrontend, pillSearchOptionBackend> = {
  itemName: "item_name",
  enterpriseName: "entp_name",
  efficacy: "efcy_qesitm",
} as const;
