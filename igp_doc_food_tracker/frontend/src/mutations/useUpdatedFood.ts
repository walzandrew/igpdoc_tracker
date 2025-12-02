import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateFood } from "../api/foodApi";
import type { Food } from "../types";

export function useUpdateFood() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Food> }) =>
      updateFood(id, data),

    onSuccess: (updatedFood) => {
      // Update detailed cache entry
      queryClient.setQueryData(["food", updatedFood.id], updatedFood);

      // Update every cached "foods" list
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });
}
