import useToggleBookmark from "@/hooks/api/useToggleBookmark";
import useAuthStore from "@/hooks/stores/useAuthStore";
import useToast from "@/hooks/useToast";
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
  const { isAuthed } = useAuthStore((state) => state);
  const { triggerToast } = useToast();

  const { mutate, isPending } = useToggleBookmark(
    { isDelete: isBookmarked, id: pillId },
    {
      onSettled: (data) => {
        //실패하면 낙천적 UI 정정
        if (data && !data?.success) {
          setIsBookmarked((prev) => !prev);
          triggerToast("error", "북마크 최대 개수 초과", "북마크는 최대 20개까지 가능합니다.");
        }
      },
    }
  );

  const handleButtonClick = () => {
    if (isAuthed) {
      //optimistic UI (뮤테이션 결과를 기다리지 않고 바로 UI 업데이트)
      setIsBookmarked((prev) => !prev);
      mutate();
    } else {
      triggerToast(
        "error",
        "로그인 후 사용할 수 있습니다.",
        "북마크 기능은 로그인 후 사용할 수 있습니다."
      );
    }
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={cn(
          "flex size-10 items-center justify-center rounded-lg border border-green-600 sm:size-14",
          className
        )}
        disabled={isPending}
        {...props}
      >
        <BookmarkIcon className="text-green-600" fill={isBookmarked ? "#16a34a" : "#fafafa"} />
      </button>
    </>
  );
}
