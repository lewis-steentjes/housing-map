import { Listing } from "@/app/_types/Listing";
import { SlidersObject } from "@/app/_types/Slider";

export default function filterProperties(filterSettings: SlidersObject, properties: Listing[]) {
  // If there are no properties, return an empty array
  if (properties?.length === 0 || properties == undefined) {
    return properties;
  }

  // Filter properties based on the filter settings
  // Filtering on the client side is not recommended for large datasets
  // However, it does allow for a more responsive UI
  const filteredBedrooms = properties.filter((property) => {
    return property.Bedrooms >= filterSettings.bedrooms.value;
  });
  const filteredBathrooms = filteredBedrooms.filter((property) => {
    return property.Bathrooms >= filterSettings.bathrooms.value;
  });
  const filteredMinPrice = filteredBathrooms.filter((property) => {
    return property.RentPerWeek >= filterSettings.minPrice.value;
  });
  const filteredMaxPrice = filteredMinPrice.filter((property) => {
    return property.RentPerWeek <= filterSettings.maxPrice.value;
  });

  return filteredMaxPrice;
}
