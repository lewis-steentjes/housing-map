"use client";

import { APIProvider, Map, MapCameraChangedEvent, InfoWindow } from "@vis.gl/react-google-maps";
import { useEffect, useState, useContext } from "react";
import { getTradeMe } from "../../_utils/clientApi/tradeMeClient";
import PropertyMarker from "./PropertyMarker";
import { Listing } from "@/app/_types/Listing";
import filterProperties from "@/app/_utils/logic/filterProperties";
import { FilterContext } from "@/app/_utils/contexts/FilterContext";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapHandler() {
  const startingCoords = { lat: -43.5348688, lng: 172.642298 };
  const [bounds, setBounds] = useState({
    south: -43.549928803642516,
    west: 172.6249178523369,
    north: -43.51981267305107,
    east: 172.6596792811699,
  });

  const [properties, setProperties] = useState([]);
  const { filters } = useContext(FilterContext);
  const filteredProperties = filterProperties(filters, properties);
  const fetchProperties = async () => {
    setProperties(await getTradeMe(bounds));
  };

  const handleCameraChange = (ev: MapCameraChangedEvent) => {
    setBounds(ev.detail.bounds);
  };

  useEffect(() => {
    const timer = setTimeout(fetchProperties, 500);
    return () => clearTimeout(timer);
  }, [bounds]); // ESlint doesn't like this but it works. Probably better to execute this stuff in the event handler

  if (!API_KEY) {
    throw new Error("No API key found for Google Maps");
  }

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
        mapTypeId={"terrain"}
        onCameraChanged={handleCameraChange}
      >
        {/* Choose from: [hybrid, sattelite, roadmap, terrain]// who cares. terrain rules! */}
        {filteredProperties.map((property: Listing, index: number) => {
          return <PropertyMarker key={index} {...property} />;
        })}
      </Map>
    </APIProvider>
  );
}
