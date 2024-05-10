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
  const [rentFilters, setRentalFilters] = useRentalFilters();
  const [purchaseFilters, setPurchaseFilters] = useAuctionFilters();
  const filters = {
    Rental: { filters: rentFilters, setFilters: setRentalFilters },
    Purchase: { filters: purchaseFilters, setFilters: setPurchaseFilters },
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
        <ModeContext.Provider value={{ currentMode, setCurrentMode }}>
          <FilterContext.Provider
            value={{
              filters,
            }}
          >
            {/* <HistoryContext.Provider value={{ history, setHistory }}> */}
            <MapHandler />
            {/* </HistoryContext.Provider> */}

            <SidebarContainer />
          </FilterContext.Provider>
        </ModeContext.Provider>
      </QueryClientProvider>
    </>
  );
}
