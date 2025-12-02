export * from "./common";
export * from "./food";
export * from "./region";
export * from "./province";
export * from "./context";

export type FoodIndex = {
  id: string;
  denomination: string;
};

export type FoodFilters = {
  search: string;
  category: string;
  region: string | null;
  province: string | null;
};
