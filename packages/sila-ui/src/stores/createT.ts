import type { StoreApi, UseBoundStore } from "zustand";
import type { LangState } from "./createLangStore";

export function createT<L extends string, T>(
  useLangStore: UseBoundStore<StoreApi<LangState<L>>>,
  translations: Record<L, T>
) {
  return function useT(): T {
    const lang = useLangStore((s) => s.lang);
    return translations[lang];
  };
}
