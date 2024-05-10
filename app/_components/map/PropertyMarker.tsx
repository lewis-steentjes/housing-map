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
  const [moneyBackground, setMoneyBackground] = useState("#59981A");
  // const moneyBackground = "#4F8717";
  // Close info window when component is re-rendered
  // useEffect(() => {
  //   setInfoWindowOpen(false);
  // }, [props.bounds]);

  useEffect(() => {
    if (history[property.ListingId] === true) {
      // Set money colour to seen
      setMoneyText("#E4E896");
      setMoneyBackground("#4F8717");
    } else {
      // Set money colour to unseen
      setMoneyText("#FEFE4D");
      setMoneyBackground("#59981A");
    }
  }, [props.bounds, history, property.ListingId]);

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
  const markerHeight = Number(infoWindowOpen) * 18 + 2.25 + "rem";
  return (
    <AdvancedMarker ref={markerRef} position={coords} draggable={true} zIndex={Number(infoWindowOpen) * 5}>
      <div className={`flex flex-col justify-end items-center `}>
        <a
          href={listingURL}
          target="_blank"
          className={"flex flex-col justify-end items-center text-base hover:text-lg  duration-150"}
          style={{ filter: `drop-shadow(0.1rem 0.1rem 0.2rem ${listingColour})` }}
          onTouchStart={handleTap}
          onMouseOver={handleHoverOn}
          onMouseOut={handleHoverOff}
        >
          <div
            className={`marker-money ${balatro.className} `}
            style={{ color: `${moneyText}`, background: `${moneyBackground}` }}
          >
            {reformatTitle(property.Title)}
          </div>
          <div className="marker-triangle" style={{ "border-top": `0.5rem solid ${moneyBackground}` }}></div>
        </a>
        <a href={listingURL} target="_blank" className="marker-info text-base">
          {infoWindowOpen && <PropertyInfo setInfoWindowOpen={setInfoWindowOpen} details={property} />}
        </a>
      </div>
    </AdvancedMarker>
  );
}
