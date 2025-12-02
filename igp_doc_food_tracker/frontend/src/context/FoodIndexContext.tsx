import React, { createContext, useState, useEffect, useContext } from "react";

import { fetchFoodIndex } from "../api/foodApi";
import type { FoodIndex } from "../types";

type FoodIndexContextType = {
  index: FoodIndex[];
  validIds: string[];
  loading: boolean;
  error: string | null;
  isValidId: (id: string) => boolean;
};

export const FoodIndexContext = createContext<FoodIndexContextType | undefined>(
  undefined
);

export function FoodIndexProvider({ children }: { children: React.ReactNode }) {
  // Load cached values synchronously (fast startup)
  const cached = (() => {
    try {
      const raw = localStorage.getItem("foodIndex");
      return raw ? (JSON.parse(raw) as FoodIndex[]) : [];
    } catch {
      return [];
    }
  })();

  const [index, setIndex] = useState<FoodIndex[]>(cached);
  const [loading, setLoading] = useState(cached.length === 0);
  const [error, setError] = useState<string | null>(null);

  // Background refresh
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const fresh = await fetchFoodIndex();
        if (!cancelled) {
          setIndex(fresh);
          localStorage.setItem("foodIndex", JSON.stringify(fresh));
        }
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const validIds = index.map((f) => String(f.id));
  const isValidId = (id: string) => validIds.includes(id);

  return (
    <FoodIndexContext.Provider
      value={{ index, validIds, loading, error, isValidId }}
    >
      {children}
    </FoodIndexContext.Provider>
  );
}

export function useFoodIndex() {
  const ctx = useContext(FoodIndexContext);
  if (!ctx)
    throw new Error("useFoodIndex must be used within a FoodIndexProvider");
  return ctx;
}
