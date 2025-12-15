import { render, screen } from "@testing-library/react";

import FoodTypeBadge from "./FoodTypeBadge";

test("renders English food type and shows tooltip", () => {
  render(<FoodTypeBadge itType="salumi" engType="Meat Products" />);

  expect(screen.getByText("Cured Meats")).toBeInTheDocument();
});
