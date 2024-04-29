import { Listing } from "@/app/_types/Listing";
import { InfoWindow } from "@vis.gl/react-google-maps";

interface Props {
  details: Listing;
  marker: any;
}

export default function PropertyInfo(props: Props) {
  const contentStr = `
    <div class="flex flex-col">
      <img src=${props.details.PictureHref} alt=${props.details.Title} className="w-64 h-auto info-image" />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">${props.details.Title}</h1>
        <p className="text-lg">${props.details.PriceDisplay}</p>
        <p className="text-lg">${props.details.Address}</p>
        <p className="text-lg">${props.details.Bedrooms} Bedrooms</p>
        <p className="text-lg">${props.details.Bathrooms} Bathrooms</p>
        <p className="text-lg">{props.details.CarParks} Car Parks</p>
      </div>
    </div>`;
  return (
    <InfoWindow anchor={props.marker} maxWidth={400} pixelOffset={{ width: 0, height: 5 }}>
      <img src={props.details.PictureHref} alt={props.details.Title} className="w-64 h-auto info-image" />
    </InfoWindow>
  );
}
