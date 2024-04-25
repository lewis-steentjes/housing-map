import { getTradeMe } from "@/app/_utils/clientApi/tradeMeClient";

export default function ApiQueryButton() {
  const handleClick = async () => {
    console.log(JSON.stringify(await getTradeMe()));
  };

  return (
    <>
      <button onClick={handleClick} className="btn">
        Test Server
      </button>
    </>
  );
}
