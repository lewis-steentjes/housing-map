"use client";

import { useState } from "react";
import FilterSlider from "./FilterSlider";

export default function FilterOptions() {
  const [sliders, setSliders] = useState([
    { label: "Bathrooms", min: 0, max: 5, step: 1, value: 3, unit: "", discrete: true, colour: "green" },
    { label: "Bedrooms", min: 0, max: 5, step: 1, value: 3, unit: "", discrete: true, colour: "green" },
    {
      label: "Price",
      min: 150,
      max: 950,
      step: 10,
      value: 500,
      unit: "$",
      discrete: true,
      colour: "green",
    },
    {
      label: "Listing Age",
      min: 0,
      max: 21,
      step: 1,
      value: 7,
      unit: " days",
      discrete: true,
      colour: "green",
    },
  ]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Filters: </h1>
      {sliders.map((slider, index) => {
        return (
          <FilterSlider
            key={`${slider.label} Slider`}
            index={index}
            setSliders={setSliders}
            sliders={sliders}
          />
        );
      })}
    </>
  );
}