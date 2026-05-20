// src/components/ProductPage.jsx

import { useState } from "react";
import { PRODUCTS } from "../data";
import {
  Star,
  ShoppingCart,
  X,
  Heart,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const ProductPage = ({ cartCount, setCartCount }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = () => setCartCount((prev) => prev + 1);

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );

  return (
    <div
      style={{ background: "var(--ink)", color: "var(--cream)" }}
      className="overflow-hidden min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        :root {
          --crimson: #c0392b;
          --gold: #d4a84b;
          --gold-light: #f0c96b;
          --cream: #f5f0e8;
          --ink: #0d0a07;
          --surface: rgba(245,240,232,0.04);
          --border: rgba(212,168,75,0.12);
          --muted: rgba(245,240,232,0.45);
        }

        * {
          font-family: 'DM Sans', sans-serif;
        }

        .serif {
          font-family: 'Playfair Display', serif;
        }

        .ticker-track {
          display: inline-flex;
          white-space: nowrap;
          animation: ticker 28s linear infinite;
        }

        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .product-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.5s ease;
        }

        .product-card:hover {
          transform: translateY(-10px);
          border-color: rgba(212,168,75,0.4);
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }

        .card-img {
          height: 260px;
          overflow: hidden;
          position: relative;
        }

        .card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .product-card:hover .card-img img {
          transform: scale(1.1);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(13,10,7,0.92) 0%,
            transparent 55%
          );
          opacity: 0;
          transition: opacity 0.4s;
        }

        .product-card:hover .card-overlay {
          opacity: 1;
        }

        .card-hover-info {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 16px;
          transform: translateY(100%);
          transition: transform 0.4s ease;
        }

        .product-card:hover .card-hover-info {
          transform: translateY(0);
        }

        .add-btn {
          background: linear-gradient(
            135deg,
            var(--gold) 0%,
            #b8892a 100%
          );

          color: var(--ink);
          border: none;
          padding: 13px;
          border-radius: 14px;
          font-weight: 700;
          width: 100%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .add-btn:hover {
          transform: scale(1.03);
        }

        .outline-btn {
          background: transparent;
          color: var(--cream);
          border: 1px solid var(--border);
          padding: 13px;
          border-radius: 14px;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .outline-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
        }

        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 14px;
        }

        .section-label::before {
          content: '';
          width: 32px;
          height: 1px;
          background: var(--gold);
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid var(--border);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(212,168,75,0.06);
        }

        .popup-overlay {
          animation: fadeIn 0.3s ease;
        }

        .popup-modal {
          animation: popup 0.4s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popup {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      {/* HERO SECTION */}

      <section
        style={{
          minHeight: "56vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,rgba(13,10,7,0.97),rgba(13,10,7,0.78))",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-16">
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              ["⭐", "4.9 Rating"],
              ["🍽️", "200+ Dishes"],
              ["🚀", "30 min Delivery"],
            ].map(([icon, label]) => (
              <span key={label} className="pill">
                {icon} {label}
              </span>
            ))}
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.8rem,7vw,5.5rem)",
              fontWeight: 900,
              lineHeight: 1.04,
              marginBottom: 20,
            }}
          >
            Our <em style={{ color: "var(--gold)" }}>Menu</em>
            <br />
            & Products
          </h1>

          <p
            style={{
              color: "var(--muted)",
              fontSize: "1rem",
              lineHeight: 1.8,
              maxWidth: 480,
              marginBottom: 36,
            }}
          >
            Handpicked premium dishes made fresh daily — order now and taste
            the difference.
          </p>

          {/* NORMAL FONT NUMBERS */}

          <div
            className="flex flex-wrap gap-8 pt-6"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {[
              ["50K+", "Orders"],
              ["4.9★", "Rating"],
              ["200+", "Dishes"],
              ["30 min", "Delivery"],
            ].map(([n, l]) => (
              <div key={l}>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    color: "var(--gold)",
                  }}
                >
                  {n}
                </div>

                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}

      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="section-label"
            style={{ justifyContent: "center" }}
          >
            Popular Dishes
          </p>

          <h2
            className="serif"
            style={{
              fontSize: "clamp(2rem,5vw,3.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
            }}
          >
            Mostly Ordered
            <br />

            <em style={{ color: "var(--gold)" }}>Favourites</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(PRODUCTS || []).map((item, i) => (
            <div
              key={item.id}
              className="product-card"
              onClick={() => setSelectedProduct(item)}
            >
              <div className="card-img">
                <img src={item.image} alt={item.title} />

                <div className="card-overlay" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(item.id);
                  }}
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0,0,0,0.5)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Heart
                    size={16}
                    fill={
                      wishlist.includes(item.id)
                        ? "#e74c3c"
                        : "transparent"
                    }
                  />
                </button>
              </div>

              <div style={{ padding: 20 }}>
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="serif"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                    }}
                  >
                    {item.title}
                  </h3>

                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={11}
                        style={{
                          fill: "var(--gold)",
                          color: "var(--gold)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "0.8rem",
                    lineHeight: 1.7,
                    marginBottom: 14,
                  }}
                >
                  Premium quality with rich authentic flavors crafted fresh
                  daily.
                </p>

                {/* NORMAL PRICE FONT */}

                <div className="flex items-center justify-between mb-4">
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 900,
                      color: "var(--gold)",
                    }}
                  >
                    ₹{item.price}
                  </span>

                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                    }}
                  >
                    30 min delivery
                  </span>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    className="add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart();
                    }}
                  >
                    <ShoppingCart size={15} />
                    Add to Cart
                  </button>

                  <button
                    className="outline-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart();
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPUP */}

      {selectedProduct && (
        <div
          className="popup-overlay fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{
            background: "rgba(13,10,7,0.92)",
            backdropFilter: "blur(10px)",
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="popup-modal"
            style={{
              background: "#111009",
              border: "1px solid var(--border)",
              borderRadius: 28,
              maxWidth: 500,
              width: "100%",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ height: 320 }}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            <div style={{ padding: 28 }}>
              <h2
                className="serif"
                style={{
                  fontSize: "1.9rem",
                  fontWeight: 900,
                  marginBottom: 12,
                }}
              >
                {selectedProduct.title}
              </h2>

              <p
                style={{
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  marginBottom: 20,
                }}
              >
                Prepared fresh with premium ingredients for an unforgettable
                taste experience.
              </p>

              {/* NORMAL POPUP PRICE */}

              <div className="flex items-center gap-4 mb-6">
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "var(--gold)",
                  }}
                >
                  ₹{selectedProduct.price}
                </span>

                <span
                  style={{
                    color: "var(--muted)",
                    textDecoration: "line-through",
                  }}
                >
                  ₹{Math.round(selectedProduct.price * 1.3)}
                </span>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button
                  className="add-btn"
                  onClick={() => {
                    addToCart();
                    setSelectedProduct(null);
                  }}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>

                <button
                  className="outline-btn"
                  onClick={() => {
                    addToCart();
                    setSelectedProduct(null);
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>

            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "none",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;