// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import HeroSection from "./components/HeroSection";
import ProductPage from "./components/ProductsPage";
import { useState } from "react";

function App() {
    const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Navbar cartCount={cartCount} />

      <Routes>
        <Route path="/" element={<HeroSection  cartCount={cartCount}
        setCartCount={setCartCount} />} />
        <Route path="/products" element={<ProductPage />} />
        

     
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;