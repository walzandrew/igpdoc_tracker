import FoodListFilters from "../components/foods/FoodListFilters";
import FoodAccordionList from "../components/foods/FoodAccordionList";
import type { FoodFilters } from "../types";
import { useFoods } from "../queries/useFoods";
import { useFoodFilters } from "../context/FoodFiltersContext";

export default function FoodListPage() {
  const { filters, setFilters, resetFilters } = useFoodFilters();
  const { isLoading, error } = useFoods(filters);

  const handleFilterChange = (
    key: keyof FoodFilters,
    value: string | number | null
  ) => setFilters((prev) => ({ ...prev, [key]: value }));

  const handleSearch = (term: string) =>
    setFilters((prev) => ({ ...prev, search: term.trim() }));

  const handleClearFilters = () => resetFilters();

  if (isLoading) return <p>Loading foods…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="page">
      <h1>Available Foods</h1>

      <FoodListFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onClear={handleClearFilters}
      />

      <FoodAccordionList mapFlag={false} />
    </div>
  );
}
