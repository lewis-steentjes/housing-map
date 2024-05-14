"use client";

import SidebarContainer from "./_components/sidebar/SidebarContainer";
import MapHandler from "./_components/map/MapHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useRentalFilters from "./_utils/hooks/useRentalFilters";
import { FilterContext } from "./_utils/contexts/FilterContext";
import useHistory from "./_utils/hooks/useHistory";
import { HistoryContext } from "./_utils/contexts/HistoryContext";
import { ModeContext } from "./_utils/contexts/ModeContext";
import useAuctionFilters from "./_utils/hooks/useAuctionFilters";
import { useState } from "react";

export default function Home() {
  const queryClient = new QueryClient();
  const [currentMode, setCurrentMode] = useState("Rent");

  const [rentFilters, setRentalFilters] = useRentalFilters();
  const [purchaseFilters, setPurchaseFilters] = useAuctionFilters();
  const filters = {
    Rent: { filters: rentFilters, setFilters: setRentalFilters },
    Purchase: { filters: purchaseFilters, setFilters: setPurchaseFilters },
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FilterContext.Provider value={{ filters }}>
          <ModeContext.Provider value={{ currentMode, setCurrentMode }}>
            {/* <HistoryContext.Provider value={{ history, setHistory }}> */}
            <MapHandler />
            {/* </HistoryContext.Provider> */}

            <SidebarContainer />
          </ModeContext.Provider>
        </FilterContext.Provider>
      </QueryClientProvider>
    </>
  );
}
