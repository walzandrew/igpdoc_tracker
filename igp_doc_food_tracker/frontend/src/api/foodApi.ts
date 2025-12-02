import type { FoodFilters, Food, FoodIndex } from "../types";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchFoods(filters: FoodFilters): Promise<Food[]> {
  const params = new URLSearchParams();

  params.append("page", String(filters.page));
  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);
  if (filters.region) params.append("region", filters.region);
  if (filters.province) params.append("province", filters.province);

  const url = `${API_BASE_URL}/foods/?${params.toString()}`;
  console.log("Fetching from url: " + url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch foods: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch a reference list to use as verification of food data items
 */
export async function fetchFoodIndex(): Promise<FoodIndex[]> {
  const res = await fetch(`${API_BASE_URL}/foods/index/`);
  if (!res.ok) {
    throw new Error("Failed to fetch food index");
  }
  return await res.json();
}

export async function updateFood(
  id: string,
  updates: Partial<Food>
): Promise<Food> {
  const response = await fetch(`${API_BASE_URL}/foods/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error(`Failed to update food with id ${id}`);
  }

  return await response.json();
}
