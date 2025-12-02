import { Link } from "react-router-dom";

import type { Food } from "../../types";
import "./FoodsList.css";

type FoodListProps = {
  foods: Food[];
};

export default function FoodList({ foods }: FoodListProps) {
  if (!foods.length) return <p>No foods found.</p>;

  return (
    <ul className="food-list">
      {foods.map((food) => (
        <li key={food.id} className="food-item">
          {/* ✅ Wrap denomination in a router link */}
          <Link to={`/foods/${food.id}`} className="food-link">
            <strong>{food.denomination}</strong>
          </Link>{" "}
          ({food.category.toUpperCase()})
        </li>
      ))}
    </ul>
  );
}
