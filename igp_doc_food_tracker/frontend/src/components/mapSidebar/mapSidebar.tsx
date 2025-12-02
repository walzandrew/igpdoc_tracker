import { useEffect, useRef } from "react";

import "./mapSidebar.css";
import { useFoods } from "../../queries/useFoods";
import FoodAccordionList from "../foods/FoodAccordionList";
import { useMapSelection } from "../../context/MapSelectionContext";
import { useFoodFilters } from "../../context/FoodFiltersContext";

export default function MapSidebar() {
  const { filters } = useFoodFilters();
  const { isLoading, error } = useFoods(filters);
  const { activeRegionName, activeProvinceName } = useMapSelection();

  const listRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top whenever region or province changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [activeRegionName, activeProvinceName]);

  // Unpack foods from data
  return (
    <div className={`sidebar-container`}>
      <div className="sidebar-header">
        <h2>Foods in: {activeProvinceName ?? activeRegionName}</h2>
      </div>
      <div className="sidebar-content">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!isLoading && !error && <FoodAccordionList mapFlag={true} />}
      </div>
    </div>
  );
}
