import Badge from "../common/Badge";
import type { Food } from "../../types";

type FoodHeaderProps = {
  food: Food;
};

export default function FoodHeader({ food }: FoodHeaderProps) {
  return (
    <div className="food-header">
      {/* Food Name */}
      <h2 className="food-header-title">{food.denomination}</h2>

      {/* Badges Row */}
      <div className="food-header-badges">
        <Badge
          text={food.category}
          variant={food.category as "dop" | "igp" | "stg"}
        />

        <Badge text={food.food_type} variant="type" />
      </div>
    </div>
  );
}
