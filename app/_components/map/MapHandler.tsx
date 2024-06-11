"use client";

import { APIProvider, Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { useEffect, useState, useContext } from "react";
import { getTradeMe } from "../../_utils/clientApi/tradeMeClient";
import RentalMarker from "./RentalMarker";
import SaleMarker from "./SaleMarker";
import { Listing } from "@/app/_types/Listing";
import { FilterContext } from "@/app/_utils/contexts/FilterContext";
import { ModeContext } from "@/app/_utils/contexts/ModeContext";
import mergeProperties from "@/app/_utils/logic/mergeProperties";
import ModeSwitch from "../sidebar/ModeSwitch";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapHandler() {
  const startingCoords = useStoredCoords();
  // TODO : calculate starting bounds from starting coords
  const [bounds, setBounds] = useState({
    south: -43.549928803642516,
    west: 172.6249178523369,
    north: -43.51981267305107,
    east: 172.6596792811699,
  });
  const [prevBounds, setPrevBounds] = useState(bounds);
  const [history, setHistory] = useHistory();
  const [currInfoWindow, setCurrInfoWindow] = useState(0);
  const [properties, setProperties] = useState<Listing[]>([]);
  const { currentMode } = useContext(ModeContext);
  const { filters } = useContext(FilterContext);
  const [prevFilters, setPrevFilters] = useState(filters);
  const [prevMode, setPrevMode] = useState(currentMode);

  const fetchExtraProperties = async () => {
    const retProperties = await getTradeMe(bounds, filters, currentMode);
    setProperties(mergeProperties(retProperties, properties));
  };

  const fetchFreshProperties = async () => {
    const retProperties = await getTradeMe(bounds, filters, currentMode);
    setProperties(mergeProperties(retProperties, []));
  };

  const handleCameraChange = (ev: MapCameraChangedEvent) => {
    setBounds(ev.detail.bounds);
    localStorage.setItem("lastCoords", JSON.stringify(ev.detail.center));
  };

  useEffect(() => {
    if (currentMode != prevMode || filters != prevFilters) {
      setProperties([]);
      const timer = setTimeout(fetchFreshProperties, 350);
      setPrevMode(currentMode);
      setPrevFilters(filters);
      return () => clearTimeout(timer);
    }

    if (bounds != prevBounds) {
      setCurrInfoWindow(0);
      setPrevBounds(bounds);
    }
    const timer = setTimeout(fetchExtraProperties, 350);
    return () => clearTimeout(timer);
  }, [bounds, filters, currentMode]); // ESlint doesn't like this but it works. Probably better to execute this stuff in the event handler

  if (!API_KEY) {
    throw new Error("No API key found for Google Maps");
  }
  const rentMode = currentMode === "Rent";
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={startingCoords}
        mapId={"d4344f16ea531d98"}
        defaultZoom={15}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        clickableIcons={false}
        onCameraChanged={handleCameraChange}
      >
        {properties.map((property: Listing, index: number) => {
          return rentMode ? (
            <RentalMarker
              key={property.ListingId}
              property={property}
              bounds={bounds}
              history={history}
              setHistory={setHistory}
              currInfoWindow={currInfoWindow}
              setCurrInfoWindow={setCurrInfoWindow}
            />
          ) : (
            <SaleMarker
              key={property.ListingId}
              property={property}
              bounds={bounds}
              history={history}
              setHistory={setHistory}
              currInfoWindow={currInfoWindow}
              setCurrInfoWindow={setCurrInfoWindow}
            />
          );
        })}
      </Map>
    </APIProvider>
  );
}

const useHistory = () => {
  const [loadedHist, setLoadedHist] = useState({});
  useEffect(() => {
    const storedHist = localStorage.getItem("history");
    if (storedHist == null) {
      return;
    }
    setLoadedHist(JSON.parse(storedHist));
  }, []);

  return useState(loadedHist);
};

const useStoredCoords = () => {
  const [coords, setCoords] = useState('{"lat":-43.5348688,"lng":172.642298}');

  // component is mounted and window is available
  useEffect(() => {
    const storedCoords = localStorage.getItem("lastCoords");
    if (storedCoords == null) {
      return;
    }
    setCoords(storedCoords);
  }, []);

  return JSON.parse(coords);
};
