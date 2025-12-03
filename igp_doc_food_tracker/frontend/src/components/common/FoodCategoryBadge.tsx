type FoodCategoryBadgeProps = {
  text: string;
  variant: "dop" | "igp" | "stg";
};

export default function FoodCategoryBadge({
  text,
  variant,
}: FoodCategoryBadgeProps) {
  return <span className={`badge badge-${variant}`}>{text}</span>;
}
