// src/components/HeroSection.jsx

import { useState } from "react";
import { PRODUCTS, REVIEWS } from "../data";

import heroImg from "../assets/images1.jpg";

import {
  ShoppingCart,
  Star,
  ArrowRight,
  Quote,
  Play,
  X,
} from "lucide-react";

const HeroSection = ({ cartCount, setCartCount }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState(REVIEWS);

  const [formData, setFormData] = useState({
    name: "",
    text: "",
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
    };

    setReviews([newReview, ...reviews]);

    setFormData({
      name: "",
      text: "",
    });
  };

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* HERO */}

      <section
        id="home"
        className="min-h-screen relative flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 pt-32 pb-20"
      >

        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black"></div>

        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-yellow-400/10 blur-[150px] rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-yellow-500/10 blur-[150px] rounded-full"></div>

        {/* LEFT */}

        <div className="max-w-2xl relative z-10">

          <p className="text-yellow-400 uppercase tracking-[6px] font-semibold mb-5 animate-pulse">
            Premium Restaurant
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Delicious Food
            <span className="block text-yellow-400">
              Delivered Fast
            </span>
          </h1>

          <p className="text-gray-300 text-lg leading-9 mt-8 max-w-xl">
            Experience premium quality foods with modern UI,
            attractive animations, tasty dishes, and fast delivery.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">

            <a href="#products">
              <button className="group bg-yellow-400 text-black px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:scale-105 duration-300 shadow-2xl shadow-yellow-500/20">
                Order Now
                <ArrowRight className="group-hover:translate-x-2 duration-300" />
              </button>
            </a>

            <a href="#story">
              <button className="border border-yellow-400 px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-black duration-300">
                Our Story
              </button>
            </a>

          </div>

          {/* STATS */}

          <div className="flex gap-10 flex-wrap mt-14">

            <div>
              <h2 className="text-4xl font-black text-yellow-400">
                25K+
              </h2>

              <p className="text-gray-400 mt-2">
                Happy Customers
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-yellow-400">
                150+
              </h2>

              <p className="text-gray-400 mt-2">
                Premium Foods
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-black text-yellow-400">
                4.9★
              </h2>

              <p className="text-gray-400 mt-2">
                Customer Ratings
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative mt-16 lg:mt-0 z-10">

          <div className="absolute inset-0 bg-yellow-400/20 blur-[120px] rounded-full"></div>

          <img
            src={heroImg}
            alt=""
            className="w-[330px] sm:w-[450px] lg:w-[560px] rounded-[40px] border border-yellow-400/30 object-cover hover:scale-105 duration-700 shadow-2xl shadow-yellow-500/20"
          />

        </div>

      </section>

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

        {/* PRODUCTS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {PRODUCTS.map((item) => (

            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="group cursor-pointer rounded-[35px] overflow-hidden bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-yellow-400/40 duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-yellow-500/10"
            >

              {/* IMAGE */}

              <div className="overflow-hidden relative">

                <img
                  src={item.image}
                  alt=""
                  className="h-80 w-full object-cover group-hover:scale-110 group-hover:rotate-6 duration-700"
                />

                {/* HOVER DETAILS */}

                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 duration-500 flex flex-col items-center justify-center p-6 text-center">

                  <h2 className="text-3xl font-black">
                    {item.title}
                  </h2>

                  <p className="text-gray-300 mt-4 leading-7">
                    Delicious premium food with rich flavors
                    and fresh ingredients.
                  </p>

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-6">

                <div className="flex gap-1">

                  <Star className="fill-yellow-400 text-yellow-400" size={18} />
                  <Star className="fill-yellow-400 text-yellow-400" size={18} />
                  <Star className="fill-yellow-400 text-yellow-400" size={18} />
                  <Star className="fill-yellow-400 text-yellow-400" size={18} />
                  <Star className="fill-yellow-400 text-yellow-400" size={18} />

                </div>

                <div className="flex items-center justify-between mt-6">

                  <h3 className="text-3xl font-black text-yellow-400">
                    ₹{item.price}
                  </h3>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart();
                    }}
                    className="bg-yellow-400 text-black px-5 py-3 rounded-full font-bold hover:scale-105 duration-300"
                  >
                    Add Cart
                  </button>

                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart();
                  }}
                  className="w-full mt-5 border border-yellow-400 py-4 rounded-2xl font-bold hover:bg-yellow-400 hover:text-black duration-300"
                >
                  Buy Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* STORY */}

      <section
        id="story"
        className="py-24 px-6 lg:px-20"
      >

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* VIDEO EFFECT */}

          <div className="relative group">

            <div className="absolute inset-0 bg-yellow-400/20 blur-[100px] rounded-[40px]"></div>

            <div className="relative h-[420px] rounded-[40px] overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-black">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(250,204,21,0.2),transparent_40%)]"></div>

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.05),transparent_40%)]"></div>

              <div className="absolute inset-0 flex items-center justify-center">

                <div className="w-24 h-24 rounded-full bg-yellow-400 text-black flex items-center justify-center animate-pulse shadow-2xl shadow-yellow-500/30">
                  <Play size={40} fill="black" />
                </div>

              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">

                <h2 className="text-3xl font-black">
                  Watch Our Journey
                </h2>

                <p className="text-gray-400 mt-3">
                  Premium cooking experience and delicious foods.
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

              <div className="bg-white/5 border border-gray-800 rounded-3xl p-8">
                <h2 className="text-5xl font-black text-yellow-400">
                  10+
                </h2>

                <p className="text-gray-400 mt-3">
                  Years Experience
                </p>
              </div>

              <div className="bg-white/5 border border-gray-800 rounded-3xl p-8">
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

        <div className="grid md:grid-cols-3 gap-10">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-[35px] p-8 hover:-translate-y-3 duration-500"
            >

              <Quote
                size={60}
                className="absolute top-5 right-5 text-yellow-400 opacity-10"
              />

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-yellow-400 text-black flex items-center justify-center text-2xl font-black">
                  {review.name.charAt(0)}
                </div>

                <div>

                  <h3 className="text-2xl font-bold">
                    {review.name}
                  </h3>

                  <p className="text-yellow-400">
                    Verified Customer
                  </p>

                </div>

              </div>

              <div className="flex gap-1 mt-6">

                <Star className="fill-yellow-400 text-yellow-400" />
                <Star className="fill-yellow-400 text-yellow-400" />
                <Star className="fill-yellow-400 text-yellow-400" />
                <Star className="fill-yellow-400 text-yellow-400" />
                <Star className="fill-yellow-400 text-yellow-400" />

              </div>

              <p className="text-gray-300 leading-8 mt-6">
                {review.text}
              </p>

            </div>

          ))}

        </div>

        {/* REVIEW FORM */}

        <div className="max-w-3xl mx-auto mt-20 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-[40px] p-10">

          <h2 className="text-4xl font-black text-center">
            Add Your Review
          </h2>

          <form
            onSubmit={handleReview}
            className="space-y-6 mt-10"
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
              className="w-full bg-black border border-gray-700 p-5 rounded-2xl outline-none focus:border-yellow-400"
            />

            <textarea
              rows="5"
              placeholder="Write your review..."
              value={formData.text}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  text: e.target.value,
                })
              }
              className="w-full bg-black border border-gray-700 p-5 rounded-2xl outline-none focus:border-yellow-400"
            ></textarea>

            <button className="w-full bg-yellow-400 text-black py-5 rounded-2xl text-xl font-black hover:scale-[1.02] duration-300">
              Submit Review
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
              customer support, and fast delivery services.
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

            <button className="w-full bg-yellow-400 text-black py-5 rounded-2xl text-xl font-black">
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
              Premium food experience with modern design,
              delicious taste and fast delivery.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">
              Quick Links
            </h3>

            <div className="space-y-4 text-gray-400">
              <a href="#home" className="block hover:text-yellow-400">Home</a>
              <a href="#products" className="block hover:text-yellow-400">Products</a>
              <a href="#reviews" className="block hover:text-yellow-400">Reviews</a>
              <a href="#story" className="block hover:text-yellow-400">Our Story</a>
              <a href="#contact" className="block hover:text-yellow-400">Contact</a>
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

        <div className="border-t border-gray-800 mt-14 pt-8 text-center text-gray-500">
          © 2026 FoodieHub | All Rights Reserved
        </div>

      </footer>

      {/* PRODUCT POPUP */}

      {selectedProduct && (

        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-5">

          <div className="relative bg-gray-950 border border-gray-800 rounded-[40px] max-w-md w-full overflow-hidden animate-[fadeIn_.4s_ease]">

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
                className="w-full h-[320px] object-cover hover:rotate-6 hover:scale-110 duration-700"
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
                  className="flex-1 bg-yellow-400 text-black py-4 rounded-2xl font-bold"
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