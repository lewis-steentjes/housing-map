import { AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { Listing } from "@/app/_types/Listing";
import PropertyInfo from "./PropertyInfo";
import reformatTitle from "@/app/_utils/logic/reformatTitle";

export default function PropertyMarker(props: Listing) {
  const coords = { lat: props.GeographicLocation.Latitude, lng: props.GeographicLocation.Longitude };
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const baseURL = "https://www.tmsandbox.co.nz/";
  const listingURL = baseURL + "a/" + props.ListingId;
  return (
    <>
      <AdvancedMarker ref={markerRef} position={coords} draggable={true}>
        <a href={listingURL} target="_blank">
          {/* TO DO: MAKE KEYBOARD NAVIGATABLE */}
          <button
            className="bg-orange-600 hover:text-lg p-1 rounded-md"
            onMouseOver={() => setInfoWindowOpen(true)}
            onMouseOut={() => setInfoWindowOpen(false)}
            onClick={() => console.log(listingURL)}
          >
            <span className="text-white whitespace-pre-line text-center">{reformatTitle(props.Title)}</span>
          </button>
        </a>
      </AdvancedMarker>

      {infoWindowOpen && <PropertyInfo marker={marker} details={props} />}
    </>
  );
}
