import "./styles/index.css";
import MapComp from "./components/MapComp";
import SidebarContainer from "./components/SidebarContainer";
import { useEffect, useState } from "react";

function boundsToCenter(bounds) {
  return {
    lat: (bounds.south + bounds.north) / 2,
    lng: (bounds.west + bounds.east) / 2,
  };
}

export default function App() {
  const [bounds, setBounds] = useState({
    south: -43.549928803642516,
    west: 172.6249178523369,
    north: -43.51981267305107,
    east: 172.6596792811699,
  });

  // useEffect(() => {
  //   console.log("bounds", bounds);
  // }, [bounds]);

  const [startingCoords /* , setStartingCoords */] = useState(boundsToCenter(bounds));
  return (
    <>
      <MapComp startingCoords={startingCoords} setBounds={setBounds} />
      <SidebarContainer />
    </>
  );
}
