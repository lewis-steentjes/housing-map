import axios from "axios";
import { Bounds } from "@/app/_types/Maps";
import { SlidersObject } from "@/app/_types/Slider";
const rootUrl = "/api/v1/trademe";
import { Listing } from "@/app/_types/Listing";

export async function getTradeMe(bounds: Bounds, filters: SlidersObject) {
  const { north, south, east, west } = bounds;
  // console.log(filters);
  const searchParams = new URLSearchParams({
    latitude_max: String(north),
    latitude_min: String(south),
    longitude_max: String(east),
    longitude_min: String(west),
    bedrooms_min: String(filters.bedrooms.value),
    bathrooms_min: String(filters.bathrooms.value),
    price_min: String(filters.minPrice.value),
    price_max: String(filters.maxPrice.value),
    sort_order: "ExpiryDesc",
  });
  try {
    const result = await axios.get(rootUrl, { params: searchParams });
    return result.data.List as Listing[];
  } catch (error: any) {
    console.log("Error getting property listings.", error);
    return [] as Listing[];
  }
}
