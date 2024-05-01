"use client";

import FilterSlider from "./FilterSlider";
import { useContext } from "react";
import { FilterContext } from "@/app/_utils/contexts/FilterContext";
import FilterDoubleSlider from "./FilterDoubleSlider";

export default function FilterOptions() {
  const { filters, setFilters } = useContext(FilterContext);
  return (
    <div className="mt-2">
      <FilterSlider filter={"bedrooms"} setFilters={setFilters} filters={filters} />
      <FilterSlider filter={"bathrooms"} setFilters={setFilters} filters={filters} />
      {/* <FilterSlider filter={"listingAge"} setFilters={setFilters} filters={filters} /> */}
      <FilterSlider filter={"minPrice"} setFilters={setFilters} filters={filters} />
      <FilterSlider filter={"maxPrice"} setFilters={setFilters} filters={filters} />
    </div>
  );
}
