"use client";

import { APIProvider, Map, MapCameraChangedEvent, InfoWindow } from "@vis.gl/react-google-maps";
// import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useCallback, useState } from "react";
import { LatLng, Bounds } from "../_types/Maps";
import { getTradeMe } from "../_utils/clientApi/tradeMeClient";
import { useQuery } from "@tanstack/react-query";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapHandler() {
  const startingCoords = { lat: -43.5348688, lng: 172.642298 };
  const [bounds, setBounds] = useState({
    south: -43.549928803642516,
    west: 172.6249178523369,
    north: -43.51981267305107,
    east: 172.6596792811699,
  });
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getProperties"],
    queryFn: async () => {
      const res = await getTradeMe(bounds);
      return res;
    },
    retryDelay: 1000,
  });

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => {
      setBounds(ev.detail.bounds);
    },
    [setBounds],
  );

  if (!API_KEY) {
    throw new Error("No API key found for Google Maps");
  }

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    console.log(error);
    return <div>Error...........{JSON.stringify(error)}</div>;
  }

  console.log(data);

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
        {/* Choose from: [hybrid, sattelite, roadmap, terrain] */}
        <InfoWindow position={startingCoords}>
          <span className="text-black">Saltworks</span>
        </InfoWindow>
      </Map>
    </APIProvider>
  );
}
