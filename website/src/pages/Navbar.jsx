// src/components/Navbar.jsx

import { useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({
  cartItems = [],
  setCartItems,
  cartCount,
}) => {
  const [open, setOpen] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const navLinks = [
    { name: "Home", id: "home", path: "/" },

    {
      name: "Products",
      id: "products",
      path: "/products",
    },

    { name: "Reviews", id: "reviews", path: "/" },

    { name: "Our Story", id: "story", path: "/" },

    { name: "Contact", id: "contact", path: "/" },
  ];

  const handleNavClick = (link) => {
    setOpen(false);

    if (link.path === "/products") {
      navigate("/products");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (location.pathname === "/") {
      const el = document.getElementById(link.id);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      navigate("/");

      setTimeout(() => {
        const el = document.getElementById(link.id);

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 300);
    }
  };

  // TOTAL PRICE

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // INCREASE

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCartItems(updated);
  };

  // DECREASE

  const decreaseQty = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updated);
  };

  // REMOVE

  const removeItem = (id) => {
    const updated = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updated);
  };

  return (
    <>
      {/* NAVBAR */}

      <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          {/* LOGO */}

          <button
            onClick={() =>
              handleNavClick({
                id: "home",
                path: "/",
              })
            }
            className="text-3xl font-black text-yellow-400 tracking-wide"
          >
            FoodieHub
          </button>

          {/* DESKTOP MENU */}

          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() =>
                    handleNavClick(link)
                  }
                  className="text-gray-300 hover:text-yellow-400 duration-300 font-semibold relative after:absolute after:left-0 after:-bottom-2 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:duration-300"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-5">
            {/* CART */}

            <button
              onClick={() =>
                setCartOpen(!cartOpen)
              }
              className="relative"
            >
              <div className="bg-yellow-400 text-black p-3 rounded-full shadow-lg shadow-yellow-500/30 hover:scale-110 duration-300">
                <ShoppingCart size={24} />
              </div>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* MOBILE MENU */}

            <button
              className="md:hidden text-white"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <X size={30} />
              ) : (
                <Menu size={30} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}

        <div
          className={`md:hidden overflow-hidden duration-500 ${
            open
              ? "max-h-[500px]"
              : "max-h-0"
          }`}
        >
          <div className="bg-black/95 px-6 py-6 flex flex-col gap-6 border-t border-white/10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() =>
                  handleNavClick(link)
                }
                className="text-left text-lg text-gray-300 hover:text-yellow-400 duration-300"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CART DRAWER */}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-black/95 backdrop-blur-2xl border-l border-white/10 z-[100] transition-all duration-500 ${
          cartOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        {/* HEADER */}

        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-3xl font-black text-white">
              Your Cart
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              {cartCount} Items Added
            </p>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            className="bg-yellow-400 text-black w-11 h-11 rounded-full flex items-center justify-center hover:rotate-90 duration-300"
          >
            <X />
          </button>
        </div>

        {/* CART ITEMS */}

        <div className="p-5 h-[calc(100vh-220px)] overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <ShoppingCart
                size={70}
                className="text-yellow-400"
              />

              <h3 className="text-2xl font-bold mt-6">
                Cart is Empty
              </h3>

              <p className="text-gray-400 mt-2">
                Add delicious foods now
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 border border-white/10 rounded-3xl p-4 flex gap-4 hover:border-yellow-400/30 duration-300"
                >
                  {/* IMAGE */}

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />

                  {/* CONTENT */}

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold">
                          {item.title}
                        </h3>

                        <p className="text-yellow-400 font-black text-xl mt-1">
                          ₹{item.price}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          removeItem(item.id)
                        }
                        className="text-red-400 hover:scale-110 duration-300"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* QUANTITY */}

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() =>
                          decreaseQty(item.id)
                        }
                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 hover:text-black duration-300"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="text-lg font-bold w-6 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(item.id)
                        }
                        className="w-9 h-9 rounded-full bg-yellow-400 text-black flex items-center justify-center hover:scale-110 duration-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}

        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full p-5 border-t border-white/10 bg-black">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">
                Total Amount
              </h3>

              <h2 className="text-4xl font-black text-yellow-400">
                ₹{totalPrice}
              </h2>
            </div>

            <button className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-black text-lg hover:scale-[1.02] duration-300">
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>

      {/* BACKDROP */}

      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
        ></div>
      )}
    </>
  );
};

export default Navbar;