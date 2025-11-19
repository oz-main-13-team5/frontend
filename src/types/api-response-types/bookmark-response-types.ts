export interface BoomarkResponse {
  success: boolean;
  message: string;
  current_count: number;
}

// 마이페이지 북마크 리스트
export interface BookmarkItem {
  id: number;
  item_seq: string;
  item_name: string;
  entp_name: string;
  item_image_url: string;
}

export type BookmarkListResponse = BookmarkItem[];
