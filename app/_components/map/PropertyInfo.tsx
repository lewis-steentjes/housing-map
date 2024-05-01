import { Listing } from "@/app/_types/Listing";
import { InfoWindow } from "@vis.gl/react-google-maps";
import Image from "next/image";

interface Props {
  details: Listing;
  marker: any;
}

export default function PropertyInfo(props: Props) {
  // Sample date string
  const baseURL = "https://www.tmsandbox.co.nz/";
  const listingURL = baseURL + "a/" + props.details.ListingId;

  return (
    <a href={listingURL} target="_blank">
      <InfoWindow
        anchor={props.marker}
        maxWidth={400}
        disableAutoPan={true}
        pixelOffset={{
          width: 0,
          height: 5,
          equals: () => false,
        }}
      >
        {props.details.PictureHref ? (
          <img src={props.details.PictureHref} alt="Image of Property" className="w-full" />
        ) : (
          <img src={"/no-image-found4.jpg"} alt="No Property Found" className="w-auto mx-auto" />
        )}
        <div className="text-black pb-2 pt-2">Available {props.details.AvailableFrom} </div>
        <div className="grid grid-cols-2 justify-items-center">
          <div className="text-black content-center">🛏️ {props.details.Bedrooms} </div>
          <div className="text-black">🐈 {props.details.PetsOkay ? "✅" : "❌"} </div>
          <div className="text-black">🛁 {props.details.Bathrooms} </div>
          <div className="text-black">🚬 {props.details.SmokersOkay ? "✅" : "❌"} </div>
        </div>
      </InfoWindow>
    </a>
  );
}
