"use client";

import { SliderSettings, SlidersObject } from "@/app/_types/Slider";

interface Props {
  setFilters: (sliders: SlidersObject) => void;
  filters: SlidersObject;
  filter: string;
}

export default function FilterSlider(props: Props) {
  const { filters, setFilters, filter } = props;
  const { value, min, max, step, discrete, colour, label, unit } = filters[filter];
  let display = value + unit;
  // Consider implementing a useReducer function here
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters };
    newFilters[filter].value = parseInt(event.target.value);
    setFilters(newFilters);
  };

  // Later on, we can add a check for unlimited values
  // if (value >= max) {
  //   display = "Unlimited";
  // }

  return (
    <>
      <div className="flex flex-row justify-between">
        <span className="ml-2">{label}</span>
        <span className="mr-2">{display}</span>
      </div>
      <div>
        <input
          onChange={(event) => handleChange(event)}
          type="range"
          min={min}
          max={max}
          defaultValue={value}
          className="range range-primary bg-accent"
          step={step}
        />
        <div></div>
      </div>
    </>
  );
}
