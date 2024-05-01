export interface SliderSettings {
  value: number;
  valueMax?: number;
  min: number;
  max: number;
  step: number;
  discrete: boolean;
  colour: string;
  label: string;
  unit: string;
}

export interface SlidersObject {
  bedrooms: SliderSettings;
  bathrooms: SliderSettings;
  price: SliderSettings;
  listingAge: SliderSettings;
  [key: string]: SliderSettings;
}
