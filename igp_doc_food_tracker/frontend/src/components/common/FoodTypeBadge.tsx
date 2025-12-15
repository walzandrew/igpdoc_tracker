import { getFoodTypeColor } from "../../utils/getFoodTypeColor";
import type { EnglishFoodType, ItalianFoodType } from "../../types";

type FoodTypeBadgeProps = {
  itType: ItalianFoodType; // original Italian food_type
  engType: EnglishFoodType; // english translation eng_food_type
};

export default function FoodTypeBadge({ itType, engType }: FoodTypeBadgeProps) {
  const bgColor = getFoodTypeColor(engType);

  return (
    <span
      className="food-type-badge tooltip"
      data-tooltip={itType}
      style={{ backgroundColor: bgColor }}
    >
      {engType}
    </span>
  );
}
