// src/components/ProductPage.jsx

import { useState } from "react";
import { PRODUCTS } from "../data";

import {
  Star,
  ShoppingCart,
  X,
  Heart,
} from "lucide-react";

const ProductPage = ({ cartCount, setCartCount }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const openModal = (item) => {
    setSelectedProduct(item);

    setTimeout(() => {
      setModalVisible(true);
    }, 10);
  };

  const closeModal = () => {
    setModalVisible(false);

    setTimeout(() => {
      setSelectedProduct(null);
    }, 350);
  };

  return (
    <div className="bg-black text-white min-h-screen py-20 overflow-hidden">
      {/* HEADING */}

      <div className="text-center px-6 mb-16 pt-8">
        <p className="text-yellow-400 uppercase tracking-[5px] text-sm font-semibold mb-3">
          Explore the Menu
        </p>

        <h1 className="text-5xl md:text-6xl font-black">
          Our <span className="text-yellow-400">Products</span>
        </h1>

        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto">
          Handpicked premium dishes made fresh daily —
          order now and taste the difference.
        </p>
      </div>

      {/* AUTO SCROLL OFFER */}

      <div className="overflow-hidden whitespace-nowrap mb-20 py-4 border-y border-yellow-400/20 bg-yellow-400/5">
        <div
          className="inline-flex gap-10"
          style={{
            animation: "scrollTicker 20s linear infinite",
          }}
        >
          {[...PRODUCTS, ...PRODUCTS].map((item, index) => (
            <div
              key={index}
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold text-base inline-flex items-center gap-2 flex-shrink-0"
            >
              🔥 50% OFF {item.title}
            </div>
          ))}
        </div>
      </div>

      {/* STYLE */}

      <style>
        {`
          @keyframes scrollTicker {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      {/* PRODUCTS GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-6 lg:px-20 max-w-7xl mx-auto">
        {PRODUCTS.map((item) => (
          <div
            key={item.id}
            onClick={() => openModal(item)}
            className="group relative overflow-hidden rounded-[35px] bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-white/10 hover:border-yellow-400/40 duration-500 cursor-pointer hover:-translate-y-4 max-w-[420px] mx-auto w-full"
          >
            {/* HOVER LIGHT */}

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-700 bg-gradient-to-t from-yellow-400/10 via-transparent to-transparent z-0"></div>

            {/* IMAGE */}

            <div className="relative overflow-hidden h-[260px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 duration-700"
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/70 duration-500"></div>

              {/* HOVER DETAILS */}

              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 duration-500 p-5 z-20">
                <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-5">
                  <h3 className="text-2xl font-black text-white">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-sm mt-3 leading-6">
                    Fresh ingredients with premium taste and
                    luxury food experience.
                  </p>

                  <div className="flex items-center justify-between mt-5">
                    <h2 className="text-3xl font-black text-yellow-400">
                      ₹{item.price}
                    </h2>

                    <div className="flex gap-2 items-center">
                      <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="text-white text-sm">
                        4.9
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TRENDING */}

              <div className="absolute top-5 left-5 z-20 bg-yellow-400 text-black text-xs px-4 py-2 rounded-full font-bold shadow-lg">
                Trending
              </div>

              {/* HEART */}

              <button className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-black/50 backdrop-blur-lg flex items-center justify-center border border-white/10">
                <Heart
                  size={20}
                  className="text-white group-hover:text-red-500 duration-300"
                />
              </button>
            </div>

            {/* CONTENT */}

            <div className="p-5 relative z-10">
              {/* TITLE */}

              <h3 className="text-2xl font-black">
                {item.title}
              </h3>

              {/* DESCRIPTION */}

              <p className="text-gray-400 leading-6 mt-3 text-sm">
                Premium quality food with fresh ingredients
                and rich flavor.
              </p>

              {/* PRICE */}

              <div className="flex items-center justify-between mt-5">
                <h2 className="text-3xl font-black text-yellow-400">
                  ₹{item.price}
                </h2>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* BUTTONS */}

              <div className="flex flex-col gap-3 mt-5">
                {/* ADD TO CART */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart();
                  }}
                  className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-bold hover:scale-[1.02] duration-300 flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={18} />
                  Add To Cart
                </button>

                {/* BUY NOW */}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart();
                  }}
                  className="w-full bg-white/10 border border-white/10 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCT MODAL */}

      {selectedProduct && (
        <div
          onClick={closeModal}
          className={`fixed inset-0 z-50 flex items-center justify-center p-5 transition-all duration-300 ${
            modalVisible
              ? "bg-black/80 backdrop-blur-md"
              : "bg-black/0"
          }`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-gray-950 border border-gray-800 rounded-[40px] max-w-lg w-full overflow-hidden transition-all duration-300 ${
              modalVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-10"
            }`}
          >
            {/* CLOSE */}

            <button
              onClick={closeModal}
              className="absolute top-5 right-5 bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center z-10 hover:scale-110 duration-300"
            >
              <X size={20} />
            </button>

            {/* IMAGE */}

            <div className="overflow-hidden h-[320px]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover hover:scale-110 duration-700"
              />
            </div>

            {/* CONTENT */}

            <div className="p-8">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

                <span className="text-gray-400 text-sm ml-2 self-center">
                  (4.9 / 5)
                </span>
              </div>

              <h2 className="text-4xl font-black">
                {selectedProduct.title}
              </h2>

              <p className="text-gray-400 leading-8 mt-5">
                Premium quality delicious food prepared
                with fresh ingredients and authentic taste.
              </p>

              {/* PRICE */}

              <div className="flex items-center gap-3 mt-8">
                <h3 className="text-5xl font-black text-yellow-400">
                  ₹{selectedProduct.price}
                </h3>

                <span className="text-gray-500 line-through text-xl">
                  ₹
                  {Math.round(
                    selectedProduct.price * 1.3
                  )}
                </span>

                <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
                  30% OFF
                </span>
              </div>

              {/* BUTTONS */}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    addToCart();
                    closeModal();
                  }}
                  className="flex-1 bg-yellow-400 text-black py-4 rounded-2xl font-bold hover:scale-105 duration-300"
                >
                  Add To Cart
                </button>

                <button
                  onClick={() => {
                    addToCart();
                    closeModal();
                  }}
                  className="flex-1 border border-yellow-400 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;