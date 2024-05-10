import { Listing } from "@/app/_types/Listing";

// Since we are wanting to potentially store a lot of properties, then check against the whole list of stored properties
// for every query, we need to use binary search for it's nlog(n) properties

function binarySearch(propertyId: number, properties: Listing[]) {
  const midPoint = Math.floor(properties.length / 2);
  if (properties.length == 1) {
    if (properties[0].ListingId == propertyId) {
      return true;
    } else {
      return false;
    }
  }
  if (properties[midPoint].ListingId > propertyId) {
    return binarySearch(propertyId, [...properties.slice(0, midPoint)]);
  }
  if (properties[midPoint].ListingId < propertyId) {
    return binarySearch(propertyId, [...properties.slice(midPoint)]);
  }
  if (properties[midPoint].ListingId === propertyId) {
    return true;
  }
  throw new Error("Binary search exploded");
}

function addProperty(property: Listing, neighbourhood: Listing[]) {
  // Use binary search to see if proprty is in neighbourhood
  if (binarySearch(property.ListingId, neighbourhood)) {
    return neighbourhood;
  } else {
    neighbourhood.push(property);
    neighbourhood.sort((a, b) => a.ListingId - b.ListingId);
    return neighbourhood;
  }
}

export default function mergeProperties(homes: Listing[], neighbourhood: Listing[]) {
  if (neighbourhood.length === 0) {
    return homes;
  }
  for (let i = 0; i < homes.length; i++) {
    addProperty(homes[i], neighbourhood);
  }
  return neighbourhood;
}
