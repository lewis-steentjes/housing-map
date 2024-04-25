import { APIProvider, Map, MapCameraChangedEvent, InfoWindow } from "@vis.gl/react-google-maps";
// import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { useCallback, useState } from "react";
import { LatLng, Bounds } from "../models/Maps";

interface Props {
  startingCoords: LatLng;
  setBounds: React.Dispatch<React.SetStateAction<Bounds>>;
}

export default function MapComp(props: Props) {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { startingCoords, setBounds } = props;

  const handleCameraChange = useCallback(
    (ev: MapCameraChangedEvent) => {
      setBounds(ev.detail.bounds);
    },
    [setBounds],
  );

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
