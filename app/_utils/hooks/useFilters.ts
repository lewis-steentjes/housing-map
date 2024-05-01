import { SliderSettings } from "@/app/_types/Slider";
import { useState } from "react";

export default function useFilters() {
  const bathrooms: SliderSettings = {
    value: 1,
    min: 1,
    max: 5,
    step: 1,
    discrete: true,
    colour: "blue",
    label: "Bathrooms",
    unit: "+",
  };

  const bedrooms: SliderSettings = {
    value: 1,
    min: 1,
    max: 5,
    step: 1,
    discrete: true,
    colour: "blue",
    label: "Bedrooms",
    unit: "+",
  };

  const minPrice: SliderSettings = {
    value: 0,
    valueMax: 1500,
    min: 0,
    max: 1500,
    step: 10,
    discrete: false,
    colour: "green",
    label: "Min. Price",
    unit: ".00$",
  };
  const maxPrice: SliderSettings = {
    value: 1500,
    valueMax: 1500,
    min: 0,
    max: 1500,
    step: 10,
    discrete: false,
    colour: "green",
    label: "Max. Price",
    unit: ".00$",
  };

  const listingAge: SliderSettings = {
    value: 1,
    min: 1,
    max: 30,
    step: 1,
    discrete: true,
    colour: "red",
    label: "Max. Listing Age",
    unit: " days",
  };

  return useState({ bathrooms, bedrooms, minPrice, maxPrice, listingAge });
}
