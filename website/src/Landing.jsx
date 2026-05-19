// LandingPage.jsx
import { useState, useEffect, useRef } from "react";
import { PRODUCTS, CATEGORIES, BADGE_COLORS, INITIAL_COMMENTS, store } from "./data";
// import productImg8 from "./assets/product8.jpg";
// import heroBgImg from "./assets/hero-bg.jpg";
// import storyImg from "./assets/story.jpg";

import productImg1 from "./assets/imag1.jpg"
import productImg2 from "./assets/images55.jpg"
import productImg3 from "./assets/images6666.jpg"
import productImg4 from "./assets/imgges.jpg"
import productImg5 from "./assets/saru.jpg"
import productImg7 from "./assets/images55.jpg"
import productImg6 from "./assets/blog.webp"
// Map product images (use actual imported images)
const productImages = {
  1: productImg1,
  2: productImg2,
  3: productImg3,
  4: productImg4,
  5: productImg5,
  6: productImg6,
  7: productImg7,
  8: productImg8,
};

// ─── HERO IMAGE ─────────────────────────────────────────────────────────────
const HERO_IMAGE_URL = heroBgImg;

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () =>
      setProgress(window.scrollY / (document.body.scrollHeight - window.innerHeight));
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, {
      threshold: 0.12,
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= Math.round(rating) ? "#c2410c" : "#e7e5e4", fontSize: 12 }}>
          ★
        </span>
      ))}
    </span>
  );
}

function Badge({ text }) {
  const s = BADGE_COLORS[text] || { bg: "#f5f5f4", color: "#57534e", border: "#e7e5e4" };
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        padding: "2px 8px",
        borderRadius: 99,
      }}
    >
      {text}
    </span>
  );
}

