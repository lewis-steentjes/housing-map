import { createContext } from "react";

interface HistoryContextType {
  history: Map<number, number>;
  setHistory: (value: Map<number, number>) => void;
}

export const HistoryContext = createContext<HistoryContextType>({
  history: new Map(),
  setHistory: () => {},
});
