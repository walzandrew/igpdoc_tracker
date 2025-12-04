import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/common/Loader";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const FoodListPage = lazy(() => import("./pages/FoodListPage"));
const FoodMapPage = lazy(() => import("./pages/FoodMapPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ModalSwitch />
      <Footer />
    </BrowserRouter>
  );
}

/* ---------------- Modal-Aware Routing ---------------- */

function ModalSwitch() {
  const location = useLocation();

  // If coming from a location, store it as background for modal layering
  const state = location.state as { backgroundLocation?: Location };

  const background = state?.backgroundLocation;

  return (
    <main className="container">
      {/* Normal page content */}
      <Suspense fallback={<Loader />}>
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/foods" element={<FoodListPage />} />
          <Route path="/map" element={<FoodMapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </main>
  );
}
