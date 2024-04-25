"use client";

import { SliderSettings } from "@/app/_types/Slider";

interface Props {
  setFilters: (sliders: SliderSettings[]) => void;
  filters: SliderSettings[];
  index: number;
}

export default function FilterSlider(props: Props) {
  const { filters, setFilters, index } = props;
  const { value, min, max, step, discrete, colour, label, unit } = filters[index];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = [...filters];
    newFilters[index].value = parseInt(event.target.value);
    setFilters(newFilters);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <span>{label}</span>
        <span>
          {value} {unit}
        </span>
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
