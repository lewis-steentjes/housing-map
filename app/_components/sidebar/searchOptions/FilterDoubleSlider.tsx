"use client";

import { SliderSettings, SlidersObject } from "@/app/_types/Slider";

interface Props {
  setFilters: (sliders: SlidersObject) => void;
  filters: SlidersObject;
  filter: string;
}

export default function FilterSlider(props: Props) {
  const { filters, setFilters, filter } = props;
  const { value, min, max, step, discrete, colour, label, unit, valueMax } = filters[filter];

  // Consider implementing a useReducer function here
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters };
    newFilters[filter].value = parseInt(event.target.value);
    setFilters(newFilters);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <span className="ml-2">{label}</span>
        <span className="mr-2">{value + unit}</span>
      </div>
      <div>
        <input
          onChange={(event) => handleChange(event)}
          type="range"
          min={min}
          max={max}
          defaultValue={value}
          className="range range-primary bg-transparent absolute z-10"
          step={step}
        />
        <input
          onChange={(event) => handleChange(event)}
          type="range"
          min={min}
          max={max}
          defaultValue={valueMax}
          className="range range-primary bg-transparent absolute z-10"
          step={step}
        />
      </div>
    </>
  );
}
