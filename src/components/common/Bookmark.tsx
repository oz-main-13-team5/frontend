import useToggleBookmark from "@/hooks/api/useToggleBookmark";
import { cn } from "@/libs/utils";
import { BookmarkIcon } from "lucide-react";
import { useState, type ComponentProps } from "react";

interface BookmarkProps extends Omit<ComponentProps<"button">, "onClick"> {
  initialState?: boolean;
  pillId: string;
}

export default function Bookmark({
  initialState = false,
  className,
  pillId,
  ...props
}: BookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialState);

  const { mutate } = useToggleBookmark({ isDelete: isBookmarked, id: pillId });

  const handleButtonClick = () => {
    //optimistic UI (뮤테이션 결과를 기다리지 않고 바로 UI 업데이트)
    setIsBookmarked((prev) => !prev);
    mutate();
  };

  return (
    <button
      onClick={handleButtonClick}
      className={cn(
        "flex size-10 items-center justify-center rounded-lg border border-green-600 sm:size-14",
        className
      )}
      {...props}
    >
      <BookmarkIcon className="text-green-600" fill={isBookmarked ? "#16a34a" : "#fafafa"} />
    </button>
  );
}
