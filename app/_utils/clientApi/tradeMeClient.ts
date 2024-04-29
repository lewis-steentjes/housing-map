import axios from "axios";
import { Bounds } from "@/app/_types/Maps";
const rootUrl = "/api/v1/trademe";
import { Listing } from "@/app/_types/Listing";

export async function getTradeMe(bounds: Bounds) {
  const { north, south, east, west } = bounds;
  const searchParams = new URLSearchParams({
    latitude_max: String(north),
    latitude_min: String(south),
    longitude_max: String(east),
    longitude_min: String(west),
  });
  try {
    const result = await axios.get(rootUrl, { params: searchParams });
    return result.data.List as Listing[];
  } catch (error: any) {
    return error;
  }
}
