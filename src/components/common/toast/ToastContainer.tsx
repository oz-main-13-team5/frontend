import ToastItem from "@/components/common/toast/ToastItem";
import useToastStore from "@/hooks/stores/useToastStore";
import type { Toast } from "@/types/types";
import { useEffect, useState } from "react";

function ToastContainer() {
  const [renderedToasts, setRenderedToasts] = useState<Toast[]>([]);
  const { toasts } = useToastStore();

  useEffect(() => {
    setRenderedToasts(toasts);
  }, [toasts]);

  return (
    <div className="fixed top-18 right-1 z-500 w-full max-w-md space-y-1 p-1">
      {renderedToasts.map(({ id, type, title, content }) => (
        <ToastItem key={id} id={id} type={type} title={title} content={content} />
      ))}
    </div>
  );
}

export default ToastContainer;
