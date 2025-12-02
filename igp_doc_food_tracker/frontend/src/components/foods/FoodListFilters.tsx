import { useState } from "react";

import type { FoodFilters } from "../../types";

type Props = {
  filters: FoodFilters;
  onFilterChange: (
    key: keyof FoodFilters,
    value: string | number | null
  ) => void;
  onSearch: (term: string) => void;
  onClear: () => void;
};

export default function FoodListFilters({
  filters,
  onFilterChange,
  onSearch,
  onClear,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const triggerSearch = () => {
    const term = searchTerm.trim();
    onSearch(term);
  };

  return (
    <div className="filters-container" style={{ marginBottom: "1rem" }}>
      {/* Search Input */}
      <input
        type="text"
        className="input"
        placeholder="Search foods..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") triggerSearch();
        }}
        style={{ padding: "0.6rem", marginRight: "0.5rem" }}
      />

      {/* Search Button */}
      <button className="btn" onClick={triggerSearch}>
        Search
      </button>

      {/* Category Selector */}
      <select
        className="select"
        value={filters.category ?? ""}
        onChange={(e) => onFilterChange("category", e.target.value)}
        style={{ marginLeft: "1rem" }}
      >
        <option value="">All Categories</option>
        <option value="dop">D.O.P.</option>
        <option value="igp">I.G.P.</option>
        <option value="stg">S.T.G.</option>
      </select>

      {/* Clear Filters Button */}
      <button
        className="btn"
        onClick={onClear}
        style={{ marginLeft: "1rem", backgroundColor: "#eee" }}
      >
        Clear
      </button>
    </div>
  );
}
