"use client";
import { getTradeMe } from "@/app/_utils/clientApi/tradeMeClient";
import { Bounds } from "@/app/_types/Maps";
import { SearchSettings } from "@/app/_types/Search";

interface Props {
  bounds: Bounds;
  searchSettings: SearchSettings;
}

export default function ApiQueryButton(props: Props) {
  const { bounds } = props;

  const handleClick = async () => {
    const result = await getTradeMe();
    console.log(result);
  };

  return (
    <>
      <br />
      <button onClick={handleClick} className="btn">
        Test Server
      </button>
      <br />
      <ul>
        <li>North: {bounds.north}</li>
        <li>South: {bounds.south}</li>
        <li>East: {bounds.east}</li>
        <li>West: {bounds.west}</li>
      </ul>
      <br />
      <span>Filter Options:</span>
      <br />
      <span>{JSON.stringify(props.searchSettings)}</span>
    </>
  );
}
