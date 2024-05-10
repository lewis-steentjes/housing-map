import { createContext } from "react";
import { SliderSettings, SlidersObject } from "@/app/_types/Slider";

export interface SuperSettings {
  [key: string]: SuperSetting;
  Rental: SuperSetting;
  Auction: SuperSetting;
}

interface SuperSetting {
  filters: SlidersObject;
  setFilters: (value: SlidersObject) => void;
}

interface FilterContextType {
  filters: SuperSettings;
  currentMode: string;
  setCurrentMode: (value: string) => void;
}

export const FilterContext = createContext<FilterContextType>({
  filters: {
    Rental: {} as SuperSetting,
    Auction: {} as SuperSetting,
  },
  currentMode: "",
  setCurrentMode: () => {},
});
