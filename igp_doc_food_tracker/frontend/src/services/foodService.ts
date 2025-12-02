import { fetchFoods } from "../api/foodApi";
import type { Food, PaginatedResponse, FoodFilters } from "../types";

export async function getFoods(
  filters: FoodFilters = {}
): Promise<Food | PaginatedResponse<Food>> {
  return await fetchFoods(filters);
}

export async function getFoodById(id: string): Promise<Food> {
  const result = await fetchFoods({ id });
  return result as Food;
}
