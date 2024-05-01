import { createContext } from "react";
import { SliderSettings, SlidersObject } from "@/app/_types/Slider";

interface FilterContextType {
  filters: SlidersObject;
  setFilters: (value: SlidersObject) => void;
}

export const FilterContext = createContext<FilterContextType>({
  filters: {
    bedrooms: {} as SliderSettings,
    bathrooms: {} as SliderSettings,
    price: {} as SliderSettings,
    listingAge: {} as SliderSettings,
  },
  setFilters: () => {},
});
