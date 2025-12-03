export type Food = {
  id: number;
  denomination: string;
  category: "igp" | "dop" | "stg";
  food_type: string;
  regions: string[];
  provinces: string[];
  recipe?: string;
  image_fp?: string;
  notes?: string;
  user_rating?: number;
  eaten: boolean;
  loc_eaten?: string;
  point_eaten?: {
    type: string;
    coordinates: [number, number];
  } | null;
  food_type_eng: string;
};

export type FoodFilters = {
  page?: number;
  category?: string;
  region?: string;
  province?: string;
  search?: string;
};

export type FoodListResponse = Food[];

export type EnglishFoodType =
  | "Other Plant Products"
  | "Other Animal Products"
  | "Fresh Meats"
  | "Chocolate Products"
  | "Cheeses"
  | "Oils and Fats"
  | "Essential Oils"
  | "Fruits, Vegetables and Grains"
  | "Pasta Products"
  | "Fresh Seafood (Fish, Shellfish, Mollusks)"
  | "Prepared Meals"
  | "Meat Products"
  | "Bread and Pastry Products"
  | "Salt"
  | "Aromatized Wines";
