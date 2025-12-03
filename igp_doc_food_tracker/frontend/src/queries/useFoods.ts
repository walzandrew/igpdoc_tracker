import { useQuery } from "@tanstack/react-query";

import { fetchFoods } from "../api/foodApi";
import type { FoodFilters, FoodListResponse } from "../types";

export function useFoods(filters: FoodFilters) {
  return useQuery<FoodListResponse>({
    queryKey: ["foods", filters],
    queryFn: () => fetchFoods(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
