import useToastStore from "@/hooks/stores/useToastStore";
import { cn } from "@/libs/utils";
import type { Toast } from "@/types/types";
import { CircleCheckIcon, CircleXIcon, XIcon } from "lucide-react";

const TOAST_COLORS = {
  success: {
    border: "border-green-300",
    bg: "bg-green-50",
    icon: "text-green-500",
    title: "text-neutral-900 font-medium text-lg",
    content: "text-neutral-500",
  },

  error: {
    border: "border-red-300",
    bg: "bg-red-50",
    icon: "text-red-500",
    title: "text-neutral-900 font-medium text-lg",
    content: "text-nuetral-500",
  },
};

const TOAST_ICON = {
  success: CircleCheckIcon,
  error: CircleXIcon,
};

function ToastItem({ id, type, title, content }: Toast) {
  const styles = TOAST_COLORS[type];
  const Icon = TOAST_ICON[type];
  const { removeToast } = useToastStore();

  const handleClickDelete = () => {
    removeToast(id);
  };

  return (
    <div
      className={cn(
        "animate-fade-in-out-toast flex items-start justify-between gap-3 rounded-lg border border-solid p-4 opacity-0",
        styles.border,
        styles.bg
      )}
    >
      <Icon className={styles.icon} />
      <div className="flex-1 text-sm">
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.content}>{content}</p>
      </div>
      <XIcon className={styles.icon} onClick={handleClickDelete} />
    </div>
  );
}

export default ToastItem;
