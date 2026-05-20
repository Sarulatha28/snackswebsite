// src/components/HeroSection.jsx
import { useState, useEffect, useRef } from "react";
import { PRODUCTS, REVIEWS } from "../data";
import heroImg from "../assets/images1.jpg";
import { Star, ArrowRight, Quote, Play, X, Send, Heart, ChevronDown } from "lucide-react";

const HeroSection = ({ cartCount, setCartCount }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState(
    REVIEWS.map((item, index) => ({ ...item, rating: [5, 4, 3, 5, 4][index % 5] }))
  );
  const [formData, setFormData] = useState({ name: "", text: "", rating: 5 });
  const [videoOpen, setVideoOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setSectionRef = (name) => (el) => {
    sectionRefs.current[name] = el;
  };

  const addToCart = (product) => {
    setCartCount((prev) => prev + 1);
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.text) return;
    setReviews([{ id: reviews.length + 1, ...formData }, ...reviews]);
    setFormData({ name: "", text: "", rating: 5 });
  };

  // Smooth scroll helper
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: 'var(--ink)', color: 'var(--cream)' }} className="overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

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

        * { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'Playfair Display', serif; }

        /* Force normal font for numbers in stats and prices */
        .stat-number, .price-number, .hero-stats-number {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          letter-spacing: normal;
          font-feature-settings: "tnum";
          font-variant-numeric: tabular-nums;
        }

        /* REVEAL ANIMATIONS */
        .reveal { opacity: 0; transform: translateY(48px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-left { opacity: 0; transform: translateX(-48px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .reveal-left.visible { opacity: 1; transform: translateX(0); }
        .reveal-right { opacity: 0; transform: translateX(48px); transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .reveal-right.visible { opacity: 1; transform: translateX(0); }

        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }
        .delay-5 { transition-delay: 0.55s; }

        /* HERO SECTION */
        .hero-section {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80');
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          animation: slowKen 20s ease-in-out infinite alternate;
        }
        @keyframes slowKen {
          from { transform: scale(1.05) translate(0,0); }
          to { transform: scale(1.12) translate(-1%, -1%); }
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(13,10,7,0.96) 0%, rgba(13,10,7,0.75) 50%, rgba(13,10,7,0.9) 100%);
        }
        .hero-grain {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px;
        }

        /* CATEGORY PILLS */
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
          backdrop-filter: blur(8px);
          animation: pillFloat 4s ease-in-out infinite;
        }
        @keyframes pillFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* HERO SCROLL INDICATOR */
        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          animation: scrollBounce 2.5s ease-in-out infinite;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50% { transform: translateX(-50%) translateY(8px); opacity: 1; }
        }

        /* PRODUCT CARDS */
        .product-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
          position: relative;
        }
        .product-card:hover {
          border-color: rgba(212,168,75,0.4);
          transform: translateY(-8px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,168,75,0.1);
        }
        .product-card .card-img {
          height: 240px;
          overflow: hidden;
          position: relative;
        }
        .product-card .card-img img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .product-card:hover .card-img img { transform: scale(1.08); }
        .product-card .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,10,7,0.85) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .product-card:hover .card-overlay { opacity: 1; }
        .card-hover-info {
          position: absolute;
          bottom: 0;
          left: 0; right: 0;
          padding: 16px;
          transform: translateY(100%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .product-card:hover .card-hover-info { transform: translateY(0); }

        .add-btn {
          background: linear-gradient(135deg, var(--gold) 0%, #b8892a 100%);
          color: var(--ink);
          border: none;
          padding: 12px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .add-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .add-btn:hover::after { opacity: 1; }
        .add-btn span { position: relative; z-index: 1; }
        .add-btn:hover { transform: scale(1.02); }

        .outline-btn {
          background: transparent;
          color: var(--cream);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 14px;
          font-weight: 500;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s;
        }
        .outline-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(212,168,75,0.06);
        }

        /* DIVIDER */
        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 8px 0;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .divider-icon { color: var(--gold); font-size: 0.7rem; }

        /* REVIEW CARDS */
        .review-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 28px;
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          overflow: hidden;
        }
        .review-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top right, rgba(212,168,75,0.06), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .review-card:hover { border-color: rgba(212,168,75,0.3); transform: translateY(-6px); }
        .review-card:hover::before { opacity: 1; }

        /* STORY SECTION */
        .story-video-frame {
          border-radius: 28px;
          overflow: hidden;
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, rgba(212,168,75,0.08), rgba(192,57,43,0.08));
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
        }
        .play-btn {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--crimson));
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s;
          position: relative;
          z-index: 1;
        }
        .play-btn::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(212,168,75,0.3);
          animation: playPulse 2.5s ease-in-out infinite;
        }
        @keyframes playPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0; }
        }
        .play-btn:hover { transform: scale(1.1); box-shadow: 0 20px 60px rgba(212,168,75,0.3); }

        /* STAT CARDS */
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.35s;
        }
        .stat-card:hover { border-color: rgba(212,168,75,0.35); transform: translateY(-4px); }

        /* CONTACT FORM */
        .form-field {
          background: rgba(245,240,232,0.04);
          border: 1px solid var(--border);
          color: var(--cream);
          border-radius: 14px;
          padding: 14px 18px;
          font-size: 0.9rem;
          width: 100%;
          outline: none;
          transition: border-color 0.3s;
          font-family: 'DM Sans', sans-serif;
        }
        .form-field::placeholder { color: rgba(245,240,232,0.3); }
        .form-field:focus { border-color: var(--gold); }

        /* POPUP */
        .popup-overlay {
          animation: overlayFadeIn 0.3s ease forwards;
        }
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .popup-modal {
          animation: modalSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* TICKER */
        .ticker-track {
          display: inline-flex;
          gap: 0;
          animation: ticker 25s linear infinite;
          white-space: nowrap;
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* SECTION LABEL */
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

        /* FOOTER */
        .footer-link {
          display: block;
          color: var(--muted);
          font-size: 0.85rem;
          transition: color 0.3s;
          padding: 4px 0;
          text-decoration: none;
        }
        .footer-link:hover { color: var(--gold); }
      `}</style>

      {/* ─── HERO ─────────────────────────────────────── */}
      <section id="home" className="hero-section">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-grain" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-28 pb-20">
          <div className="max-w-3xl">
            <div className="reveal visible flex flex-wrap gap-3 mb-10">
              <span className="pill" style={{ animationDelay: '0s' }}>⭐ 4.9 Rating</span>
              <span className="pill" style={{ animationDelay: '1.2s' }}>🚀 30 min Delivery</span>
              <span className="pill" style={{ animationDelay: '2.4s' }}>👨‍🍳 Chef Curated</span>
            </div>

            <h1
              className="serif reveal visible"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 900,
                lineHeight: 1.02,
                color: 'var(--cream)',
                letterSpacing: '-0.02em'
              }}
            >
              Where Every
              <br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Bite</em> Tells
              <br />
              a Story.
            </h1>

          <p
  className="reveal visible delay-2"
  style={{
    color: "var(--muted)",
    fontSize: "1.05rem",
    lineHeight: 1.8,
    maxWidth: 500,
    marginTop: 24,
    marginBottom: 40,
  }}
>
  Premium ingredients. Masterful preparation.
  Delivered to your door — a restaurant experience without leaving home.
</p>

{/* HERO ACTION BUTTONS */}
<div
  className="reveal visible delay-3"
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "center",
    marginTop: "10px",
  }}
>
          {/* HERO ACTION BUTTONS */}

  {/* SHOP NOW BUTTON */}
  <button
    onClick={() => scrollToSection("products")}
    style={{
      background: "linear-gradient(135deg, var(--gold), #b8892a)",
      color: "var(--ink)",
      padding: "15px 34px",
      borderRadius: "999px",
      fontWeight: 700,
      fontSize: "0.88rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.35s ease",
      boxShadow: "0 10px 30px rgba(212,168,75,0.25)",
      minWidth: "180px",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
      e.currentTarget.style.boxShadow =
        "0 18px 40px rgba(212,168,75,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "";
      e.currentTarget.style.boxShadow =
        "0 10px 30px rgba(212,168,75,0.25)";
    }}
  >
    Shop Now
    <ArrowRight size={18} />
  </button>

  {/* OUR STORY BUTTON */}
  <button
    onClick={() => scrollToSection("story")}
    style={{
      background: "rgba(245,240,232,0.05)",
      backdropFilter: "blur(10px)",
      border: "1px solid var(--border)",
      color: "var(--cream)",
      padding: "15px 32px",
      borderRadius: "999px",
      fontWeight: 600,
      fontSize: "0.88rem",
      letterSpacing: "0.06em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      cursor: "pointer",
      transition: "all 0.35s ease",
      minWidth: "180px",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "var(--gold)";
      e.currentTarget.style.color = "var(--gold)";
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.background = "rgba(212,168,75,0.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.color = "var(--cream)";
      e.currentTarget.style.transform = "";
      e.currentTarget.style.background = "rgba(245,240,232,0.05)";
    }}
  >
    <Play size={16} />
    Our Story
  </button>
</div>

            {/* STATS ROW - Normal font for numbers */}
            <div className="reveal delay-4 flex flex-wrap gap-8 mt-16 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
              {[['50K+', 'Orders'], ['4.9★', 'Rating'], ['10+', 'Years'], ['200+', 'Dishes']].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-number" style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--gold)', fontFamily: "'DM Sans', sans-serif", fontFeatureSettings: "'tnum'", fontVariantNumeric: 'tabular-nums' }}>
                    {n}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <ChevronDown size={16} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ─── TICKER ────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(212,168,75,0.03)', overflow: 'hidden', padding: '14px 0' }}>
        <div className="ticker-track">
          {[...Array(12)].map((_, i) => (
            <span
              key={i}
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: i % 2 === 0 ? 'var(--gold)' : 'var(--muted)',
                padding: '0 40px'
              }}
            >
              {i % 2 === 0 ? '✦ Premium Dining' : '◆ Fresh Daily'}
            </span>
          ))}
        </div>
      </div>

      {/* ─── PRODUCTS ──────────────────────────────────── */}
      <section
        id="products"
        ref={setSectionRef('products')}
        data-section="products"
        className="py-28 px-6 lg:px-12 max-w-7xl mx-auto"
      >
        <div className={`text-center mb-20 reveal ${visibleSections.products ? 'visible' : ''}`}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Popular Dishes</p>
          <h2 className="serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Mostly Ordered
            <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Favourites</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((item, i) => (
            <div
              key={item.id}
              className={`product-card reveal ${visibleSections.products ? 'visible' : ''} delay-${Math.min(i + 1, 5)}`}
              onClick={() => setSelectedProduct(item)}
            >
              {/* IMAGE */}
              <div className="card-img">
                <img src={item.image} alt={item.title} />
                <div className="card-overlay" />
                <div className="card-hover-info">
                  <div
                    style={{ background: 'rgba(13,10,7,0.85)', backdropFilter: 'blur(12px)', border: '1px solid var(--border)', borderRadius: 16, padding: '14px' }}
                  >
                    <p style={{ color: 'var(--muted)', fontSize: '0.78rem', lineHeight: 1.7 }}>
                      Fresh premium ingredients with authentic preparation — a dish worth savoring.
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    position: 'absolute', top: 14, left: 14, zIndex: 10,
                    background: 'linear-gradient(135deg, var(--gold), #b8892a)',
                    color: 'var(--ink)', fontSize: '0.65rem', padding: '5px 12px',
                    borderRadius: 100, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase'
                  }}
                >
                  Chef's Pick
                </div>
                <button
                  onClick={e => e.stopPropagation()}
                  style={{
                    position: 'absolute', top: 14, right: 14, zIndex: 10,
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'rgba(13,10,7,0.7)', backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s', cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(192,57,43,0.3)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(13,10,7,0.7)'}
                >
                  <Heart size={16} style={{ color: 'var(--cream)' }} />
                </button>
              </div>

              {/* CONTENT */}
              <div style={{ padding: 20 }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="serif" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.2 }}>{item.title}</h3>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={11} style={{ fill: 'var(--gold)', color: 'var(--gold)' }} />
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.7, marginBottom: 16 }}>
                  Premium quality with rich, authentic flavors crafted fresh daily.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="price-number" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)', fontFamily: "'DM Sans', sans-serif", fontFeatureSettings: "'tnum'", fontVariantNumeric: 'tabular-nums' }}>₹{item.price}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>30 min delivery</span>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="add-btn"
                    onClick={e => { e.stopPropagation(); addToCart(item); }}
                  >
                    <span>Add to Cart</span>
                  </button>
                  <button className="outline-btn" onClick={e => e.stopPropagation()}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STORY ─────────────────────────────────────── */}
      <section
        id="story"
        ref={setSectionRef('story')}
        data-section="story"
        className="py-28 px-6 lg:px-12"
        style={{ background: 'rgba(245,240,232,0.02)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`reveal-left ${visibleSections.story ? 'visible' : ''}`}>
            <div
              className="story-video-frame"
              onClick={() => setVideoOpen(true)}
            >
              <div
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80)',
                  backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.3
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,10,7,0.7), transparent)' }} />
              <div className="play-btn">
                <Play size={24} fill="white" />
              </div>
              <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Watch Film</p>
                <h3 className="serif" style={{ color: 'var(--cream)', fontSize: '1.3rem', fontWeight: 700 }}>The Art of Our Kitchen</h3>
              </div>
            </div>
          </div>

          <div className={`reveal-right ${visibleSections.story ? 'visible' : ''}`}>
            <p className="section-label">Our Story</p>
            <h2 className="serif" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Passion For
              <br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Extraordinary</em>
              <br />
              Flavours
            </h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 32 }}>
              Born from a deep love of culinary tradition and a drive for innovation, we source only
              the finest ingredients to craft experiences that transcend the ordinary. Each dish is
              a carefully composed story on a plate.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[['10+', 'Years of Excellence'], ['50K+', 'Happy Orders'], ['200+', 'Unique Dishes'], ['4.9★', 'Average Rating']].map(([n, l]) => (
                <div key={l} className="stat-card">
                  <div className="stat-number" style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--gold)', lineHeight: 1, fontFamily: "'DM Sans', sans-serif", fontFeatureSettings: "'tnum'", fontVariantNumeric: 'tabular-nums' }}>{n}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.78rem', letterSpacing: '0.06em', marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => scrollToSection('products')}
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--gold)',
                padding: '12px 28px',
                borderRadius: 40,
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.background = 'rgba(212,168,75,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; }}
            >
              Explore Our Menu <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ───────────────────────────────────── */}
      <section
        id="reviews"
        ref={setSectionRef('reviews')}
        data-section="reviews"
        className="py-28 px-6 lg:px-12 max-w-7xl mx-auto"
      >
        <div className={`text-center mb-20 reveal ${visibleSections.reviews ? 'visible' : ''}`}>
          <p className="section-label" style={{ justifyContent: 'center' }}>Testimonials</p>
          <h2 className="serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            What Our Guests
            <br />
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Are Saying</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {reviews.slice(0, 3).map((r, i) => (
            <div key={r.id} className={`review-card reveal ${visibleSections.reviews ? 'visible' : ''} delay-${i + 1}`}>
              <Quote size={28} style={{ color: 'var(--gold)', opacity: 0.4, marginBottom: 16 }} />
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.85, marginBottom: 20, fontStyle: 'italic' }}>
                "{r.text}"
              </p>
              <div className="divider"><span className="divider-icon">✦</span></div>
              <div className="flex items-center gap-3 mt-4">
                <div
                  style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gold), var(--crimson))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: '1rem', color: 'white'
                  }}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '0.88rem' }}>{r.name}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={10} style={{ fill: s <= r.rating ? 'var(--gold)' : 'transparent', color: s <= r.rating ? 'var(--gold)' : 'rgba(212,168,75,0.2)' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* REVIEW FORM */}
        <div
          className={`reveal ${visibleSections.reviews ? 'visible' : ''} delay-3`}
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 32, padding: 'clamp(24px, 5vw, 56px)', display: 'grid', gap: 40 }}
        >
          <div style={{ display: 'grid', gap: 40 }} className="lg:grid-cols-2">
            <div>
              <p className="section-label">Share Experience</p>
              <h2 className="serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
                Leave Your
                <br />
                <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Review</em>
              </h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: 28 }}>
                Your feedback helps us deliver an even better experience to food lovers everywhere.
              </p>
              <div className="flex gap-4 flex-wrap">
                {[['4.9★', 'Avg Rating'], ['25K+', 'Reviews']].map(([n, l]) => (
                  <div key={l} className="stat-card" style={{ padding: '16px 20px' }}>
                    <div className="stat-number" style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{n}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleReview} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="form-field"
              />
              <textarea
                rows={5}
                placeholder="Write your review…"
                value={formData.text}
                onChange={e => setFormData({ ...formData, text: e.target.value })}
                className="form-field"
                style={{ resize: 'none' }}
              />
              <div>
                <p style={{ color: 'var(--muted)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Your Rating</p>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(s => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setFormData({ ...formData, rating: s })}
                      style={{ transition: 'transform 0.2s', background: 'none', border: 'none', cursor: 'pointer' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                      onMouseLeave={e => e.currentTarget.style.transform = ''}
                    >
                      <Star size={28} style={{ fill: s <= formData.rating ? 'var(--gold)' : 'transparent', color: s <= formData.rating ? 'var(--gold)' : 'rgba(212,168,75,0.25)', transition: 'all 0.2s' }} />
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, var(--gold), var(--crimson))',
                  color: 'white', padding: '14px 24px', borderRadius: 14,
                  fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em',
                  textTransform: 'uppercase', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8, transition: 'all 0.3s',
                  marginTop: 4, border: 'none', cursor: 'pointer'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                Submit Review <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ───────────────────────────────────── */}
      <section
        id="contact"
        ref={setSectionRef('contact')}
        data-section="contact"
        className="py-28 px-6 lg:px-12"
        style={{ background: 'rgba(245,240,232,0.02)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`reveal ${visibleSections.contact ? 'visible' : ''}`}
            style={{
              background: `linear-gradient(135deg, rgba(212,168,75,0.06) 0%, rgba(192,57,43,0.06) 100%)`,
              border: '1px solid var(--border)',
              borderRadius: 32,
              padding: 'clamp(32px, 5vw, 60px)',
              display: 'grid',
              gap: 48
            }}
          >
            <div className="lg:grid-cols-2 grid gap-12">
              <div>
                <p className="section-label">Get in Touch</p>
                <h2 className="serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
                  Let's Talk About
                  <br />
                  <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Delicious Food</em>
                </h2>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: 32 }}>
                  Reach out for premium orders, catering enquiries, or just to tell us how much you loved your last meal.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[['📍', 'Chennai, Tamil Nadu, India'], ['📞', '+91 9876543210'], ['✉️', 'hello@saveur.in']].map(([icon, text]) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--muted)', fontSize: '0.88rem' }}>
                      <span style={{ fontSize: '1rem' }}>{icon}</span>
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              <form style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input type="text" placeholder="Your Name" className="form-field" />
                <input type="email" placeholder="Your Email" className="form-field" />
                <textarea rows={5} placeholder="Your Message" className="form-field" style={{ resize: 'none' }} />
                <button
                  type="button"
                  style={{
                    background: 'linear-gradient(135deg, var(--gold), #b8892a)',
                    color: 'var(--ink)', padding: '14px 24px', borderRadius: 14,
                    fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.08em',
                    textTransform: 'uppercase', transition: 'all 0.3s', marginTop: 4,
                    border: 'none', cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={e => e.currentTarget.style.transform = ''}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '56px 24px 32px' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <h2 className="serif" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gold)', marginBottom: 14 }}>
              SAVEUR<span style={{ color: 'var(--crimson)' }}>.</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.8 }}>
              Premium culinary experiences delivered to your door. Where every bite tells a story.
            </p>
          </div>
          {[
            ['Quick Links', ['Home', 'Menu', 'Reviews', 'Our Story', 'Contact']],
            ['Services', ['Fast Delivery', 'Premium Foods', '24/7 Support', 'Catering', 'Gift Cards']],
            ['Connect', ['Chennai, India', '+91 9876543210', 'hello@saveur.in']],
          ].map(([title, items]) => (
            <div key={title}>
              <h3 style={{ color: 'var(--cream)', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>{title}</h3>
              {items.map(item => {
                // Handle smooth scrolling for nav links
                let href = '#';
                let clickHandler = null;
                if (item === 'Home') clickHandler = (e) => { e.preventDefault(); scrollToSection('home'); };
                else if (item === 'Menu') clickHandler = (e) => { e.preventDefault(); scrollToSection('products'); };
                else if (item === 'Reviews') clickHandler = (e) => { e.preventDefault(); scrollToSection('reviews'); };
                else if (item === 'Our Story') clickHandler = (e) => { e.preventDefault(); scrollToSection('story'); };
                else if (item === 'Contact') clickHandler = (e) => { e.preventDefault(); scrollToSection('contact'); };
                
                return (
                  <a 
                    key={item} 
                    href={href} 
                    className="footer-link"
                    onClick={clickHandler}
                    style={{ cursor: clickHandler ? 'pointer' : 'default', display: 'block' }}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, textAlign: 'center', color: 'var(--muted)', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} SAVEUR. All rights reserved.
        </div>
      </footer>

      {/* ─── PRODUCT POPUP ─────────────────────────────── */}
      {selectedProduct && (
        <div
          className="popup-overlay fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{ background: 'rgba(13,10,7,0.9)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="popup-modal"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 28,
              maxWidth: 480,
              width: '100%',
              overflow: 'hidden'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ height: 300, overflow: 'hidden', position: 'relative' }}>
              <img src={selectedProduct.image} alt={selectedProduct.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,10,7,0.8), transparent 50%)' }} />
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'rgba(13,10,7,0.8)', backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border)', color: 'var(--cream)',
                  width: 36, height: 36, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s', zIndex: 10, cursor: 'pointer'
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div style={{ padding: 28 }}>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={13} style={{ fill: 'var(--gold)', color: 'var(--gold)' }} />)}
                <span style={{ color: 'var(--muted)', fontSize: '0.75rem', marginLeft: 6 }}>4.9 (2.4k reviews)</span>
              </div>
              <h2 className="serif" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--cream)', marginBottom: 10 }}>
                {selectedProduct.title}
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 20 }}>
                Prepared fresh with premium, locally-sourced ingredients for an experience that lingers.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="price-number" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--gold)', fontFamily: "'DM Sans', sans-serif" }}>₹{selectedProduct.price}</span>
                <span style={{ color: 'var(--muted)', textDecoration: 'line-through', fontSize: '1rem' }}>₹{Math.round(selectedProduct.price * 1.3)}</span>
                <span style={{ background: 'rgba(46,213,115,0.12)', color: '#2ed573', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: 100, letterSpacing: '0.08em' }}>30% OFF</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  className="add-btn"
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                >
                  <span>Add to Cart</span>
                </button>
                <button
                  className="outline-btn"
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO MODAL */}
      {videoOpen && (
        <div
          className="popup-overlay fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{ background: 'rgba(13,10,7,0.95)', backdropFilter: 'blur(12px)' }}
          onClick={() => setVideoOpen(false)}
        >
          <div className="popup-modal text-center" style={{ background: 'var(--surface)', padding: '40px', borderRadius: 28, border: '1px solid var(--border)' }}>
            <button
              onClick={() => setVideoOpen(false)}
              style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '20px' }}
            >
              ✕ Close
            </button>
            <div style={{ width: '100%', maxWidth: '800px' }}>
              <div style={{ background: '#000', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
                <p>Video player integration would appear here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;