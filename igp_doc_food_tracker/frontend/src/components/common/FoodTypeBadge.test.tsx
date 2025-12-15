import { render, screen } from "@testing-library/react";

import FoodTypeBadge from "./FoodTypeBadge";

test("renders English food type and shows tooltip", () => {
  render(
    <FoodTypeBadge itType="Prodotti a base di carne" engType="Meat Products" />
  );

  expect(screen.getByText("Meat Products")).toBeInTheDocument();
});
