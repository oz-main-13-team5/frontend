import Badge from "@/components/common/Badge";
import Bookmark from "@/components/common/Bookmark";
import useImageSearchPillDetail from "@/hooks/api/my-page/useImageSearchPillDetail";
import { cn } from "@/libs/utils";
import type {
  ImageSearchApiRecord,
  ImageSearchStatus,
} from "@/types/api-response-types/image-search-types";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

// 각 상태에 대응하는 텍스트
const statusLabel: Record<ImageSearchStatus, string> = {
  pending: "처리중",
  completed: "처리 완료",
  completed_failed: "처리 실패",
};

// 각 상태에 대응하는 Badge 색상
const statusVariant: Record<ImageSearchStatus, "secondary" | "primary" | "danger"> = {
  pending: "secondary",
  completed: "primary",
  completed_failed: "danger",
};

type ImageSearchPillListItemProps = {
  record: ImageSearchApiRecord;
  className?: string;
};

export default function ImageSearchPillListItem({
  record,
  className,
}: ImageSearchPillListItemProps) {
  const isPending = record.status === "pending";
  const isCompleted = record.status === "completed";
  const isFailed = record.status === "completed_failed";

  // completed + item_seq 있을 때만 약 조회
  const itemSeq = isCompleted ? record.item_seq : undefined;
  const { data: pill } = useImageSearchPillDetail(itemSeq);

  function getStatusText() {
    if (isPending) return "이미지 분석 중입니다.";
    if (isFailed) return "이미지에서 의약품을 인식할 수 없습니다.";
    return "";
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 rounded-xl border border-neutral-400 p-4 sm:gap-6 sm:p-6",
        className
      )}
    >
      {/* 유저가 업로드한 이미지 썸네일 */}
      <img
        src={record.url}
        alt={record.filename}
        className="h-20 w-20 object-cover object-center sm:h-24 sm:w-36"
      />
      <div className="flex flex-1 flex-col items-start justify-center gap-2 sm:gap-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col gap-3">
            <Badge variant={statusVariant[record.status]} className="w-fit">
              {statusLabel[record.status]}
            </Badge>

            {isCompleted ? (
              <Link
                to={`/pill/${record.item_seq}`}
                aria-label={`${record.item_seq} 상세페이지`}
                className="flex items-center gap-0.5"
              >
                <span className="text-base font-normal text-neutral-900 hover:text-green-600 sm:text-2xl sm:font-medium">
                  {pill?.item_name}
                </span>
                <ChevronRightIcon className="h-6 w-6 text-neutral-400" />
              </Link>
            ) : (
              <span className="text-sm font-normal text-neutral-600 sm:text-base">
                {getStatusText()}
              </span>
            )}
          </div>

          {isCompleted && pill ? (
            <Bookmark pillId={pill.item_seq} initialState={pill.is_marked} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
