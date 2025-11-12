import useToastStore from "@/hooks/stores/useToastStore";
import type { Toast } from "@/types/types";

const TIMEOUT = 3000 as const;

function useToast() {
  const { addToast, removeToast } = useToastStore.getState();

  function triggerToast(type: Toast["type"], title: Toast["title"], content: Toast["content"]) {
    const newToast: Toast = {
      id: Date.now(),
      type,
      title,
      content,
    };

    addToast(newToast);

    setTimeout(() => {
      removeToast(newToast.id);
    }, TIMEOUT);
  }

  return { triggerToast };
}

export default useToast;
