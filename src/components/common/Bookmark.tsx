import { cn } from "@/libs/utils";
import { BookmarkIcon } from "lucide-react";
import { useState, type ComponentProps } from "react";

interface BookmarkProps extends Omit<ComponentProps<"button">, "onClick"> {
  initialState?: boolean;
}

export default function Bookmark({ initialState = false, className, ...props }: BookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialState);

  //TODO: 실제 북마크 api 연결
  const handleButtonClick = () => {
    setIsBookmarked((prev) => !prev);
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
