// src/components/HeroSection.jsx

import { useState } from "react";
import { PRODUCTS, REVIEWS } from "../data";

import heroImg from "../assets/images1.jpg";

import {
  Star,
  ArrowRight,
  Quote,
  Play,
  X,
  Sparkles,
  ShoppingBag,
  Heart,
  Send,
} from "lucide-react";

const HeroSection = ({ cartCount, setCartCount }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [reviews, setReviews] = useState(
    REVIEWS.map((item, index) => ({
      ...item,
      rating: [5, 4, 3, 5, 4][index % 5],
    }))
  );

  const [formData, setFormData] = useState({
    name: "",
    text: "",
    rating: 5,
  });

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleReview = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.text) return;

    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      text: formData.text,
      rating: formData.rating,
    };

    setReviews([newReview, ...reviews]);

    setFormData({
      name: "",
      text: "",
      rating: 5,
    });
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* CUSTOM ANIMATION */}

      <style>
        {`
          html{
            scroll-behavior:smooth;
          }

          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-18px); }
            100% { transform: translateY(0px); }
          }

          @keyframes shine {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(200%);
            }
          }

          @keyframes fadeUp {
            from {
              opacity:0;
              transform:translateY(40px);
            }
            to{
              opacity:1;
              transform:translateY(0px);
            }
          }

          .animate-float{
            animation: float 5s ease-in-out infinite;
          }

          .animate-fadeUp{
            animation: fadeUp 1s ease;
          }

          .glass{
            background: rgba(255,255,255,0.04);
            backdrop-filter: blur(12px);
          }
        `}
      </style>

      {/* HERO */}

      {/* PRODUCTS */}

<section
  id="products"
  className="py-24 px-6 lg:px-20"
