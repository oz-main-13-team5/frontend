import type { User } from "@/types/api-response-types/auth-response-types";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthed: boolean;
  setAuth: (authData: { user: User; accessToken: string }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthed: false,
  setAuth: ({ user, accessToken }) => set({ user, accessToken, isAuthed: true }),
  clearAuth: () => set({ user: null, accessToken: null, isAuthed: false }),
}));
