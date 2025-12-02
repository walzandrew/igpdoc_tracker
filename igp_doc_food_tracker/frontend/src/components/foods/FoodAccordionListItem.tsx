import { useState } from "react";

import type { Food } from "../../types";
import FoodDetailModal from "./FoodDetailModal";

type Props = {
  food: Food;
  isOpen: boolean;
  onToggle: () => void;
};

export default function FoodAccordionItem({ food, isOpen, onToggle }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="accordion-item">
      <button
        className={`accordion-header ${isOpen ? "active" : ""}`}
        onClick={onToggle}
      >
        <span>
          <strong>{food.denomination}</strong> ({food.category.toUpperCase()})
        </span>
      </button>

      {isOpen && (
        <div className="accordion-body">
          <p>
            <strong>Type:</strong> {food.food_type}
          </p>
          <p>
            <strong>Eaten:</strong> {food.eaten ? "Yes" : "No"}
          </p>
          <button
            className="btn"
            onClick={() => setModalOpen(true)}
            style={{ marginTop: "0.5rem" }}
          >
            View Details
          </button>
          {modalOpen && (
            <FoodDetailModal food={food} onClose={() => setModalOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
}
