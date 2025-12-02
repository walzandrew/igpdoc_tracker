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
};

export type FoodFilters = {
  page?: number;
  category?: string;
  region?: string;
  province?: string;
  search?: string;
};

export type FoodListResponse = Food[];
