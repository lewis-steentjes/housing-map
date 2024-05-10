"use client";

import SidebarContainer from "./_components/sidebar/SidebarContainer";
import MapHandler from "./_components/map/MapHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useRentalFilters from "./_utils/hooks/useRentalFilters";
import { FilterContext } from "./_utils/contexts/FilterContext";
import useHistory from "./_utils/hooks/useHistory";
import { HistoryContext } from "./_utils/contexts/HistoryContext";
import useAuctionFilters from "./_utils/hooks/useAuctionFilters";
import { useState } from "react";

export default function Home() {
  const queryClient = new QueryClient();
  const [rentalFilters, setRentalFilters] = useRentalFilters();
  const [auctionFilters, setAuctionFilters] = useAuctionFilters();
  const filters = {
    Rental: { filters: rentalFilters, setFilters: setRentalFilters },
    Auction: { filters: auctionFilters, setFilters: setAuctionFilters },
  };
  const [currentMode, setCurrentMode] = useState("Rental");
  // const [history, setHistory] = useHistory();
  // console.log("hist", history);
  // const newhist = history;
  // newhist.set("Roger", "seen");
  // console.log("nhis", newhist);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FilterContext.Provider
          value={{
            currentMode,
            setCurrentMode,
            filters,
          }}
        >
          {/* <HistoryContext.Provider value={{ history, setHistory }}> */}
          <MapHandler />
          {/* </HistoryContext.Provider> */}

          <SidebarContainer />
        </FilterContext.Provider>
      </QueryClientProvider>
    </>
  );
}
