import { useEffect, useRef } from "react";

import { useFoods } from "../../queries/useFoods";
import FoodAccordionList from "../foods/FoodAccordionList";
import { useMapSelection } from "../../context/MapSelectionContext";
import { useFoodFilters } from "../../context/FoodFiltersContext";

type Props = {
  open: boolean;
  toggleOpenClose: () => void;
};

export default function MapSidebar({ open, toggleOpenClose }: Props) {
  const { filters } = useFoodFilters();
  const { isLoading, error } = useFoods(filters);
  const { activeRegionName, activeProvinceName } = useMapSelection();
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const listRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top whenever region or province changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [activeRegionName, activeProvinceName]);

  // Unpack foods from data
  return (
    <div className={`map-sidebar ${open ? "open" : "closed"}`}>
      <button className="map-sidebar-tab" onClick={toggleOpenClose}>
        {isMobile ? (open ? "v" : "^") : open ? ">" : "<"}
      </button>
      <div className="sidebar-header">
        <h2>Foods in: {activeProvinceName ?? activeRegionName}</h2>
      </div>
      <div className="sidebar-content">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!isLoading && !error && (
          <div style={{ overflowY: "scroll" }}>
            <FoodAccordionList mapFlag={true} />
          </div>
        )}
      </div>
    </div>
  );
}
