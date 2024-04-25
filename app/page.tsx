"use client";

import SidebarContainer from "./_components/sidebar/SidebarContainer";
import MapHandler from "./_components/MapHandler";
import { useState } from "react";
import { Bounds } from "./_types/Maps";

function boundsToCenter(bounds: Bounds) {
  return {
    lat: (bounds.south + bounds.north) / 2,
    lng: (bounds.west + bounds.east) / 2,
  };
}
export default function Home() {
  const [bounds, setBounds] = useState({
    south: -43.549928803642516,
    west: 172.6249178523369,
    north: -43.51981267305107,
    east: 172.6596792811699,
  });
  const [startingCoords] = useState(boundsToCenter(bounds));
  return (
    <>
      <MapHandler startingCoords={startingCoords} setBounds={setBounds} />
      <SidebarContainer bounds={bounds} />
    </>
  );
}
