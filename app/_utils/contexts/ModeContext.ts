import { createContext } from "react";

interface FilterContextType {
  currentMode: string;
  setCurrentMode: (value: string) => void;
}

export const ModeContext = createContext<FilterContextType>({
  currentMode: "",
  setCurrentMode: () => {},
});