// Product card with real product image
function ProductCard({ product, onAddToCart, onBuyNow }) {
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        border: "1.5px solid #f5f5f4",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Card image area with real product image */}
      <div
        style={{
          height: 170,
          position: "relative",
          overflow: "hidden",
          background: "#f5f5f4",
        }}
      >
        <img
          src={productImages[product.id] || productImages[1]}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 3 }}>
          <Badge text={product.badge} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 50,
            background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
            zIndex: 2,
          }}
        />
      </div>

      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#c2410c",
                marginBottom: 2,
              }}
            >
              {product.category}
            </p>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1c1917", lineHeight: 1.3 }}>{product.name}</h3>
          </div>
          <span
            style={{
              fontSize: 17,
              fontWeight: 900,
              color: "#1c1917",
              whiteSpace: "nowrap",
              background: "linear-gradient(135deg,#c2410c,#f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ₹{product.price}
          </span>
        </div>
        <p style={{ fontSize: 11, color: "#78716c", lineHeight: 1.6, flex: 1 }}>{product.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 10, color: "#a8a29e" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            onClick={handleAdd}
            style={{
              flex: 1,
              fontSize: 11,
              fontWeight: 700,
              padding: "8px 0",
              borderRadius: 12,
              border: added ? "1.5px solid #16a34a" : "1.5px solid #fdba74",
              background: added ? "#f0fdf4" : "#fff",
              color: added ? "#16a34a" : "#c2410c",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            {added ? "✓ Added!" : "+ Cart"}
          </button>
          <button
            onClick={() => onBuyNow(product)}
            style={{
              flex: 1,
              fontSize: 11,
              fontWeight: 700,
              padding: "8px 0",
              borderRadius: 12,
              border: "none",
              background: "#1c1917",
              color: "#fff",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#c2410c")}
            onMouseLeave={(e) => (e.target.style.background = "#1c1917")}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

function AdBanner({ onAddToCart, onBuyNow }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % PRODUCTS.length);
    }, 2800);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => {
    setActive(i);
    startTimer();
  };
  const p = PRODUCTS[active];

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #1c1917 0%, #292524 60%, #3b1c0c 100%)",
          borderRadius: 24,
          padding: "32px 36px",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 32,
          alignItems: "center",
          minHeight: 200,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: 160,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(194,65,12,0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Badge text={p.badge} />
            <span
              style={{
                fontSize: 10,
                color: "#a8a29e",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {p.category}
            </span>
          </div>
          <h2
            className="cormorant"
            style={{
              fontSize: "clamp(22px,3vw,34px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            {p.name}
          </h2>
          <p style={{ fontSize: 13, color: "#a8a29e", lineHeight: 1.6, maxWidth: 380, marginBottom: 16 }}>
            {p.desc}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#f97316" }}>₹{p.price}</span>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => onAddToCart(p)}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "9px 20px",
                  borderRadius: 12,
                  border: "1.5px solid #fdba74",
                  background: "transparent",
                  color: "#fdba74",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#fdba74";
                  e.target.style.color = "#1c1917";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#fdba74";
                }}
              >
                + Cart
              </button>
              <button
                onClick={() => onBuyNow(p)}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "9px 20px",
                  borderRadius: 12,
                  border: "none",
                  background: "#c2410c",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#ea580c")}
                onMouseLeave={(e) => (e.target.style.background = "#c2410c")}
              >
                Buy Now →
              </button>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
            <Stars rating={p.rating} />
            <span style={{ fontSize: 10, color: "#78716c" }}>({p.reviews} reviews)</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 96,
            lineHeight: 1,
            userSelect: "none",
            opacity: 0.9,
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            minWidth: 110,
          }}
        >
          {p.image}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
        {PRODUCTS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? 24 : 8,
              height: 8,
              borderRadius: 99,
              background: i === active ? "#c2410c" : "#e7e5e4",
              border: "none",
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
              padding: 0,
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, overflowX: "auto", paddingBottom: 4 }}>
        {PRODUCTS.map((prod, i) => (
          <button
            key={prod.id}
            onClick={() => goTo(i)}
            style={{
              flexShrink: 0,
              width: 56,
              height: 56,
              borderRadius: 14,
              background:
                i === active ? "linear-gradient(135deg,#fff7ed,#fef3c7)" : "#f5f5f4",
              border: i === active ? "2px solid #c2410c" : "2px solid transparent",
              cursor: "pointer",
              fontSize: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.25s",
            }}
          >
            {prod.image}
          </button>
        ))}
      </div>
    </div>
  );
}

function CartDrawer({ cart, onClose, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", address: "", email: "" });
  const [errors, setErrors] = useState({});

  const handleCheckoutSubmit = () => {
    const e = {};
    if (!customerInfo.name.trim()) e.name = "Name required";
    if (!customerInfo.phone.trim()) e.phone = "Phone required";
    if (!customerInfo.address.trim()) e.address = "Address required";
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    onCheckout(cart, total, customerInfo);
    setCheckoutStep(2);
    setTimeout(() => {
      onClose();
      setCheckoutStep(1);
      setCustomerInfo({ name: "", phone: "", address: "", email: "" });
    }, 2000);
  };

  if (checkoutStep === 2) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          onClick={onClose}
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
        />
        <div
          style={{
            position: "relative",
            background: "#fff",
            borderRadius: 24,
            padding: 40,
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: "#16a34a", marginBottom: 8 }}>Order Placed!</h3>
          <p style={{ color: "#78716c", fontSize: 13 }}>
            Your order has been confirmed. You'll receive updates shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }}>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          background: "#fff",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.12)",
          animation: "slideInRight 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #f5f5f4",
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1c1917" }}>Your Cart 🛒</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#a8a29e" }}>
            ✕
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {cart.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: 200,
                gap: 12,
                color: "#a8a29e",
              }}
            >
              <span style={{ fontSize: 48 }}>🧺</span>
              <p style={{ fontSize: 13 }}>Your cart is empty</p>
            </div>
          )}
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#fafaf9",
                borderRadius: 14,
                padding: 12,
                marginBottom: 10,
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 10, overflow: "hidden" }}>
                <img
                  src={productImages[item.id] || productImages[1]}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1c1917",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </p>
                <p style={{ fontSize: 12, color: "#78716c" }}>
                  ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button
                  onClick={() => onUpdateQty(item.id, item.qty - 1)}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#e7e5e4",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: 13, fontWeight: 700, width: 20, textAlign: "center" }}>{item.qty}</span>
                <button
                  onClick={() => onUpdateQty(item.id, item.qty + 1)}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "#e7e5e4",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#d4d4d4" }}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div style={{ padding: "16px 24px", borderTop: "1px solid #f5f5f4" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <span style={{ fontSize: 13, color: "#78716c" }}>Subtotal</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#1c1917" }}>₹{total}</span>
            </div>
            <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["name", "Full Name", errors.name],
                ["phone", "Phone Number", errors.phone],
                ["email", "Email (optional)", null],
              ].map(([field, placeholder, err]) => (
                <div key={field}>
                  <input
                    placeholder={placeholder}
                    value={customerInfo[field]}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, [field]: e.target.value })}
                    style={{
                      width: "100%",
                      border: err ? "1.5px solid #ef4444" : "1.5px solid #e7e5e4",
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontSize: 12,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  {err && <p style={{ color: "#ef4444", fontSize: 10 }}>{err}</p>}
                </div>
              ))}
              <div>
                <textarea
                  placeholder="Delivery Address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  rows={2}
                  style={{
                    width: "100%",
                    border: errors.address ? "1.5px solid #ef4444" : "1.5px solid #e7e5e4",
                    borderRadius: 12,
                    padding: "10px 12px",
                    fontSize: 12,
                    resize: "none",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                {errors.address && <p style={{ color: "#ef4444", fontSize: 10 }}>{errors.address}</p>}
              </div>
            </div>
            <button
              onClick={handleCheckoutSubmit}
              style={{
                width: "100%",
                background: "#1c1917",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                padding: "14px 0",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#c2410c")}
              onMouseLeave={(e) => (e.target.style.background = "#1c1917")}
            >
              Place Order →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BuyNowModal({ product, onClose, onOrderComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ fullName: "", phone: "", address: "", email: "" });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(formData.phone.trim())) e.phone = "Enter a valid 10-digit phone number";
    if (!formData.address.trim()) e.address = "Delivery address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (validate()) {
      onOrderComplete(product, formData);
      setStep(2);
      setTimeout(() => onClose(), 2500);
    }
  };

  if (!product) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}
      />
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 420,
          padding: 28,
          boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
          animation: "popIn 0.3s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#a8a29e" }}
        >
          ✕
        </button>
        {step === 1 && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 70, height: 70, borderRadius: 16, overflow: "hidden", background: "#f5f5f4" }}>
                <img
                  src={productImages[product.id] || productImages[1]}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div>
                <h3 className="cormorant" style={{ fontSize: 20, fontWeight: 700, color: "#1c1917" }}>
                  {product.name}
                </h3>
                <p style={{ color: "#c2410c", fontWeight: 900, fontSize: 22, marginTop: 2 }}>₹{product.price}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["fullName", "Full Name", errors.fullName],
                ["phone", "Phone Number", errors.phone],
                ["email", "Email (optional)", null],
              ].map(([name, ph, err]) => (
                <div key={name}>
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleInput}
                    placeholder={ph}
                    style={{
                      width: "100%",
                      border: err ? "1.5px solid #ef4444" : "1.5px solid #e7e5e4",
                      borderRadius: 12,
                      padding: "10px 14px",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  {err && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4 }}>{err}</p>}
                </div>
              ))}
              <div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInput}
                  placeholder="Delivery Address"
                  rows={2}
                  style={{
                    width: "100%",
                    border: errors.address ? "1.5px solid #ef4444" : "1.5px solid #e7e5e4",
                    borderRadius: 12,
                    padding: "10px 14px",
                    fontSize: 13,
                    outline: "none",
                    resize: "none",
                    boxSizing: "border-box",
                  }}
                />
                {errors.address && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4 }}>{errors.address}</p>}
              </div>
            </div>
            <button
              onClick={handleConfirm}
              style={{
                width: "100%",
                marginTop: 16,
                background: "#1c1917",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                padding: "14px 0",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#c2410c")}
              onMouseLeave={(e) => (e.target.style.background = "#1c1917")}
            >
              Confirm Order →
            </button>
          </>
        )}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "16px 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                background: "#f0fdf4",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              ✅
            </div>
            <h3 className="cormorant" style={{ fontSize: 26, fontWeight: 700, color: "#1c1917" }}>
              Order Placed!
            </h3>
            <p style={{ fontSize: 13, color: "#78716c", textAlign: "center", lineHeight: 1.6 }}>
              Your <strong>{product.name}</strong> will be delivered fresh to your door within 3–5 days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CommentForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", product: "", text: "", rating: 5 });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.text.trim()) e.text = "Review text is required";
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    onAdd({ ...form, avatar: ["🌸", "🌿", "🍃", "🌻", "🌾", "🌺"][Math.floor(Math.random() * 6)] });
    setSubmitted(true);
    setForm({ name: "", product: "", text: "", rating: 5 });
    setErrors({});
    setTimeout(() => setSubmitted(false), 2500);
  };

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        border: "1.5px solid #f5f5f4",
        padding: 24,
        boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
      }}
    >
      <h3 className="cormorant" style={{ fontSize: 22, fontWeight: 700, color: "#1c1917", marginBottom: 16 }}>
        Leave a Review
      </h3>
      {submitted ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#16a34a",
            fontWeight: 700,
            padding: "16px 0",
          }}
        >
          <span style={{ fontSize: 24 }}>🎉</span> Thank you for your review!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Your Name"
              style={{
                width: "100%",
                border: errors.name ? "1.5px solid #ef4444" : "1.5px solid #e7e5e4",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {errors.name && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4 }}>{errors.name}</p>}
          </div>
          <input
            value={form.product}
            onChange={(e) => set("product", e.target.value)}
            placeholder="Product Name (optional)"
            style={{
              width: "100%",
              border: "1.5px solid #e7e5e4",
              borderRadius: 12,
              padding: "10px 14px",
              fontSize: 13,
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <div>
            <textarea
              value={form.text}
              onChange={(e) => set("text", e.target.value)}
              placeholder="Share your experience..."
              rows={3}
              style={{
                width: "100%",
                border: errors.text ? "1.5px solid #ef4444" : "1.5px solid #e7e5e4",
                borderRadius: 12,
                padding: "10px 14px",
                fontSize: 13,
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
              }}
            />
            {errors.text && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4 }}>{errors.text}</p>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#78716c" }}>Rating:</span>
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => set("rating", i)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 22,
                  cursor: "pointer",
                  color: i <= form.rating ? "#c2410c" : "#e7e5e4",
                  transition: "transform 0.15s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.3)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                ★
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              background: "#1c1917",
              color: "#fff",
              fontWeight: 700,
              fontSize: 13,
              padding: "12px 0",
              borderRadius: 14,
              border: "none",
              cursor: "pointer",
              marginTop: 4,
            }}
            onMouseEnter={(e) => (e.target.style.background = "#c2410c")}
            onMouseLeave={(e) => (e.target.style.background = "#1c1917")}
          >
            Submit Review →
          </button>
        </div>
      )}
    </div>
  );
}

