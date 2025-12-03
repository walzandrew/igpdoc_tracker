import { useState, useEffect, useRef } from "react";

import type { Food } from "../../types";
import FoodAccordionItem from "./FoodAccordionListItem";
import { useMapSelection } from "../../context/MapSelectionContext";
import { useFoods } from "../../queries/useFoods";
import { useFoodFilters } from "../../context/FoodFiltersContext";

type Props = {
  mapFlag: boolean;
};

export default function FoodAccordionList({ mapFlag }: Props) {
  // Obtain most current foods from cache
  const { filters } = useFoodFilters();
  const { data } = useFoods(filters);
  const foods = data || [];

  // Filter foods to active region if there is one
  const { activeRegion, activeProvince } = useMapSelection();

  const listRef = useRef<HTMLDivElement | null>(null);

  // Scroll to top whenever region or province changes
  useEffect(() => {
    console.log("Firing scroll");
    if (listRef.current) {
      listRef.current.scrollTop = 0;
      console.log("scrolling to top");
    }
  }, [activeRegion, activeProvince]);
  // Track currently open food ID (null = none open)
  const [openId, setOpenId] = useState<string | number | null>(null);

  const toggle = (id: string | number) => {
    setOpenId((current) => (current === id ? null : id));
  };

  // Define a function that will be used to filter by active region
  // or province if coming from map
  const filterFoods = (
    activeRegion: string | null,
    activeProvince: string | null,
    foods: Food[]
  ) => {
    return foods.filter((food) => {
      if (activeProvince) {
        return food.provinces.includes(activeProvince);
      } else if (activeRegion && activeRegion !== "ITALY" && !activeProvince) {
        return food.regions.includes(activeRegion);
      } else if (activeRegion === "ITALY") {
        return food;
      } else {
        return true;
      }
    });
  };

  // Filter foods if there is a map flag
  let filteredFoods: Food[] = [];
  if (mapFlag) {
    filteredFoods = filterFoods(activeRegion, activeProvince, foods);
  } else {
    filteredFoods = foods;
  }

  return (
    <div className="accordion-list" ref={listRef}>
      {filteredFoods.map((food) => (
        <FoodAccordionItem
          key={food.id}
          food={food}
          isOpen={openId === food.id}
          onToggle={() => toggle(food.id)}
        />
      ))}
    </div>
  );
}
