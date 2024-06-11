import axios from "axios";
import { Bounds } from "@/app/_types/Maps";
import { SlidersObject } from "@/app/_types/Slider";
import { Listing } from "@/app/_types/Listing";
import { SuperSettings } from "../contexts/FilterContext";

const rootUrl = "/api/v1/trademe";

export async function getTradeMe(
  bounds: Bounds,
  filters: SuperSettings,
  currentMode: string,
): Promise<Listing[]> {
  if (currentMode == "Rent") {
    const proppos = await getRentals(bounds, filters[currentMode].filters);
    return proppos;
  } else {
    const proppos = await getPurchase(bounds, filters[currentMode].filters);
    return proppos;
  }
}

async function getRentals(bounds: Bounds, filters: SlidersObject): Promise<Listing[]> {
  const { north, south, east, west } = bounds;
  const searchParams = new URLSearchParams({
    latitude_max: String(north),
    latitude_min: String(south),
    longitude_max: String(east),
    longitude_min: String(west),
    bedrooms_min: String(filters.bedrooms.value),
    bathrooms_min: String(filters.bathrooms.value),
    price_min: String(filters.minPrice.value),
    price_max: String(2000000),
    sort_order: "ExpiryDesc",
  });
  try {
    const result = await axios.get(rootUrl + "/rentals", { params: searchParams });
    return result.data.List;
  } catch (error: any) {
    return [] as Listing[];
  }
}

async function getPurchase(bounds: Bounds, filters: SlidersObject): Promise<Listing[]> {
  const { north, south, east, west } = bounds;
  const searchParams = new URLSearchParams({
    latitude_max: String(north),
    latitude_min: String(south),
    longitude_max: String(east),
    longitude_min: String(west),
    bedrooms_min: String(filters.bedrooms.value),
    bathrooms_min: String(filters.bathrooms.value),
    price_min: String(filters.minPrice.value),
    price_max: String(2000000),
    sort_order: "ExpiryDesc",
  });
  try {
    const result = await axios.get(rootUrl + "/purchase", { params: searchParams });
    return result.data.List;
  } catch (error: any) {
    return [] as Listing[];
  }
}
