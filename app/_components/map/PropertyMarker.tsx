import { AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Listing } from "@/app/_types/Listing";
import PropertyInfo from "./PropertyInfo";
import reformatTitle from "@/app/_utils/logic/reformatTitle";
import freshnessToColour from "@/app/_utils/logic/freshnessToColour";

export default function PropertyMarker(props: Listing) {
  const coords = { lat: props.GeographicLocation.Latitude, lng: props.GeographicLocation.Longitude };
  // TESTING
  // Close info window when component is re-rendered
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  useEffect(() => {
    setInfoWindowOpen(false);
  }, [props]);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const baseURL = "https://www.tmsandbox.co.nz/";
  const listingURL = baseURL + "a/" + props.ListingId;
  // Defined a date to be considered "old" for the purpose of determining how new a listing is ~Feb 11 2015
  const oldDate = new Date(1423621117193);
  const currDate = new Date();
  // const listingDate = Date.parse(props.StartDate);
  const listingTimestamp = props.StartDate.match(/\d+/);
  if (!listingTimestamp) {
    console.log("No timestamp found for listing: ", props.ListingId);
    return null;
  }
  const listingDate = new Date(Number(listingTimestamp[0]));
  // Define a value to consider a listing maximally fresh
  const maxFresh = currDate.valueOf() - oldDate.valueOf();
  const freshness = (listingDate.valueOf() - oldDate.valueOf()) / maxFresh;
  // const newListingDate = new Date(props.StartDate);
  const listingColour = freshnessToColour(freshness);
  const handleTap = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  return (
    <>
      <AdvancedMarker ref={markerRef} position={coords} draggable={true}>
        <a href={listingURL} target="_blank">
          {/* TO DO: MAKE KEYBOARD NAVIGATABLE */}
          <button
            className={"hover:text-lg p-1 rounded-md"}
            style={{ backgroundColor: listingColour, color: "black" }}
            onMouseOver={() => setInfoWindowOpen(true)}
            onMouseOut={() => setInfoWindowOpen(false)}
            onTouchStart={handleTap}
          >
            <span className="text-black whitespace-pre-line text-center">{reformatTitle(props.Title)}</span>
          </button>
        </a>
      </AdvancedMarker>

      {infoWindowOpen && (
        <PropertyInfo setInfoWindowOpen={setInfoWindowOpen} marker={marker} details={props} />
      )}
    </>
  );
}
