// src/components/ProductPage.jsx

import { PRODUCTS } from "../data";

const ProductPage = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 overflow-hidden">

      {/* HEADING */}
      <h1 className="text-5xl font-bold text-center mb-16 text-yellow-400">
        Our Products
      </h1>

      {/* AUTO SCROLL OFFER */}
      <div className="overflow-hidden whitespace-nowrap mb-20">

        <div className="animate-scroll inline-flex gap-10">

          {[...PRODUCTS, ...PRODUCTS].map((item, index) => (
            <div
              key={index}
              className="bg-yellow-400 text-black px-10 py-5 rounded-full font-bold text-xl"
            >
              🔥 50% OFF {item.title}
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-8">

        {PRODUCTS.map((item) => (
          <div
            key={item.id}
            className="group bg-white/10 rounded-3xl overflow-hidden hover:scale-105 duration-500"
          >
            <div className="overflow-hidden">

              <img
                src={item.image}
                alt=""
                className="h-72 w-full object-cover group-hover:rotate-6 group-hover:scale-110 duration-500"
              />
            </div>

            <div className="p-6">
              <h2 className="text-3xl font-bold">
                {item.title}
              </h2>

              <p className="text-yellow-400 text-2xl mt-3">
                {item.price}
              </p>

              <button className="w-full mt-5 bg-yellow-400 text-black py-4 rounded-full font-bold hover:scale-105 duration-300">
                Buy Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;