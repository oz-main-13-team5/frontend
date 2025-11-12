import Badge from "@/components/common/Badge";
import Bookmark from "@/components/common/Bookmark";
import { cn } from "@/libs/utils";
import type { Pill } from "@/types/api-response-types/pill-response-types";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

// 처리중 | 처리 완료 | 처리 실패
type ImageSearchStatus = "pending" | "completed" | "failed";

// 각 상태에 대응하는 텍스트
const statusLabel: Record<ImageSearchStatus, string> = {
  pending: "처리중",
  completed: "처리 완료",
  failed: "처리 실패",
};

// 각 상태에 대응하는 Badge 색상
const statusVariant: Record<ImageSearchStatus, "secondary" | "primary" | "danger"> = {
  pending: "secondary",
  completed: "primary",
  failed: "danger",
};

type ImageSearchPillListItemProps = {
  pill: Pill;
  status?: ImageSearchStatus;
  className?: string;
};

export default function ImageSearchPillListItem({
  pill,
  status = "completed", // 임시 기본값
  className,
}: ImageSearchPillListItemProps) {
  const {
    item_name: name,
    efcy_qesitm: description,
    item_image_url: imageUrl,
    item_seq: id,
    is_marked: isMarked,
  } = pill;

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 rounded-xl border border-neutral-400 p-4 sm:gap-6 sm:p-6",
        className
      )}
    >
      <img
        alt={`${name}-image`}
        src={imageUrl}
        className="h-20 w-20 object-contain object-center sm:h-24 sm:w-36"
      />
      <div className="flex flex-1 flex-col items-start justify-center gap-2 sm:gap-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
            <Link
              to={`/pill/${id}`}
              aria-label={`${name} 상세페이지`}
              className="flex items-center gap-0.5"
            >
              <span className="text-lg font-normal text-neutral-900 sm:text-2xl sm:font-medium">
                {name}
              </span>
              <ChevronRightIcon className="h-6 w-6 text-neutral-400" />
            </Link>
          </div>
          <Bookmark pillId={id} initialState={isMarked} />
        </div>
        <span className="text-lg text-neutral-600">{description}</span>
      </div>
    </div>
  );
}