>
  <div className="text-center mb-16">
    <p className="text-yellow-400 uppercase tracking-[5px]">
      Popular Foods
    </p>

    <h2 className="text-5xl font-black mt-3">
      Mostly Ordered Products
    </h2>
  </div>

  {/* PRODUCTS GRID */}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
    {PRODUCTS.map((item) => (
      <div
        key={item.id}
        onClick={() => setSelectedProduct(item)}
        className="group relative overflow-hidden rounded-[35px] bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-white/10 hover:border-yellow-400/40 duration-500 cursor-pointer hover:-translate-y-4 max-w-[420px] mx-auto w-full"
      >
        {/* HOVER LIGHT */}

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-700 bg-gradient-to-t from-yellow-400/10 via-transparent to-transparent z-0"></div>

        {/* IMAGE */}

        <div className="relative overflow-hidden h-[260px]">
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-110 duration-700"
          />

          {/* OVERLAY */}

          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/70 duration-500"></div>

          {/* FOOD DETAILS HOVER */}

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
            Premium quality food with fresh ingredients and
            rich flavor.
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
              className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-bold hover:scale-[1.02] duration-300"
            >
              Add To Cart
            </button>

            {/* BUY NOW */}

            <button className="w-full bg-white/10 border border-white/10 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* PRODUCTS */}

    

      {/* STORY */}

      <section
        id="story"
        className="py-24 px-6 lg:px-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* VIDEO */}

          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-400/20 blur-[100px] rounded-[40px]"></div>

            <div className="relative h-[420px] rounded-[40px] overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 rounded-full bg-yellow-400 text-black flex items-center justify-center animate-pulse shadow-2xl shadow-yellow-500/30 hover:scale-110 duration-300 cursor-pointer">
                  <Play size={42} fill="black" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                <h2 className="text-3xl font-black">
                  Watch Our Journey
                </h2>

                <p className="text-gray-400 mt-3">
                  Premium cooking experience.
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT */}

          <div>
            <p className="text-yellow-400 uppercase tracking-[5px] font-semibold">
              Our Story
            </p>

            <h2 className="text-5xl md:text-6xl font-black mt-5 leading-tight">
              Passion For
              <span className="block text-yellow-400">
                Delicious Foods
              </span>
            </h2>

            <p className="text-gray-300 leading-9 text-lg mt-8">
              We create unforgettable food experiences using fresh
              ingredients, modern cooking methods, and premium taste.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="glass border border-white/10 rounded-3xl p-8 hover:-translate-y-2 duration-300">
                <h2 className="text-5xl font-black text-yellow-400">
                  10+
                </h2>

                <p className="text-gray-400 mt-3">
                  Years Experience
                </p>
              </div>

              <div className="glass border border-white/10 rounded-3xl p-8 hover:-translate-y-2 duration-300">
                <h2 className="text-5xl font-black text-yellow-400">
                  50K+
                </h2>

                <p className="text-gray-400 mt-3">
                  Orders Delivered
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}

      <section
        id="reviews"
        className="py-24 px-6 lg:px-20"
      >
        <div className="text-center mb-16">
          <p className="text-yellow-400 uppercase tracking-[5px]">
            Testimonials
          </p>

          <h2 className="text-5xl font-black mt-3">
            Customer Reviews
          </h2>
        </div>

        {/* REVIEW CARDS */}

        <div className="grid md:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative glass border border-white/10 rounded-[35px] p-8 hover:-translate-y-4 duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 bg-gradient-to-br from-yellow-400/10 to-transparent"></div>

              <Quote
                size={60}
                className="absolute top-5 right-5 text-yellow-400 opacity-10"
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center text-2xl font-black">
                    {review.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      {review.name}
                    </h3>

                    <p className="text-yellow-400 text-sm">
                      Verified Customer
                    </p>
                  </div>
                </div>

                {/* RATING */}

                <div className="flex gap-1 mt-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={`${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-300 leading-8 mt-6">
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BIG REVIEW SECTION */}

        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center glass border border-white/10 rounded-[45px] p-8 lg:p-16 overflow-hidden relative">
          {/* LEFT */}

          <div className="relative z-10">
            <p className="text-yellow-400 uppercase tracking-[5px]">
              Share Experience
            </p>

            <h2 className="text-5xl md:text-6xl font-black mt-6 leading-tight">
              Add Your
              <span className="block text-yellow-400">
                Review Here
              </span>
            </h2>

            <p className="text-gray-400 leading-9 mt-8 text-lg">
              Share your experience with our delicious foods,
              premium quality and fast delivery services.
            </p>

            <div className="flex gap-5 mt-10 flex-wrap">
              <div className="glass border border-white/10 px-6 py-5 rounded-3xl">
                <h2 className="text-4xl font-black text-yellow-400">
                  4.9★
                </h2>

                <p className="text-gray-400 mt-2">
                  Customer Rating
                </p>
              </div>

              <div className="glass border border-white/10 px-6 py-5 rounded-3xl">
                <h2 className="text-4xl font-black text-yellow-400">
                  25K+
                </h2>

                <p className="text-gray-400 mt-2">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <form
            onSubmit={handleReview}
            className="space-y-6 relative z-10"
          >
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full bg-black/60 border border-gray-700 p-5 rounded-2xl outline-none focus:border-yellow-400"
            />

            <textarea
              rows="6"
              placeholder="Write your review..."
              value={formData.text}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  text: e.target.value,
                })
              }
              className="w-full bg-black/60 border border-gray-700 p-5 rounded-2xl outline-none focus:border-yellow-400"
            ></textarea>

            {/* RATING */}

            <div>
              <p className="mb-4 text-gray-300">
                Select Rating
              </p>

              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        rating: star,
                      })
                    }
                  >
                    <Star
                      size={34}
                      className={`duration-300 ${
                        star <= formData.rating
                          ? "fill-yellow-400 text-yellow-400 scale-110"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-yellow-400 text-black py-5 rounded-2xl text-xl font-black hover:scale-[1.02] duration-300 flex items-center justify-center gap-3">
              Submit Review
              <Send size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* CONTACT */}

      <section
        id="contact"
        className="py-24 px-6 lg:px-20"
      >
        <div className="grid lg:grid-cols-2 gap-10 bg-gradient-to-br from-gray-950 to-black border border-gray-800 rounded-[40px] p-10 lg:p-16">
          <div>
            <p className="text-yellow-400 uppercase tracking-[5px]">
              Contact Center
            </p>

            <h2 className="text-5xl font-black mt-4 leading-tight">
              Let's Talk About
              <span className="block text-yellow-400">
                Delicious Foods
              </span>
            </h2>

            <p className="text-gray-400 leading-9 mt-8">
              Contact us anytime for premium food orders,
              customer support and fast delivery services.
            </p>
          </div>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-black border border-gray-700 p-5 rounded-2xl outline-none focus:border-yellow-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-black border border-gray-700 p-5 rounded-2xl outline-none focus:border-yellow-400"
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full bg-black border border-gray-700 p-5 rounded-2xl outline-none focus:border-yellow-400"
            ></textarea>

            <button className="w-full bg-yellow-400 text-black py-5 rounded-2xl text-xl font-black hover:scale-[1.02] duration-300">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-4xl font-black text-yellow-400">
              FoodieHub
            </h2>

            <p className="text-gray-400 leading-8 mt-6">
              Premium food experience with modern design
              and luxury animations.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">
              Quick Links
            </h3>

            <div className="space-y-4 text-gray-400">
              <a href="#home" className="block hover:text-yellow-400">
                Home
              </a>

              <a href="#products" className="block hover:text-yellow-400">
                Products
              </a>

              <a href="#reviews" className="block hover:text-yellow-400">
                Reviews
              </a>

              <a href="#story" className="block hover:text-yellow-400">
                Our Story
              </a>

              <a href="#contact" className="block hover:text-yellow-400">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">
              Services
            </h3>

            <div className="space-y-4 text-gray-400">
              <p>Fast Delivery</p>
              <p>Premium Foods</p>
              <p>24/7 Support</p>
              <p>Online Orders</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">
              Contact
            </h3>

            <div className="space-y-4 text-gray-400">
              <p>Chennai, India</p>
              <p>+91 9876543210</p>
              <p>foodiehub@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>

      {/* PRODUCT POPUP */}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-5">
          <div className="relative bg-gray-950 border border-gray-800 rounded-[40px] max-w-md w-full overflow-hidden animate-[fadeUp_.4s_ease]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center z-10"
            >
              <X />
            </button>

            <div className="overflow-hidden">
              <img
                src={selectedProduct.image}
                alt=""
                className="w-full h-[320px] object-cover hover:scale-110 duration-700"
              />
            </div>

            <div className="p-8">
              <h2 className="text-4xl font-black">
                {selectedProduct.title}
              </h2>

              <p className="text-gray-400 leading-8 mt-6">
                Premium quality delicious food with rich taste
                and fresh ingredients.
              </p>

              <h3 className="text-5xl font-black text-yellow-400 mt-8">
                ₹{selectedProduct.price}
              </h3>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-yellow-400 text-black py-4 rounded-2xl font-bold hover:scale-105 duration-300"
                >
                  Add Cart
                </button>

                <button className="flex-1 border border-yellow-400 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black duration-300">
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

export default HeroSection;