function Navbar({ cartCount, onCartOpen, onNavClick, onLogoClick }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Products", id: "products" },
    { label: "Our Story", id: "story" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (id) => {
    onNavClick(id);
    setMobileMenu(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: scrolled ? "rgba(250,247,242,0.97)" : "rgba(250,247,242,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid #e7e5e4" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 20px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={onLogoClick}
          style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flexShrink: 0 }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              background: "#1c1917",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              boxShadow: "0 4px 12px rgba(28,25,23,0.25)",
            }}
          >
            🌿
          </div>
          <div>
            <p className="cormorant" style={{ fontWeight: 700, fontSize: 20, color: "#1c1917", lineHeight: 1.1 }}>
              NourishCo
            </p>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c2410c", lineHeight: 1 }}>
              Homemade Goodness
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className="desktop-nav"
        >
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              style={{
                background: "none",
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                color: "#57534e",
                padding: "8px 14px",
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#f5f5f4";
                e.target.style.color = "#1c1917";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "none";
                e.target.style.color = "#57534e";
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <button
            onClick={onCartOpen}
            style={{
              position: "relative",
              width: 40,
              height: 40,
              background: "none",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f4")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
          >
            🛒
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  width: 18,
                  height: 18,
                  background: "#c2410c",
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 800,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenu((m) => !m)}
            style={{
              width: 40,
              height: 40,
              background: "none",
              border: "1.5px solid #e7e5e4",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mobile-menu-btn"
          >
            {mobileMenu ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileMenu && (
        <div
          style={{
            background: "#fff",
            borderTop: "1px solid #f5f5f4",
            padding: "8px 16px 16px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
          }}
        >
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                fontSize: 15,
                fontWeight: 600,
                color: "#1c1917",
                padding: "12px 12px",
                borderRadius: 10,
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f5f5f4")}
              onMouseLeave={(e) => (e.target.style.background = "none")}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// Hero Section with static image (no animations)
function HeroSection({ onShopNow }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#faf7f2",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "0%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(234,179,8,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "96px 24px 80px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: Text */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fff7ed",
              color: "#c2410c",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: 99,
              border: "1px solid #fed7aa",
              marginBottom: 24,
            }}
          >
            <span>🌿</span> 100% Homemade · Chemical Free
          </div>

          <h1
            className="cormorant"
            style={{
              fontSize: "clamp(46px,5.5vw,76px)",
              fontWeight: 700,
              color: "#1c1917",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              marginBottom: 22,
            }}
          >
            <span style={{ display: "block" }}>Nourish Your</span>
            <span
              style={{
                display: "block",
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 70%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Body &amp; Soul
            </span>
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "#78716c",
              lineHeight: 1.75,
              maxWidth: 400,
              marginBottom: 30,
            }}
          >
            Handcrafted health foods made with love, tradition and the finest natural ingredients.
            From farm to your table — pure, fresh, and preservative-free.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            <button
              onClick={onShopNow}
              style={{
                background: "#1c1917",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                padding: "14px 28px",
                borderRadius: 14,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.04em",
                boxShadow: "0 8px 24px rgba(28,25,23,0.22)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#c2410c";
                e.target.style.transform = "scale(1.04) translateY(-2px)";
                e.target.style.boxShadow = "0 12px 32px rgba(194,65,12,0.35)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#1c1917";
                e.target.style.transform = "scale(1) translateY(0)";
                e.target.style.boxShadow = "0 8px 24px rgba(28,25,23,0.22)";
              }}
            >
              Shop Now →
            </button>
            <a
              href="#story"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "2px solid #e7e5e4",
                color: "#57534e",
                fontWeight: 700,
                fontSize: 13,
                padding: "12px 24px",
                borderRadius: 14,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#c2410c";
                e.currentTarget.style.color = "#c2410c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#e7e5e4";
                e.currentTarget.style.color = "#57534e";
              }}
            >
              Our Story ↓
            </a>
          </div>

          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[
              ["500+", "Happy Customers"],
              ["100%", "Natural"],
              ["0", "Preservatives"],
            ].map(([val, label]) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#1c1917",
                    lineHeight: 1,
                    fontFamily: "'Outfit', sans-serif",
                    background: "linear-gradient(135deg,#c2410c,#f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {val}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: "#a8a29e",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: 4,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Static Hero Image */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 520,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 380,
              height: 380,
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid rgba(255,255,255,0.9)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={HERO_IMAGE_URL}
              alt="Healthy homemade food"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: mounted ? 0.6 : 0,
          transition: "opacity 1s",
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#a8a29e",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1.5,
            height: 32,
            background: "linear-gradient(to bottom, #a8a29e, transparent)",
          }}
        />
      </div>
    </section>
  );
}

function StorySection() {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <section
      id="story"
      ref={ref}
      style={{
        padding: "100px 0",
        background: "linear-gradient(135deg, #fff7ed 0%, #fefce8 50%, #ecfccb 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(251,146,60,0.18)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(34,197,94,0.18)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          maxWidth: 1150,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: 70,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s ease",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 28,
              padding: 28,
              boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
              border: "1px solid #f3f4f6",
            }}
          >
            <div
              style={{
                borderRadius: 22,
                overflow: "hidden",
                aspectRatio: "16/10",
                position: "relative",
              }}
            >
              <img
                src={storyImg}
                alt="Our homemade journey"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(rgba(0,0,0,0.05),rgba(0,0,0,0.25))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 14,
                  left: 14,
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 12,
                  padding: "6px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1c1917",
                }}
              >
                🌿 Fresh • Healthy • Traditional
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <h3 className="cormorant" style={{ fontSize: 28, fontWeight: 700, color: "#1f2937", marginBottom: 14 }}>
                Our Product History
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4b5563", marginBottom: 14 }}>
                NourishCo started as a small homemade food business in Tamil Nadu. Our family prepared healthy snacks,
                organic ghee, and traditional recipes using natural ingredients.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#6b7280" }}>
                Over time, people loved our products because of the authentic taste and quality. Today, we continue
                making fresh homemade foods with love, tradition, and care for every family.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(40px)",
            transition: "all 0.9s ease 0.2s",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fed7aa",
              color: "#ea580c",
              padding: "8px 18px",
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 22,
            }}
          >
            🌿 OUR STORY
          </div>
          <h2
            className="cormorant"
            style={{
              fontSize: "clamp(32px,3vw,46px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#111827",
              marginBottom: 18,
            }}
          >
            Healthy Homemade Foods
            <br />
            From Tamil Nadu
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.9, color: "#4b5563", marginBottom: 18 }}>
            We create homemade healthy products with traditional recipes and fresh organic ingredients. Every item is
            prepared carefully to give natural taste and better health.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: "#6b7280" }}>
            Our mission is to provide pure homemade foods without preservatives and maintain the authentic traditional
            flavor loved by families.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 22, marginTop: 34 }}>
            {[
              ["2019", "Started"],
              ["15K+", "Happy Customers"],
              ["35+", "Healthy Products"],
            ].map(([value, label]) => (
              <div
                key={label}
                style={{
                  background: "#fff",
                  padding: "20px 26px",
                  borderRadius: 20,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  minWidth: 120,
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
                }}
              >
                <h3
                  style={{
                    fontSize: 30,
                    fontWeight: 800,
                    marginBottom: 6,
                    background: "linear-gradient(135deg,#16a34a,#22c55e)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </h3>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsSection({ onAddToCart, onBuyNow, onMoreProducts }) {
  const shown = PRODUCTS.slice(0, 4);
  const ref = useRef();
  const inView = useInView(ref);

  return (
    <section id="products" ref={ref} style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s",
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "#c2410c" }}>
            Pure &amp; Natural
          </p>
          <h2
            className="cormorant"
            style={{
              fontSize: "clamp(36px,5vw,56px)",
              fontWeight: 700,
              color: "#1c1917",
              marginBottom: 16,
            }}
          >
            Our Best Sellers
          </h2>
          <p style={{ fontSize: 13, color: "#78716c", maxWidth: 520, margin: "0 auto 40px" }}>
            Handcrafted with traditional recipes and pure ingredients, delivered fresh from our kitchen to yours.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
          {shown.map((p, i) => (
            <div
              key={p.id}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `all 0.7s ${i * 120}ms cubic-bezier(.4,0,.2,1)`,
              }}
            >
              <ProductCard product={p} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
            </div>
          ))}
        </div>

        {PRODUCTS.length > 4 && (
          <button
            onClick={onMoreProducts}
            style={{
              background: "none",
              border: "2px solid #1c1917",
              color: "#1c1917",
              fontWeight: 700,
              fontSize: 12,
              padding: "10px 32px",
              borderRadius: 40,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#1c1917";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "#1c1917";
            }}
          >
            View All Products →
          </button>
        )}
      </div>
    </section>
  );
}

