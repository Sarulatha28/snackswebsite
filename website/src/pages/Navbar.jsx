// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash2, X, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ cartItems = [], setCartItems, cartCount }) => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home", path: "/" },
    { name: "Menu", id: "products", path: "/products" },
    { name: "Reviews", id: "reviews", path: "/" },
    { name: "Our Story", id: "story", path: "/" },
    { name: "Contact", id: "contact", path: "/" },
  ];

  const handleNavClick = (link) => {
    setOpen(false);
    if (link.path === "/products") {
      navigate("/products");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (location.pathname === "/") {
      document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const increaseQty = (id) => setCartItems(cartItems.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  const decreaseQty = (id) => setCartItems(cartItems.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter((i) => i.quantity > 0));
  const removeItem = (id) => setCartItems(cartItems.filter((i) => i.id !== id));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --crimson: #c0392b;
          --gold: #d4a84b;
          --gold-light: #f0c96b;
          --cream: #f5f0e8;
          --ink: #0d0a07;
          --surface: #1a1208;
          --muted: rgba(245,240,232,0.45);
        }

        * { font-family: 'DM Sans', sans-serif; }

        .nav-link-fancy {
          position: relative;
          font-size: 0.85rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          transition: color 0.3s;
          font-weight: 500;
        }
        .nav-link-fancy::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.4s cubic-bezier(0.76,0,0.24,1);
        }
        .nav-link-fancy:hover { color: var(--gold); }
        .nav-link-fancy:hover::after { width: 100%; }

        .cart-item-enter {
          animation: slideInItem 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes slideInItem {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .cart-drawer {
          transition: transform 0.5s cubic-bezier(0.76,0,0.24,1);
        }

        .scrolled-nav {
          background: rgba(13,10,7,0.97) !important;
          box-shadow: 0 1px 0 rgba(212,168,75,0.15);
        }

        .cart-badge-pulse {
          animation: badgePulse 2s ease infinite;
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(192,57,43,0.5); }
          50% { box-shadow: 0 0 0 6px rgba(192,57,43,0); }
        }

        .mobile-menu-item {
          opacity: 0;
          transform: translateX(-16px);
          transition: all 0.35s;
        }
        .mobile-open .mobile-menu-item {
          opacity: 1;
          transform: translateX(0);
        }
        .mobile-open .mobile-menu-item:nth-child(1) { transition-delay: 0.05s; }
        .mobile-open .mobile-menu-item:nth-child(2) { transition-delay: 0.1s; }
        .mobile-open .mobile-menu-item:nth-child(3) { transition-delay: 0.15s; }
        .mobile-open .mobile-menu-item:nth-child(4) { transition-delay: 0.2s; }
        .mobile-open .mobile-menu-item:nth-child(5) { transition-delay: 0.25s; }

        .qty-btn {
          width: 28px; height: 28px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          transition: all 0.2s;
          border: 1px solid rgba(212,168,75,0.3);
          color: var(--gold);
          background: transparent;
        }
        .qty-btn:hover { background: var(--gold); color: var(--ink); border-color: var(--gold); }

        .checkout-btn {
          background: linear-gradient(135deg, var(--gold) 0%, var(--crimson) 100%);
          position: relative;
          overflow: hidden;
        }
        .checkout-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .checkout-btn:hover::before { opacity: 1; }
        .checkout-btn span { position: relative; z-index: 1; }
      `}</style>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{ background: scrolled ? undefined : 'linear-gradient(to bottom, rgba(13,10,7,0.95), transparent)' }}
        data-scrolled={scrolled}
      >
        <div className={`${scrolled ? 'scrolled-nav' : ''} transition-all duration-500`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">

            {/* LOGO */}
            <button
              onClick={() => handleNavClick({ id: "home", path: "/" })}
              style={{ fontFamily: "'Playfair Display', serif", color: 'var(--gold)', letterSpacing: '-0.01em' }}
              className="text-2xl font-black tracking-tight"
            >
              SAVEUR<span style={{ color: 'var(--crimson)' }}>.</span>
            </button>

            {/* DESKTOP LINKS */}
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button onClick={() => handleNavClick(link)} className="nav-link-fancy">
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              {/* CART BTN */}
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative flex items-center gap-2 group"
                style={{ color: 'var(--cream)' }}
              >
                <div
                  style={{ border: '1px solid rgba(212,168,75,0.3)', background: 'rgba(212,168,75,0.06)' }}
                  className="p-2.5 rounded-full transition-all duration-300 group-hover:border-yellow-500 group-hover:bg-yellow-500/10"
                >
                  <ShoppingCart size={18} />
                </div>
                {cartCount > 0 && (
                  <span
                    className="cart-badge-pulse absolute -top-1 -right-1 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                    style={{ background: 'var(--crimson)' }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* MOBILE MENU BTN */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden transition-all duration-300"
                style={{ color: 'var(--cream)' }}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-96' : 'max-h-0'}`}
          style={{ background: 'rgba(13,10,7,0.98)', borderTop: '1px solid rgba(212,168,75,0.1)' }}
        >
          <div className={`px-8 py-8 flex flex-col gap-5 ${open ? 'mobile-open' : ''}`}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="mobile-menu-item text-left nav-link-fancy text-base"
                style={{ letterSpacing: '0.15em' }}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CART DRAWER */}
      <div
        className={`cart-drawer fixed top-0 right-0 h-full w-full sm:w-[400px] z-[100] flex flex-col ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'var(--ink)', borderLeft: '1px solid rgba(212,168,75,0.12)' }}
      >
        {/* HEADER */}
        <div className="p-6 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(212,168,75,0.1)' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--cream)', fontSize: '1.6rem', fontWeight: 700 }}>
              Your Order
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            style={{ border: '1px solid rgba(212,168,75,0.25)', color: 'var(--gold)' }}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-500/10 transition-all duration-300 hover:rotate-90"
          >
            <X size={16} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <div style={{ fontSize: '3rem' }}>🍽️</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--cream)', fontSize: '1.4rem', marginTop: 16 }}>
                Nothing here yet
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: 8 }}>
                Add something delicious to begin
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="cart-item-enter flex gap-4 p-4 rounded-2xl"
                style={{ background: 'rgba(245,240,232,0.04)', border: '1px solid rgba(212,168,75,0.1)' }}
              >
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 style={{ color: 'var(--cream)', fontSize: '0.9rem', fontWeight: 600 }} className="truncate">
                      {item.title}
                    </h4>
                    <button onClick={() => removeItem(item.id)} style={{ color: 'var(--crimson)', opacity: 0.7 }} className="hover:opacity-100 transition-opacity flex-shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p style={{ color: 'var(--gold)', fontSize: '1rem', fontWeight: 700, marginTop: 4 }}>
                    ₹{item.price * item.quantity}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <button className="qty-btn" onClick={() => decreaseQty(item.id)}><Minus size={11} /></button>
                    <span style={{ color: 'var(--cream)', fontSize: '0.9rem', fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button className="qty-btn" onClick={() => increaseQty(item.id)}><Plus size={11} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="p-5" style={{ borderTop: '1px solid rgba(212,168,75,0.1)' }}>
            <div className="flex items-center justify-between mb-5">
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", color: 'var(--gold)', fontSize: '2rem', fontWeight: 700 }}>
                ₹{totalPrice}
              </span>
            </div>
            <button className="checkout-btn w-full py-4 rounded-2xl font-semibold text-sm tracking-widest uppercase" style={{ color: 'var(--ink)' }}>
              <span>Proceed to Checkout</span>
            </button>
          </div>
        )}
      </div>

      {/* BACKDROP */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-[90] transition-all duration-300"
          style={{ background: 'rgba(13,10,7,0.7)', backdropFilter: 'blur(4px)' }}
        />
      )}
    </>
  );
};

export default Navbar;