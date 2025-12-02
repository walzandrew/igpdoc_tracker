import { useQuery } from "@tanstack/react-query";

import { getFoodById } from "../services/foodService";
import { fetchFoods } from "../api/foodApi";
import type { FoodFilters, Food, FoodListResponse } from "../types";

export function useFood(id: string | null) {
  return useQuery<Food>({
    queryKey: ["food", id],
    queryFn: () => (id ? getFoodById(id) : Promise.reject()),
    enabled: !!id, // don't run until ID is known
    staleTime: 1000 * 60 * 5,
  });
}

export function useFoods(filters: FoodFilters) {
  return useQuery<FoodListResponse>({
    queryKey: ["foods", filters],
    queryFn: () => fetchFoods(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
