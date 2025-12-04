import { useState } from "react";

type Props = {
  onSearch: (value: string) => void;
  initialValue?: string;
};

export default function FoodSearchBar({ onSearch, initialValue = "" }: Props) {
  const [value, setValue] = useState(initialValue);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        style={{ border: "1px solid #ccc", borderRadius: "6px" }}
        placeholder="Search for a food..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch(value.trim());
        }}
      />
      <button
        onClick={() => onSearch(value.trim())}
        style={{ marginLeft: "0.5rem" }}
      >
        Search
      </button>
    </div>
  );
}
