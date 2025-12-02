// // src/pages/FoodDetailPage.tsx
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import { useFoodId } from "../hooks/useFoodId";
// import { useFoodIndex } from "../context/FoodIndexContext";
// import { getFoodById } from "../services/foodService";
// import type { Food } from "../types";
// import Modal from "../components/common/Modal";
// import FoodEditForm from "../components/forms/FoodEditForm";

// type Props = {
//   modal?: boolean;
//   food: Food;
// };

// export default function FoodDetailPage({ food }: Props) {
//   console.log("Rendering FoodDetailPage for food: ", food);
//   const navigate = useNavigate();
//   const close = () => navigate(-1);

//   // const id = useFoodId();
//   // const {
//   //   loading: indexLoading,
//   //   error: indexError,
//   //   isValidId,
//   // } = useFoodIndex();

//   // // const [food, setFood] = useState<Food | null>(null);
//   // const [loading, setLoading] = useState(false);
//   // const [error, setError] = useState<string | null>(null);

//   // useEffect(() => {
//   //   if (!id) {
//   //     setError("No ID provided.");
//   //     return;
//   //   }
//   //   if (indexLoading) {
//   //     // Wait until we know IDs; don’t set error or loading here
//   //     return;
//   //   }
//   //   if (indexError) {
//   //     setError("Failed to load food index.");
//   //     return;
//   //   }
//   //   if (!isValidId(id)) {
//   //     setError(`Invalid food ID: ${id}`);
//   //     return;
//   //   }

//   //   let cancelled = false;
//   //   (async () => {
//   //     setLoading(true);
//   //     try {
//   //       // const data = await getFoodById(id);
//   //       // if (!cancelled) setFood(data);
//   //       console.log("Fetching food details for id: " + id);
//   //     } catch (err) {
//   //       if (!cancelled) setError((err as Error).message);
//   //     } finally {
//   //       if (!cancelled) setLoading(false);
//   //     }
//   //   })();

//   //   return () => {
//   //     cancelled = true;
//   //   };
//   // }, [id, indexLoading, indexError, isValidId]);

//   // // Priority rendering: index first, then details, then errors
//   // if (indexLoading) return <p>Loading food index...</p>;
//   // if (loading) return <p>Loading food details...</p>;
//   // if (error)
//   //   return (
//   //     <div>
//   //       <p>Error: {error}</p>
//   //       <Link
//   //         to="/foods"
//   //         style={{ display: "inline-block", marginTop: "1rem" }}
//   //       >
//   //         ← Back to Food List
//   //       </Link>
//   //     </div>
//   //   );
//   // if (!food) return <p>Food not found.</p>;

//   const content = <FoodEditForm food={food} onClose={close} />;

//   return <Modal onClose={close}>{content}</Modal>;
// }
import type { Food } from "../types";
import FoodEditForm from "../components/forms/FoodEditForm";
type Props = {
  food: Food;
  onClose: () => void;
};
export default function FoodDetailPage({ food, onClose }: Props) {
  return (
    <div>
      <FoodEditForm food={food} onClose={onClose} />
    </div>
  );
}