function ReviewsSection({ comments, onAddComment }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <section id="reviews" ref={ref} style={{ padding: "80px 0", background: "#faf7f2" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 40,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#c2410c",
              marginBottom: 8,
            }}
          >
            Real People, Real Results
          </p>
          <h2 className="cormorant" style={{ fontSize: "clamp(36px,5vw,52px)", fontWeight: 700, color: "#1c1917" }}>
            What Our Customers Say
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {comments.map((c, i) => (
            <div
              key={c.id}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: 20,
                border: "1.5px solid #f5f5f4",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.7s ${i * 80}ms`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.09)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    background: "#fff7ed",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {c.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1c1917" }}>{c.name}</p>
                  {c.product && <p style={{ fontSize: 10, color: "#c2410c", fontWeight: 600 }}>{c.product}</p>}
                  {c.date && <p style={{ fontSize: 9, color: "#a8a29e", marginTop: 2 }}>{c.date}</p>}
                </div>
                <Stars rating={c.rating} />
              </div>
              <p style={{ fontSize: 12, color: "#57534e", lineHeight: 1.7, fontStyle: "italic" }}>"{c.text}"</p>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <CommentForm onAdd={onAddComment} />
        </div>
      </div>
    </section>
  );
}

function ContactSection({ onContactSubmit }) {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const ref = useRef();
  const inView = useInView(ref);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email or phone is required";
    if (!formData.message.trim()) e.message = "Message is required";
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    onContactSubmit(formData);
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" ref={ref} style={{ padding: "80px 0", background: "#fff" }}>
      <div
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 60,
          alignItems: "start",
        }}
      >
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-24px)",
            transition: "all 0.7s",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#c2410c",
              marginBottom: 10,
            }}
          >
            Get in Touch
          </p>
          <h2
            className="cormorant"
            style={{
              fontSize: "clamp(32px,4vw,46px)",
              fontWeight: 700,
              color: "#1c1917",
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            We'd Love to
            <br />
            Hear From You
          </h2>
          <p style={{ fontSize: 13, color: "#78716c", lineHeight: 1.7, marginBottom: 20 }}>
            Questions about ingredients, bulk orders, or just want to say hi? Drop us a message.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["📍", "Made in Hyderabad, Telangana"],
              ["📦", "Delivery across India"],
              ["📞", "+91 98765 43210"],
              ["✉️", "hello@nourishco.in"],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#57534e" }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(24px)",
            transition: "all 0.7s 0.2s",
          }}
        >
          {sent ? (
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1.5px solid #f5f5f4",
                padding: 36,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span style={{ fontSize: 44 }}>🌿</span>
              <h3 className="cormorant" style={{ fontSize: 28, fontWeight: 700, color: "#1c1917" }}>
                Message Sent!
              </h3>
              <p style={{ fontSize: 13, color: "#78716c", textAlign: "center" }}>
                We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1.5px solid #f5f5f4",
                padding: 24,
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[
                ["name", "Your Name", errors.name],
                ["email", "Email or Phone", errors.email],
              ].map(([name, ph, err]) => (
                <div key={name}>
                  <input
                    name={name}
                    value={formData[name]}
                    onChange={handleInput}
                    placeholder={ph}
                    style={{
                      width: "100%",
                      border: err ? "1.5px solid #ef4444" : "1.5px solid #e7e5e4",
                      borderRadius: 12,
                      padding: "10px 14px",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  {err && <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4 }}>{err}</p>}
                </div>
              ))}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInput}
                  placeholder="Your message..."
                  rows={4}
                  style={{
                    width: "100%",
                    border: errors.message ? "1.5px solid #ef4444" : "1.5px solid #e7e5e4",
                    borderRadius: 12,
                    padding: "10px 14px",
                    fontSize: 13,
                    outline: "none",
                    resize: "none",
                    boxSizing: "border-box",
                  }}
                />
                {errors.message && (
                  <p style={{ color: "#ef4444", fontSize: 10, marginTop: 4 }}>{errors.message}</p>
                )}
              </div>
              <button
                onClick={handleSubmit}
                style={{
                  width: "100%",
                  background: "#1c1917",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  padding: "13px 0",
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#c2410c")}
                onMouseLeave={(e) => (e.target.style.background = "#1c1917")}
              >
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#1c1917", color: "#fff" }}>
      <div style={{ height: 3, background: "linear-gradient(90deg, #c2410c, #f97316, #fbbf24, #c2410c)" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 24px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 40,
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 28,
          }}
        >
          <div style={{ minWidth: 200, maxWidth: 260 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "#c2410c",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                🌿
              </div>
              <div>
                <p className="cormorant" style={{ fontWeight: 700, fontSize: 20, lineHeight: 1 }}>
                  NourishCo
                </p>
                <p style={{ fontSize: 9, color: "#a8a29e", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Homemade Goodness
                </p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#78716c", lineHeight: 1.6 }}>
              Handcrafted health foods made with love and the finest natural ingredients.
            </p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#c2410c",
                  marginBottom: 12,
                }}
              >
                Navigate
              </h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {["Home", "Products", "Our Story", "Reviews", "Contact"].map((l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase().replace(" ", "-")}`}
                      style={{ fontSize: 12, color: "#a8a29e", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.target.style.color = "#f97316")}
                      onMouseLeave={(e) => (e.target.style.color = "#a8a29e")}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#c2410c",
                  marginBottom: 12,
                }}
              >
                Contact
              </h4>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  ["📞", "+91 98765 43210"],
                  ["✉️", "hello@nourishco.in"],
                  ["📍", "Hyderabad, Telangana"],
                  ["🕐", "Mon–Sat: 9AM–7PM"],
                ].map(([icon, text]) => (
                  <li
                    key={text}
                    style={{ fontSize: 12, color: "#a8a29e", display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <span>{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #292524",
            paddingTop: 20,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 11, color: "#57534e" }}>© 2025 NourishCo · Made with ❤️ in Hyderabad</p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {["💳 Secure Payments", "🚚 Free Shipping ₹999+", "🔄 7-Day Returns"].map((t) => (
              <span key={t} style={{ fontSize: 10, color: "#57534e" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN LANDING PAGE ──────────────────────────────────────────────────────

export default function LandingPage({
  cart,
  setCart,
  cartOpen,
  setCartOpen,
  buyProduct,
  setBuyProduct,
  comments,
  setComments,
  scrollTo,
  goToShop,
  progress,
}) {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === product.id);
      if (ex) return c.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty < 1) setCart((c) => c.filter((i) => i.id !== id));
    else setCart((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const handleCheckout = (cartItems, total, customerInfo) => {
    store.addOrder({ items: cartItems, total, customer: customerInfo });
    setCart([]);
  };

  const handleBuyNowOrder = (product, customerInfo) => {
    store.addOrder({ items: [{ ...product, qty: 1 }], total: product.price, customer: customerInfo });
  };

  const handleAddComment = (newComment) => {
    const saved = store.addComment(newComment);
    setComments((prev) => [saved, ...prev]);
  };

  const handleContactSubmit = (data) => {
    store.addContact(data);
  };

  return (
    <>
      {progress !== undefined && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 60,
            height: 3,
            background: "linear-gradient(90deg, #c2410c, #f97316, #fbbf24)",
            width: `${progress * 100}%`,
            transition: "width 0.1s linear",
          }}
        />
      )}

      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavClick={scrollTo}
        onLogoClick={goToShop}
      />
      <HeroSection onShopNow={goToShop} />
      <StorySection />
      <ProductsSection onAddToCart={addToCart} onBuyNow={setBuyProduct} onMoreProducts={goToShop} />
      <ReviewsSection comments={comments} onAddComment={handleAddComment} />
      <ContactSection onContactSubmit={handleContactSubmit} />
      <Footer />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={(id) => setCart((c) => c.filter((i) => i.id !== id))}
          onCheckout={handleCheckout}
        />
      )}
      {buyProduct && (
        <BuyNowModal
          product={buyProduct}
          onClose={() => setBuyProduct(null)}
          onOrderComplete={handleBuyNowOrder}
        />
      )}
    </>
  );
}