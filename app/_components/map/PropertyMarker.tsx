import { AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Listing } from "@/app/_types/Listing";
import PropertyInfo from "./PropertyInfo";
import reformatTitle from "@/app/_utils/logic/reformatTitle";
import freshnessToColour from "@/app/_utils/logic/freshnessToColour";
import "../../_styles/markers.css";
import localFont from "next/font/local";

const balatro = localFont({ src: "../../../public/fonts/balatro.otf" });

export default function PropertyMarker(props: Listing) {
  const coords = { lat: props.GeographicLocation.Latitude, lng: props.GeographicLocation.Longitude };

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  // TESTING
  // Close info window when component is re-rendered
  // useEffect(() => {
  //   setInfoWindowOpen(false);
  // }, [props]);

  const [markerRef, marker] = useAdvancedMarkerRef();
  const baseURL = "https://www.tmsandbox.co.nz/";
  const listingURL = baseURL + "a/" + props.ListingId;
  // Defined a date to be considered "old" for the purpose of determining how new a listing is ~Feb 11 2015
  const oldDate = new Date(1423621117193);
  const currDate = new Date();
  // const listingDate = Date.parse(props.StartDate);
  const listingTimestamp = props.StartDate.match(/\d+/);
  // !!!!!REMOVE THIS BIT LATER AND MAKE IT WORK NICER!!!!!!!!!!!!!!!!!!!!!!
  if (!listingTimestamp) {
    console.log("No timestamp found for listing: ", props.ListingId);
    return null;
  }
  const listingDate = new Date(Number(listingTimestamp[0]));
  // Define a value to consider a listing maximally fresh
  const maxFresh = currDate.valueOf() - oldDate.valueOf();
  const freshness = (listingDate.valueOf() - oldDate.valueOf()) / maxFresh;
  const listingColour = freshnessToColour(freshness);

  // const newListingDate = new Date(props.StartDate);

  const handleTap = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  return (
    <div className="relative">
      <AdvancedMarker ref={markerRef} position={coords} draggable={true} zIndex={Number(infoWindowOpen) * 5}>
        <div className="flex flex-col items-center gap-2">
          <a href={listingURL} target="_blank">
            {infoWindowOpen && <PropertyInfo setInfoWindowOpen={setInfoWindowOpen} details={props} />}
          </a>
          <a
            href={listingURL}
            target="_blank"
            className={`marker-container text-base hover:text-lg `}
            style={{ filter: `drop-shadow(0rem 0rem 0.2rem ${listingColour})` }}
            onMouseOver={() => setInfoWindowOpen(true)}
            // onMouseOut={() => setInfoWindowOpen(false)}
            onTouchStart={handleTap}
          >
            <div className={`marker-money ${balatro.className} `}>{reformatTitle(props.Title)}</div>
            <div className="marker-triangle "></div>
          </a>
        </div>
      </AdvancedMarker>
    </div>
  );
}
