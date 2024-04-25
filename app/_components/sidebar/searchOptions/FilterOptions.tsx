"use client";

import FilterSlider from "./FilterSlider";
import { SliderSettings } from "@/app/_types/Slider";

interface Props {
  filters: SliderSettings[];
  setFilters: (sliders: SliderSettings[]) => void;
}

export default function FilterOptions(props: Props) {
  const { filters, setFilters } = props;
  return (
    <>
      <h1 className="text-3xl font-bold underline">Filters: </h1>
      {filters.map((slider, index) => {
        return (
          <FilterSlider
            key={`${slider.label} Slider`}
            index={index}
            setFilters={setFilters}
            filters={filters}
          />
        );
      })}
    </>
  );
}
