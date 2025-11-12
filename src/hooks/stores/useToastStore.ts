import type { Toast } from "@/types/types";
import { create } from "zustand";

interface ToastStore {
  toasts: Toast[];
  addToast: (newToast: Toast) => void;
  removeToast: (id: number) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (newToast) => set((state) => ({ toasts: [...state.toasts, newToast] })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export default useToastStore;
