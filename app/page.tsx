"use client";

import SidebarContainer from "./_components/sidebar/SidebarContainer";
import MapHandler from "./_components/map/MapHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useFilters from "./_utils/hooks/useFilters";
import { FilterContext } from "./_utils/contexts/FilterContext";
import useHistory from "./_utils/hooks/useHistory";
import { HistoryContext } from "./_utils/contexts/HistoryContext";

export default function Home() {
  const queryClient = new QueryClient();
  const [filters, setFilters] = useFilters();
  // const [history, setHistory] = useHistory();
  // console.log("hist", history);
  // const newhist = history;
  // newhist.set("Roger", "seen");
  // console.log("nhis", newhist);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FilterContext.Provider value={{ filters, setFilters }}>
          {/* <HistoryContext.Provider value={{ history, setHistory }}> */}
          <MapHandler />
          {/* </HistoryContext.Provider> */}

          <SidebarContainer />
        </FilterContext.Provider>
      </QueryClientProvider>
    </>
  );
}
