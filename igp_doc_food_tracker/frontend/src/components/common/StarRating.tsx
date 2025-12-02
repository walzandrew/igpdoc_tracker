import { useState } from "react";

type StarRatingProps = {
  value: number; // 0–5
  onChange: (value: number) => void;
  max?: number; // default: 5
};

export default function StarRating({
  value,
  onChange,
  max = 5,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayValue = hovered ?? value;

  return (
    <div className="star-rating" role="radiogroup" aria-label="Rating">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
        const filled = star <= displayValue;

        return (
          <button
            key={star}
            type="button"
            className={`star ${filled ? "filled" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChange(star)}
            aria-checked={value === star}
            role="radio"
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
