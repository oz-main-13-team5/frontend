// 이미지 검색 상태 (처리중 | 처리 완료 | 처리 실패)
export type ImageSearchStatus = "pending" | "completed" | "completed_failed";

// 업로드된 이미지 1건에 대한 타입
// - pending: 처리 중 → item_seq는 비어 있음
// - completed: 처리 완료 → item_seq는 매핑표에 존재하는 경우 약 고유번호
// - completed_failed: 처리 실패 → item_seq는 비어 있음
export interface ImageSearchApiRecordBase {
  filename: string;
  url: string;
  created_at: string;
}

export type ImageSearchApiRecord =
  | (ImageSearchApiRecordBase & {
      status: "pending" | "completed_failed";
      item_seq: "";
    })
  | (ImageSearchApiRecordBase & {
      status: "completed";
      item_seq: string;
    });

// 이미지 검색 목록 API 응답
// - records: 최근 업로드된 이미지 검색 내역 최대 10개 (명세 참고)
export interface ImageSearchApiResponse {
  records: ImageSearchApiRecord[];
}
