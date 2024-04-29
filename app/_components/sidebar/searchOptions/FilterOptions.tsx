"use client";

import FilterSlider from "./FilterSlider";
import { useContext } from "react";
import { FilterContext } from "@/app/_utils/contexts/FilterContext";
import { SliderSettings } from "@/app/_types/Slider";

export default function FilterOptions() {
  const { filters, setFilters } = useContext(FilterContext);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Filters: </h1>
      {filters.map((filter: SliderSettings, index: number) => {
        return (
          <FilterSlider
            key={`${filter.label} Slider`}
            index={index}
            setFilters={setFilters}
            filters={filters}
          />
        );
      })}
    </>
  );
}
