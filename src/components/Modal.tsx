import Button from "@/components/common/Button";
import { cn } from "@/libs/utils";
import { XIcon } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  className?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

/**
 * 공용 모달 컴포넌트
 * isOpen prop으로 열림/닫힘 제어
 * title, description으로 내용 전달
 * cancelButtonLabel, confirmButtonLabel로 버튼 라벨 지정
 * onClose, onCancel, onConfirm으로 이벤트 핸들러 전달
 * 오버레이 클릭으로는 닫히지 않음
 */

export default function Modal({
  isOpen,
  title,
  description,
  cancelButtonLabel = "cancelLabel",
  confirmButtonLabel = "confirmLabel",
  className,
  onClose,
  onCancel,
  onConfirm,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex h-dvh w-full items-center justify-center bg-neutral-700/64">
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-[360px] rounded-xl border border-neutral-400 bg-neutral-50 p-6",
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
        <div className="flex justify-end gap-2 pt-5">
          <Button variant={"neutral"} size={"lg"} onClick={onCancel}>
            {cancelButtonLabel}
          </Button>
          <Button variant={"primary"} size={"lg"} onClick={onConfirm}>
            {confirmButtonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
