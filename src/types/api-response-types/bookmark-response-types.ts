import type { Pill } from "@/types/api-response-types/pill-response-types";

export interface BoomarkResponse {
  success: boolean;
  message: string;
  current_count: number;
}

// 마이페이지 북마크 리스트
export type BookmarkItem = Omit<Pill, "is_marked" | "efcy_qesitm">;

export type BookmarkListResponse = BookmarkItem[];
