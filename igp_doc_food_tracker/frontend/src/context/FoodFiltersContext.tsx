import { createContext, useContext, useState } from "react";

import type { FoodFilters } from "../types";

const defaultFilters: FoodFilters = {
  search: "",
  category: "",
  region: null,
  province: null,
};

type FoodFiltersContextValue = {
  filters: FoodFilters;
  setFilters: React.Dispatch<React.SetStateAction<FoodFilters>>;
  resetFilters: () => void;
};

const FoodFiltersContext = createContext<FoodFiltersContextValue>({
  filters: defaultFilters,
  setFilters: () => {},
  resetFilters: () => {},
});

export function FoodFiltersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [filters, setFilters] = useState<FoodFilters>(defaultFilters);

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <FoodFiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
      {children}
    </FoodFiltersContext.Provider>
  );
}

export const useFoodFilters = () => useContext(FoodFiltersContext);
