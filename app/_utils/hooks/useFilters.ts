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

  const price: SliderSettings = {
    value: 500,
    min: 100,
    max: 1000,
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

  return useState([bathrooms, bedrooms, price, listingAge]);
}
