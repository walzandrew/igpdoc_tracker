import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import "leaflet/dist/leaflet.css";

import App from "./App";
import { FoodFiltersProvider } from "./context/FoodFiltersContext";
import { GeoDataProvider } from "./context/GeoDataContext";
import { FoodIndexProvider } from "./context/FoodIndexContext";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GeoDataProvider>
        <FoodIndexProvider>
          <FoodFiltersProvider>
            <App />
          </FoodFiltersProvider>
        </FoodIndexProvider>
      </GeoDataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
