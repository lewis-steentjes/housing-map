"use client";

import { APIProvider, Map, MapCameraChangedEvent, InfoWindow } from "@vis.gl/react-google-maps";
// import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useCallback } from "react";
import { LatLng, Bounds } from "../_types/Maps";

interface Props {
  startingCoords: LatLng;
  setBounds: React.Dispatch<React.SetStateAction<Bounds>>;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function MapHandler(props: Props) {
  const { startingCoords, setBounds } = props;

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => {
      setBounds(ev.detail.bounds);
    },
    [setBounds],
  );

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
        {/* Choose from: [hybrid, sattelite, roadmap, terrain] */}
        <InfoWindow position={startingCoords}>
          <span className="text-black">Saltworks</span>
        </InfoWindow>
      </Map>
    </APIProvider>
  );
}
