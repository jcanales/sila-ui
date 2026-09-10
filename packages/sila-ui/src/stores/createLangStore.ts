import { create, type StoreApi, type UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";

export interface LangState<L extends string> {
  lang: L;
  setLang: (lang: L) => void;
}

export interface CreateLangStoreOptions<L extends string> {
  storageKey: string;
  defaultLang: L;
}

export function createLangStore<L extends string>({
  storageKey,
  defaultLang,
}: CreateLangStoreOptions<L>): UseBoundStore<StoreApi<LangState<L>>> {
  return create<LangState<L>>()(
    persist(
      (set) => ({
        lang: defaultLang,
        setLang: (lang) => set({ lang }),
      }),
      { name: storageKey }
    )
  );
}
