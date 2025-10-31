import { cn } from "@/libs/utils";
import { BookmarkIcon, ChevronRightIcon } from "lucide-react";
import { Link } from "react-router";

//임시 약 인터페이스. (추후 실제 api와 동일하게 설계)
interface Pill {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

interface PillListItemProps {
  pill: Pill;
  className?: string;
}

export default function PillListItem({ className, pill }: PillListItemProps) {
  const { name, description, imageUrl } = pill;

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
          {/* TODO: 실제 링크 연결 */}
          <Link to="#" aria-label={`${name} 상세페이지`} className="flex items-center gap-0.5">
            <span className="text-lg font-normal text-neutral-900 sm:text-2xl sm:font-medium">
              {name}
            </span>
            <ChevronRightIcon className="h-6 w-6 text-neutral-400" />
          </Link>
          <button className="flex size-10 items-center justify-center rounded-lg border border-green-600 sm:size-14">
            <BookmarkIcon className="text-green-600" />
          </button>
        </div>
        <span className="text-lg text-neutral-600">{description}</span>
      </div>
    </div>
  );
}
