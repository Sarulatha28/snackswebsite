// src/components/Navbar.jsx

import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navbar = ({ cartCount }) => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Products", id: "products" },
    { name: "Reviews", id: "reviews" },
    { name: "Our Story", id: "story" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-2xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">

        <a
          href="#home"
          className="text-3xl font-black text-yellow-400 tracking-wide"
        >
          FoodieHub
        </a>

        <ul className="hidden md:flex items-center gap-10">

          {navLinks.map((link) => (

            <li key={link.id}>

              <a
                href={`#${link.id}`}
                className="text-gray-300 hover:text-yellow-400 duration-300 font-semibold relative after:absolute after:left-0 after:-bottom-2 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:duration-300"
              >
                {link.name}
              </a>

            </li>

          ))}

        </ul>

        <div className="flex items-center gap-5">

          <div className="relative">

            <div className="bg-yellow-400 text-black p-3 rounded-full shadow-lg shadow-yellow-500/30">
              <ShoppingCart size={24} />
            </div>

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>

          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>

        </div>

      </div>

      {/* MOBILE */}

      <div
        className={`md:hidden overflow-hidden duration-500 ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >

        <div className="bg-black/95 px-6 py-6 flex flex-col gap-6 border-t border-white/10">

          {navLinks.map((link) => (

            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="text-lg text-gray-300 hover:text-yellow-400 duration-300"
            >
              {link.name}
            </a>

          ))}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;