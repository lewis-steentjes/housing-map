"use client";

import { APIProvider, Map, MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { useEffect, useState, useContext } from "react";
import { getTradeMe } from "../../_utils/clientApi/tradeMeClient";
import PropertyMarker from "./PropertyMarker";
import { Listing } from "@/app/_types/Listing";
import { FilterContext } from "@/app/_utils/contexts/FilterContext";
import mergeProperties from "@/app/_utils/logic/mergeProperties";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapHandler() {
  const startingCoords = { lat: -43.5348688, lng: 172.642298 };
  const [bounds, setBounds] = useState({
    south: -43.549928803642516,
    west: 172.6249178523369,
    north: -43.51981267305107,
    east: 172.6596792811699,
  });
  const [history, setHistory] = useState({});
  const [properties, setProperties] = useState<Listing[]>([]);
  const { filters, currentMode } = useContext(FilterContext);
  const fetchProperties = async () => {
    const retProperties = await getTradeMe(bounds, filters[currentMode].filters);

    console.log("🏡", retProperties);
    setProperties(mergeProperties(retProperties, properties));
  };

  const handleCameraChange = (ev: MapCameraChangedEvent) => {
    setBounds(ev.detail.bounds);
  };

  useEffect(() => {
    const timer = setTimeout(fetchProperties, 500);
    return () => clearTimeout(timer);
  }, [bounds, filters]); // ESlint doesn't like this but it works. Probably better to execute this stuff in the event handler

  // Invalidate cached properties if the user changes their filter settings
  useEffect(() => {
    setProperties([]);
  }, [filters]);

  if (!API_KEY) {
    throw new Error("No API key found for Google Maps");
  }
  console.log(properties);
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
          return (
            <PropertyMarker
              key={property.ListingId}
              property={property}
              bounds={bounds}
              history={history}
              setHistory={setHistory}
            />
          );
        })}
        <div className="bg-[#0000FFAA] w-12 h-10 absolute bottom-0 right-0 rounded-md m-4 flex justify-center items-center ">
          <span className="text-2xl">{properties.length}</span>
        </div>
      </Map>
    </APIProvider>
  );
}
