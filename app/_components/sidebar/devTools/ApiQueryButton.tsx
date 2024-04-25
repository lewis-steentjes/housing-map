"use client";
import { getTradeMe } from "@/app/_utils/clientApi/tradeMeClient";

export default function ApiQueryButton() {
  const handleClick = async () => {
    const result = await getTradeMe();
    console.log(result);
  };

  return (
    <>
      <button onClick={handleClick} className="btn">
        Test Server
      </button>
    </>
  );
}
