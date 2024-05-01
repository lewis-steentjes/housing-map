import { SearchSettings } from "@/app/_types/Search";
import { Listing } from "@/app/_types/Listing";

export default function filterProperties(filterSettings: SearchSettings, properties: Listing[]) {
  console.log("fs", filterSettings);
  console.log("props:", properties);
  return;
}
