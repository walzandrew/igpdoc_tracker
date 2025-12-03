import FoodCategoryBadge from "../common/FoodCategoryBadge";
import type { Food } from "../../types";
import FoodTypeBadge from "../common/FoodTypeBadge";

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
        <FoodCategoryBadge
          text={food.category}
          variant={food.category as "dop" | "igp" | "stg"}
        />
        <FoodTypeBadge
          itType={food.food_type}
          engType={food.food_type_eng}
        ></FoodTypeBadge>
      </div>
    </div>
  );
}
