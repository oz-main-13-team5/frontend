import type { pillSearchOptionFrontend } from "@/types/types";
import { create } from "zustand";

interface PillSearchState {
  queryParamKey: pillSearchOptionFrontend;
  queryParamValue: string;
  setQueryParamKey: (key: pillSearchOptionFrontend) => void;
  setQueryParamValue: (value: string) => void;
}

const usePillSearchStore = create<PillSearchState>()((set) => ({
  queryParamKey: "itemName",
  queryParamValue: "",
  setQueryParamKey: (key) => set(() => ({ queryParamKey: key })),
  setQueryParamValue: (value) => set(() => ({ queryParamValue: value })),
}));

export default usePillSearchStore;
