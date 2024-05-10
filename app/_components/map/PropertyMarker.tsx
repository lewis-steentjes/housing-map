import { AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useContext, useEffect, useState } from "react";
import { Listing } from "@/app/_types/Listing";
import PropertyInfo from "./PropertyInfo";
import reformatTitle from "@/app/_utils/logic/reformatTitle";
import freshnessToColour from "@/app/_utils/logic/freshnessToColour";
import "../../_styles/markers.css";
import localFont from "next/font/local";
import { Bounds } from "@/app/_types/Maps";

const balatro = localFont({ src: "../../../public/fonts/balatro.otf" });

interface Props {
  property: Listing;
  bounds: Bounds;
  history: History;
  setHistory: (value: History) => void;
}
interface History {
  [key: number]: boolean;
}

export default function PropertyMarker(props: Props) {
  const { bounds, property, history, setHistory } = props;
  const coords = { lat: property.GeographicLocation.Latitude, lng: property.GeographicLocation.Longitude };

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [moneyText, setMoneyText] = useState("#FEFE02");

  // Close info window when component is re-rendered
  useEffect(() => {
    setInfoWindowOpen(false);
  }, [props.bounds]);

  useEffect(() => {
    if (history[property.ListingId] === true) {
      console.log("👩‍🔧", property.ListingId);
      setMoneyText("#bb8d37");
    } else {
      console.log("oioi 💀", property.ListingId);
      setMoneyText("#FEFE02");
    }
  }, [props.bounds, property.ListingId, history]);

  const [markerRef, marker] = useAdvancedMarkerRef();
  const baseURL = "https://www.tmsandbox.co.nz/";
  const listingURL = baseURL + "a/" + property.ListingId;
  // Defined a date to be considered "old" for the purpose of determining how new a listing is ~Feb 11 2015
  const oldDate = new Date(1423621117193);
  const currDate = new Date();
  // const listingDate = Date.parse(props.StartDate);
  const listingTimestamp = property.StartDate.match(/\d+/);
  // !!!!!REMOVE THIS BIT LATER AND MAKE IT WORK NICER!!!!!!!!!!!!!!!!!!!!!!
  if (!listingTimestamp) {
    console.log("No timestamp found for listing: ", property.ListingId);
    return null;
  }
  const listingDate = new Date(Number(listingTimestamp[0]));
  // Define a value to consider a listing maximally fresh
  const maxFresh = currDate.valueOf() - oldDate.valueOf();
  const freshness = (listingDate.valueOf() - oldDate.valueOf()) / maxFresh;
  const listingColour = freshnessToColour(freshness);

  const handleTap = () => {
    setInfoWindowOpen(!infoWindowOpen);
    const newHist: History = { ...history };
    newHist[property.ListingId] = true;
    setHistory(newHist);
  };

  const handleHoverOn = () => {
    setInfoWindowOpen(true);
  };

  const handleHoverOff = () => {
    setInfoWindowOpen(false);
    const newHist: History = { ...history };
    newHist[property.ListingId] = true;
    setHistory(newHist);
  };

  // Add size to flex container for info/marker if info box opens.
  const markerHeight = Number(infoWindowOpen) * 7.75 + 2.5 + "rem";
  return (
    <div className="relative">
      <AdvancedMarker ref={markerRef} position={coords} draggable={true} zIndex={Number(infoWindowOpen) * 5}>
        <div className="flex flex-col items-center justify-between" style={{ height: markerHeight }}>
          <a href={listingURL} target="_blank">
            {infoWindowOpen && <PropertyInfo setInfoWindowOpen={setInfoWindowOpen} details={property} />}
          </a>
          <a
            href={listingURL}
            target="_blank"
            className={`marker-container text-base hover:text-lg `}
            style={{ filter: `drop-shadow(0rem 0rem 0.2rem ${listingColour})` }}
            onMouseOver={handleHoverOn}
            onMouseOut={handleHoverOff}
            onTouchStart={handleTap}
          >
            <div className={`marker-money ${balatro.className} `} style={{ color: `${moneyText}` }}>
              {reformatTitle(property.Title)}
            </div>
            <div className="marker-triangle "></div>
          </a>
        </div>
      </AdvancedMarker>
    </div>
  );
}
