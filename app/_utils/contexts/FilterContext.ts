import { createContext } from "react";
import { SliderSettings } from "@/app/_types/Slider";

interface FilterContextType {
  filters: SliderSettings[];
  setFilters: (value: SliderSettings[]) => void;
}

export const FilterContext = createContext<FilterContextType>({
  filters: [],
  setFilters: () => {},
});
