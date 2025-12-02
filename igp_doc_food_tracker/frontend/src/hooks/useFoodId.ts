import { useParams } from "react-router-dom";

export function useFoodId(): string {
  const { id } = useParams<{ id: string }>();
  console.log("Pulled the id from the url: " + id);
  return id;
}
