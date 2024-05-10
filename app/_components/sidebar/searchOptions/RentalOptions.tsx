"use client";

import FilterSlider from "./FilterSlider";
import { useContext } from "react";
import { FilterContext } from "@/app/_utils/contexts/FilterContext";
import FilterDoubleSlider from "./FilterDoubleSlider";

export default function RentalOptions() {
  const { filters } = useContext(FilterContext);
  const [rentalFilters, setRentalFilters] = [filters.Rent.filters, filters.Rent.setFilters];
  return (
    <div className="mt-2">
      <FilterSlider filter={"bedrooms"} setFilters={setRentalFilters} filters={rentalFilters} />
      <FilterSlider filter={"bathrooms"} setFilters={setRentalFilters} filters={rentalFilters} />
      {/* <FilterSlider filter={"listingAge"} setFilters={setFilters} filters={filters} /> */}
      <FilterSlider filter={"minPrice"} setFilters={setRentalFilters} filters={rentalFilters} />
      <FilterSlider filter={"maxPrice"} setFilters={setRentalFilters} filters={rentalFilters} />
    </div>
  );
}
