import { Listing } from "@/app/_types/Listing";
import { InfoWindow } from "@vis.gl/react-google-maps";
import Image from "next/image";
import { useEffect } from "react";
import "../../_styles/markers.css";

interface Props {
  details: Listing;
  // marker: any;
  setInfoWindowOpen: (status: boolean) => void;
}

export default function PropertyInfo(props: Props) {
  // Sample date string
  const baseURL = "https://www.tmsandbox.co.nz/";
  const listingURL = baseURL + "a/" + props.details.ListingId;

  return (
    <div className="flex flex-row rounded-lg w-[20rem] h-[7.5rem] bg-info border-solid border-2 border-content-muted">
      {props.details.PictureHref ? (
        <img
          src={props.details.PictureHref}
          alt="Image of Property"
          className="ml-0 w-2/5 object-cover rounded-l-md border-r-2 border-primary"
        />
      ) : (
        <img
          src={"/no-image-found4.jpg"}
          alt="No Property Found"
          className="ml-0 w-2/5 object-cover rounded-l-lg"
        />
      )}
      <div className="flex flex-col justify-around items-center w-3/5">
        <div className="text-black text-sm text-right">Available {props.details.AvailableFrom} </div>
        <div className="grid grid-cols-2 justify-items-center gap-2">
          <div className="text-black content-center">🛏️ {props.details.Bedrooms} </div>
          <div className="text-black">🐈 {props.details.PetsOkay ? "✅" : "❌"} </div>
          <div className="text-black">🛁 {props.details.Bathrooms} </div>
          <div className="text-black">🚬 {props.details.SmokersOkay ? "✅" : "❌"} </div>
        </div>
      </div>
    </div>
  );
}
