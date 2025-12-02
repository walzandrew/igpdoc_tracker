import Modal from "../common/Modal";
import FoodDetailPage from "../../pages/FoodDetailPage";
import type { Food } from "../../types";

type Props = {
  food: Food;
  onClose: () => void;
};

export default function FoodDetailModal({ food, onClose }: Props) {
  return (
    <Modal onClose={onClose}>
      <FoodDetailPage food={food} onClose={onClose} />
    </Modal>
  );
}
