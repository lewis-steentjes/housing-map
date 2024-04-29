"use client";

import SidebarContainer from "./_components/sidebar/SidebarContainer";
import MapHandler from "./_components/MapHandler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useFilters from "./_utils/hooks/useFilters";
import { FilterContext } from "./_utils/contexts/FilterContext";

export default function Home() {
  const queryClient = new QueryClient();
  const [filters, setFilters] = useFilters();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FilterContext.Provider value={{ filters, setFilters }}>
          <MapHandler />

          <SidebarContainer />
        </FilterContext.Provider>
      </QueryClientProvider>
    </>
  );
}
