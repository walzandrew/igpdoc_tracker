// Generic paginated API response from Django REST Framework
// export type PaginatedResponse<T> = {
//   count: number;
//   next: string | null;
//   previous: string | null;
//   results: T[];
// };

// Generic GeoJSON Point
export type GeoPoint = {
  type: "Point";
  coordinates: [number, number];
};

export type FoodIndex = {
  id: string; // or number, depending on your Django model
  denomination: string;
};
