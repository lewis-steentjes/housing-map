import { createContext } from "react";
import { SliderSettings, SlidersObject } from "@/app/_types/Slider";

export interface SuperSettings {
  [key: string]: SuperSetting;
  Rent: SuperSetting;
  Purchase: SuperSetting;
}

interface SuperSetting {
  filters: SlidersObject;
  setFilters: (value: SlidersObject) => void;
}

interface FilterContextType {
  filters: SuperSettings;
}

export const FilterContext = createContext<FilterContextType>({
  filters: {
    Rent: {} as SuperSetting,
    Purchase: {} as SuperSetting,
  },
});
