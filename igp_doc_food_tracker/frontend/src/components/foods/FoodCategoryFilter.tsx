type Props = {
  value: string | undefined;
  onChange: (category: string) => void;
};

export default function FoodCategoryFilter({ value, onChange }: Props) {
  return (
    <select
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      style={{ marginLeft: "1rem" }}
    >
      <option value="">All Categories</option>
      <option value="dop">D.O.P.</option>
      <option value="igp">I.G.P.</option>
      <option value="stg">S.T.G.</option>
    </select>
  );
}
