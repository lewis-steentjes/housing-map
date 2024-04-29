import { InfoWindow, AdvancedMarker, useAdvancedMarkerRef, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";
import { Listing } from "@/app/_types/Listing";

export default function PropertyMarker(props: Listing) {
  const coords = { lat: props.GeographicLocation.Latitude, lng: props.GeographicLocation.Longitude };
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker ref={markerRef} position={coords} draggable={true}>
        <div
          className="bg-orange-600 hover:text-lg p-1 rounded-md"
          onMouseOver={() => setInfoWindowOpen(true)}
          onMouseOut={() => setInfoWindowOpen(false)}
        >
          <span className="text-white">{props.Title}</span>
        </div>
      </AdvancedMarker>

      {infoWindowOpen && (
        <InfoWindow anchor={marker} maxWidth={200} onCloseClick={() => setInfoWindowOpen(false)}>
          <span className="text-black">
            This is an example for the <code style={{ whiteSpace: "nowrap" }}>&lt;AdvancedMarker /&gt;</code>{" "}
            combined with an Infowindow.
          </span>
        </InfoWindow>
      )}
    </>
  );
}
