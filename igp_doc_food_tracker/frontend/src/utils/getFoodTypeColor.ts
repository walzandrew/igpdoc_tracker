import type { EnglishFoodType } from "../types";
import { FOOD_TYPE_COLOR_MAP } from "../constants/foodTypeColors";

export function getFoodTypeColor(type: EnglishFoodType): string {
  return FOOD_TYPE_COLOR_MAP[type] || "var(--color-default)";
}
