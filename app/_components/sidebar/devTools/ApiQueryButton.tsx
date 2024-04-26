"use client";
import { getTradeMe } from "@/app/_utils/clientApi/tradeMeClient";
import { Bounds } from "@/app/_types/Maps";
import { SearchSettings } from "@/app/_types/Search";

interface Props {
  searchSettings: SearchSettings;
}

export default function ApiQueryButton(props: Props) {
  const handleClick = async () => {
    const result = await getTradeMe(bounds);
    console.log(result);
  };

  return (
    <>
      <br />
      <button onClick={handleClick} className="btn">
        Test Server
      </button>
      <br />
      <br />
      <span>Filter Options:</span>
      <br />
      <span>{JSON.stringify(props.searchSettings)}</span>
    </>
  );
}
