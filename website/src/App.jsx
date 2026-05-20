// src/App.jsx

import { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./pages/Navbar";
import HeroSection from "./components/HeroSection";
import ProductPage from "./components/ProductsPage";
function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <HashRouter>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route
          path="/"
          element={
            <HeroSection cartCount={cartCount} setCartCount={setCartCount} />
          }
        />
        <Route
          path="/products"
          element={
            <ProductPage cartCount={cartCount} setCartCount={setCartCount} />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;