"use client";

import FilterSlider from "./FilterSlider";
import { useContext } from "react";
import { FilterContext } from "@/app/_utils/contexts/FilterContext";
import FilterDoubleSlider from "./FilterDoubleSlider";

export default function AuctionOptions() {
  const { filters } = useContext(FilterContext);
  const [auctionFilters, setAuctionFilters] = [filters.Purchase.filters, filters.Purchase.setFilters];

  return (
    <div className="mt-2">
      <FilterSlider filter={"bedrooms"} setFilters={setAuctionFilters} filters={auctionFilters} />
      <FilterSlider filter={"bathrooms"} setFilters={setAuctionFilters} filters={auctionFilters} />
      {/* <FilterSlider filter={"listingAge"} setFilters={setFilters} filters={filters} /> */}
      <FilterSlider filter={"minPrice"} setFilters={setAuctionFilters} filters={auctionFilters} />
      <FilterSlider filter={"maxPrice"} setFilters={setAuctionFilters} filters={auctionFilters} />
    </div>
  );
}
