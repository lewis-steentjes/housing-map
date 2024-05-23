import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useContext, useEffect, useState } from "react";
import { Listing } from "@/app/_types/Listing";
import reformatTitle from "@/app/_utils/logic/reformatTitle";
import freshnessToColour from "@/app/_utils/logic/freshnessToColour";
import "../../_styles/markers.css";
import localFont from "next/font/local";
import { Bounds } from "@/app/_types/Maps";
import RentalInfo from "./RentalInfo";

const balatro = localFont({ src: "../../../public/fonts/balatro.otf" });

interface Props {
  property: Listing;
  bounds: Bounds;
  history: History;
  setHistory: (value: History) => void;
  currInfoWindow: number;
  setCurrInfoWindow: (value: number) => void;
}
interface History {
  [key: number]: boolean;
}

export default function SaleMarker(props: Props) {
  const { bounds, property, history, setHistory, currInfoWindow, setCurrInfoWindow } = props;
  const [prevBounds, setPrevBounds] = useState<Bounds>(bounds);

  const coords = { lat: property.GeographicLocation.Latitude, lng: property.GeographicLocation.Longitude };

  const [moneyText, setMoneyText] = useState("#FEFE02");
  const [moneyBackground, setMoneyBackground] = useState("#59981A");
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
  }, [bounds, history, property.ListingId, props, prevBounds]);

  const baseURL = "https://www.tmsandbox.co.nz/";
  const listingURL = baseURL + "a/" + property.ListingId;
  // Defined a date to be considered "old" for the purpose of determining how new a listing is ~Feb 11 2015
  const oldDate = new Date(1423621117193);
  const currDate = new Date();
  // const listingDate = Date.parse(props.StartDate);
  const listingTimestamp = property.StartDate.match(/\d+/);
  // !!!!!REMOVE THIS BIT LATER AND MAKE IT WORK NICER!!!!!!!!!!!!!!!!!!!!!!
  if (!listingTimestamp) {
    console.log("No timestamp found for listing. ", property.ListingId);
    return null;
  }

  // This can all be put inside freshnessToColour.ts
  const listingDate = new Date(Number(listingTimestamp[0]));
  // Define a value to consider a listing maximally fresh
  const maxFresh = currDate.valueOf() - oldDate.valueOf();
  const freshness = (listingDate.valueOf() - oldDate.valueOf()) / maxFresh;
  const listingColour = freshnessToColour(freshness);

  const handleTap = () => {
    setCurrInfoWindow(property.ListingId);
    if (!infoWindowOpen) {
      const newHist: History = { ...history };
      newHist[property.ListingId] = true;
      setHistory(newHist);
    }
  };

  const handleHoverOn = () => {
    setCurrInfoWindow(property.ListingId);
  };

  const handleHoverOff = () => {
    setCurrInfoWindow(0);
    const newHist: History = { ...history };
    newHist[property.ListingId] = true;
    setHistory(newHist);
  };
  const price = property.PriceDisplay;
  const infoWindowOpen = currInfoWindow == property.ListingId;
  return (
    <AdvancedMarker position={coords} draggable={true} zIndex={Number(infoWindowOpen) * 5}>
      <div className={`flex flex-col justify-end items-center `}>
        <a
          href={listingURL}
          target="_blank"
          className={
            "flex flex-col justify-end items-center text-base hover:text-lg hover:pb-1  duration-150"
          }
          style={
            !history[property.ListingId]
              ? { filter: `drop-shadow(0.0rem 0.0rem 0.2rem ${listingColour})` }
              : { filter: `drop-shadow(0.0rem 0.0rem 0.1rem #00000088)` }
          }
          onTouchStart={handleTap}
          onMouseOver={handleHoverOn}
          onMouseLeave={handleHoverOff}
        >
          <div
            className={`marker-money ${balatro.className} `}
            style={{ color: `${moneyText}`, background: `${moneyBackground}` }}
          >
            {price}
          </div>
          <div className="marker-triangle" style={{ borderTop: `0.5rem solid ${moneyBackground}` }}></div>
        </a>
        <a href={listingURL} target="_blank" className="marker-info text-base">
          <RentalInfo infoWindowOpen={infoWindowOpen} details={property} />
        </a>
      </div>
    </AdvancedMarker>
  );
}
