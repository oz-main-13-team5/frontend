import type { User } from "@/types/api-response-types/auth-response-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthed: boolean;
  setAuth: (authData: { user: User; accessToken: string }) => void;
  clearAuth: () => void;
  setUserName: (newName: string) => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthed: false,
      setAuth: ({ user, accessToken }) => set({ user, accessToken, isAuthed: true }),
      clearAuth: () => set({ user: null, accessToken: null, isAuthed: false }),
      setUserName: (newName) =>
        set((state) =>
          state.user ? { user: { ...state.user, nickname: newName } } : { user: null }
        ),
    }),
    { name: "auth-storage" } // 로컬스토리지 저장 키 이름
  )
);

export default useAuthStore;
