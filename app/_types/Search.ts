import { SlidersObject } from "./Slider";

export interface SearchSettings {
  Bathrooms: number;
  Bedrooms: number;
  minPrice: number;
  maxPrice: number;
  ListingAge: number;
}

interface FilterContextType {
  rentalFilters: SlidersObject;
  setRentalFilters: (value: SlidersObject) => void;
  auctionFilters: SlidersObject;
  setAuctionFilters: (value: SlidersObject) => void;
  currentMode: string;
  setCurrentMode: (value: string) => void;
}
