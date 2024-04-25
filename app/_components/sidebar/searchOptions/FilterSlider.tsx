"use client";

import { SliderSettings } from "@/app/_types/Slider";

interface Props {
  setSliders: (sliders: SliderSettings[]) => void;
  sliders: SliderSettings[];
  index: number;
}

export default function FilterSlider(props: Props) {
  const { sliders, setSliders, index } = props;
  const { value, min, max, step, discrete, colour, label, unit } = sliders[index];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSliders = [...sliders];
    newSliders[index].value = parseInt(event.target.value);
    setSliders(newSliders);
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
