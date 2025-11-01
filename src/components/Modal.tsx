import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { cn } from "@/libs/utils";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  className?: string;
  onClose?: () => void;
  children?: ReactNode;
}

/**
 * 공용 모달 컴포넌트
 * isOpen prop으로 열림/닫힘 제어
 * title, description으로 내용 전달
 * children으로 버튼, 링크, 폼 등 다양한 콘텐츠 구성 가능
 * 오버레이 클릭으로는 닫히지 않음
 */

export default function Modal({
  isOpen,
  title,
  description,
  className,
  onClose,
  children,
}: ModalProps) {
  useBodyScrollLock(isOpen); // 모달 열림 시 body 스크롤 잠금 훅

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex h-dvh w-full items-center justify-center bg-neutral-700/64">
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative h-dvh bg-neutral-50 p-6 sm:h-auto sm:w-[360px] sm:rounded-xl sm:border sm:border-neutral-400",
          className
        )}
      >
        <div className="flex justify-end">
          <button onClick={onClose} className="cursor-pointer text-green-600" aria-label="닫기">
            <XIcon />
          </button>
        </div>
        <h1 className="pb-9 text-2xl font-medium text-neutral-900">{title}</h1>
        <p className="text-base text-neutral-900">{description}</p>
        <div className="flex justify-end gap-2 pt-10 sm:pt-5">{children}</div>
      </div>
    </div>
  );
}
