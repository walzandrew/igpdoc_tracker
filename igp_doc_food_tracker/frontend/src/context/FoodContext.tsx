import { createContext, useContext, useEffect, useState } from "react";

import { fetchFoods } from "../api/foodApi";
import type { Food } from "../types";

type FoodContextType = {
  foods: Food[];
  loading: boolean;
  error: string | null;
};

const FoodContext = createContext<FoodContextType>({
  foods: [],
  loading: true,
  error: null,
});

export function FoodProvider({ children }: { children: React.ReactNode }) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAllPages() {
      try {
        let allFoods: Food[] = [];
        let page = 1;
        let next = true;

        while (next) {
          const res = await fetchFoods({ page });
          allFoods = [...allFoods, ...res.results];

          if (res.next) {
            page += 1;
          } else {
            next = false;
          }
        }

        setFoods(allFoods);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadAllPages();
  }, []);

  return (
    <FoodContext.Provider value={{ foods, loading, error }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFoodsContext() {
  return useContext(FoodContext);
}
