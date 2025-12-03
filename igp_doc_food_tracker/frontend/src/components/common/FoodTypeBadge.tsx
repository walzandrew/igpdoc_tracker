import { FOOD_TYPE_COLOR_MAP } from "../../constants/foodTypeColors";

type FoodTypeBadgeProps = {
  itType: string; // original Italian food_type
  engType: string; // english translation eng_food_type
};

export default function FoodTypeBadge({ itType, engType }: FoodTypeBadgeProps) {
  const key = engType;

  const bgColor = FOOD_TYPE_COLOR_MAP[key] ?? "var(--color-other)"; // fallback gray

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
