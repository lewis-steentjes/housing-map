"use client";

import SidebarContainer from "./_components/sidebar/SidebarContainer";
import MapHandler from "./_components/MapHandler";
import { Bounds } from "./_types/Maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function boundsToCenter(bounds: Bounds) {
  return {
    lat: (bounds.south + bounds.north) / 2,
    lng: (bounds.west + bounds.east) / 2,
  };
}

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MapHandler />
        <SidebarContainer />
      </QueryClientProvider>
    </>
  );
}
