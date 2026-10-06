"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

interface ShowcaseState {
  activeModel: string | null;
  selectModel: (slug: string | null) => void;
  hydrated: boolean;
}

interface ShowcaseProviderProps {
  children: ReactNode;
}

const ShowcaseContext = createContext<ShowcaseState | null>(null);
const subscribe = () => () => {};

export default function ShowcaseProvider({ children }: ShowcaseProviderProps) {
  const [activeModel, selectModel] = useState<string | null>(null);
  // Server markup keeps the preview and copy, without a nonfunctional button.
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);

  return (
    <ShowcaseContext.Provider value={{ activeModel, selectModel, hydrated }}>
      {children}
    </ShowcaseContext.Provider>
  );
}

export function useShowcase() {
  const context = useContext(ShowcaseContext);
  if (!context) throw new Error("ModelViewer requires ShowcaseProvider");
  return context;
}
