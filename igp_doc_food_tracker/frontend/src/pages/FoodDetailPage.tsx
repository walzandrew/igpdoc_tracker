import type { Food } from "../types";
import FoodEditForm from "../components/forms/FoodEditForm";
type Props = {
  food: Food;
  onClose: () => void;
};
export default function FoodDetailPage({ food, onClose }: Props) {
  return (
    <div>
      <FoodEditForm food={food} onClose={onClose} />
    </div>
  );
}
