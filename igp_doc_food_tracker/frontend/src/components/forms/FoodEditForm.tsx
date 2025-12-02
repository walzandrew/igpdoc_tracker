import { useState } from "react";

import { useUpdateFood } from "../../mutations/useUpdatedFood";
import type { Food } from "../../types";
import StarRating from "../common/StarRating";
import ToggleSwitch from "../common/ToggleSwitch";
import FoodHeader from "./FoodFormHeader";

type FoodEditFormProps = {
  food: Food;
  onClose: () => void;
};

export default function FoodEditForm({ food, onClose }: FoodEditFormProps) {
  const [form, setForm] = useState({
    eaten: food.eaten,
    notes: food.notes ?? "",
    user_rating: food.user_rating ?? 0,
    loc_eaten: food.loc_eaten ?? "",
  });

  const updateFoodMutation = useUpdateFood();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // convenience helper
  function updateField<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // await updateFood(String(food.id), food.denomination, form);
      updateFoodMutation.mutate({
        id: String(food.id),
        data: form,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
      onClose();
    }
  }

  return (
    <form onSubmit={handleSave} className="food-form">
      <FoodHeader food={food} />

      {/* Eaten toggle */}
      <div className="form-group">
        <ToggleSwitch
          label="Eaten?"
          value={form.eaten}
          onChange={(val) => updateField("eaten", val)}
        />
      </div>

      {/* Rating input */}
      <div className="form-group">
        <label>Rating</label>
        <StarRating
          value={form.user_rating ?? 0}
          onChange={(val) => updateField("user_rating", val)}
        />
      </div>

      {/* Notes */}
      <div className="form-group">
        <label>Notes</label>
        <textarea
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          rows={4}
        />
      </div>

      {/* Location eaten */}
      <div className="form-group">
        <label>Location eaten</label>
        <input
          type="text"
          value={form.loc_eaten}
          onChange={(e) => updateField("loc_eaten", e.target.value)}
        />
      </div>

      {/* ACTION BUTTONS */}
      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}

      <div className="form-buttons" style={{ marginTop: "1.2rem" }}>
        <button type="button" className="btn" onClick={onClose}>
          Cancel
        </button>
        <button
          type="submit"
          className="btn"
          disabled={saving}
          style={{ marginLeft: "0.5rem" }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
