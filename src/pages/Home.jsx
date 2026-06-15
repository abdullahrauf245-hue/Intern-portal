import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Star, Shield, Cpu, Compass, Users, ArrowRight } from "lucide-react";

/* ───────────────────────────────────────────────────────────
   ANIMATED COUNTER HOOK
   ─────────────────────────────────────────────────────────── */
function useCountUp(end, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let startTime = null;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView]);

  return [count, ref];
}

/* ───────────────────────────────────────────────────────────
   HOME PAGE
   ─────────────────────────────────────────────────────────── */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  /* ── Typewriter Placeholder Effect ── */
  const placeholders = [
    "Search by company (e.g., Google, Arbitsoft)...",
    "Search for roles (e.g., Quant Research, Frontend)...",
    "Search for locations (e.g., Remote, Islamabad)...",
    "Search for technologies (e.g., Python, React)..."
  ];
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [placeholderText, setPlaceholderText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentFullText = placeholders[placeholderIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setPlaceholderText(prev => prev.slice(0, -1));
      }, 20);
    } else {
      timer = setTimeout(() => {
        setPlaceholderText(currentFullText.slice(0, placeholderText.length + 1));
      }, 45);
    }

    if (!isDeleting && placeholderText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && placeholderText === "") {
      setIsDeleting(false);
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }

    return () => clearTimeout(timer);
  }, [placeholderText, isDeleting, placeholderIdx]);

  /* ── Real-time Chart Bars Simulation ── */
  const targetBarHeights = [35, 62, 85, 50, 73, 45, 92, 58];
  const [barHeights, setBarHeights] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setBarHeights(targetBarHeights);
    }, 300);

    const fluctuationInterval = setInterval(() => {
      setBarHeights(prevHeights => 
        prevHeights.map((h, i) => {
          const target = targetBarHeights[i];
          const delta = (Math.random() - 0.5) * 8; // +/- 4%
          const next = Math.max(15, Math.min(100, target + delta));
          return Math.round(next);
        })
      );
    }, 2000);

    return () => {
      clearTimeout(introTimer);
      clearInterval(fluctuationInterval);
    };
  }, []);

  /* ── 3D Tilt Effect ── */
  const handleMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 8;
    const tiltY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
  }, []);

  const handleMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  }, []);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Animated counters for hero card ── */
  const [stipendCount, stipendRef] = useCountUp(6400, 1800);
  const [offerCount, offerRef] = useCountUp(81, 1500);

  /* ── Stats section counters ── */
  const [accuracy, accuracyRef] = useCountUp(98, 1600);
  const [reports, reportsRef] = useCountUp(15, 1600);
  const [metrics, metricsRef] = useCountUp(240, 1800);
  const [trust, trustRef] = useCountUp(49, 1600);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(searchQuery.trim() ? `/browse?q=${encodeURIComponent(searchQuery)}` : "/browse");
  };

  return (
    <div className="home-root">

      {/* ═══ HERO ═══ */}
      <section className="hero">
        {/* BG effects */}
        <div className="hero-glow" aria-hidden="true"></div>
        <div className="hero-grid-pattern" aria-hidden="true"></div>

        <div className="hero-layout">
          {/* Left Column */}
          <div className="hero-content">
            <div className="hero-badge animate-fade-up" style={{ animationDelay: "0ms" }}>
              <span className="pulse-dot"></span>
              LIVE · 2,400+ FIRMS
            </div>

            <h1 className="hero-h1 animate-fade-up" style={{ animationDelay: "80ms" }}>
              Precision Analytics<br />
              for <span className="hero-h1-accent">Next-Gen</span> Careers
            </h1>

            <p className="hero-sub animate-fade-up" style={{ animationDelay: "160ms" }}>
              Transparent, data-driven insights into the world's leading internship programs. Make your next move with total confidence.
            </p>

            <div className="hero-btns animate-fade-up" style={{ animationDelay: "240ms" }}>
              <Link to="/browse" className="btn btn-primary hero-cta-primary">
                Explore Directory
              </Link>
              <Link to="/submit-review" className="btn btn-ghost hero-cta-ghost">
                Submit Review
              </Link>
            </div>

            <form onSubmit={handleSearchSubmit} className="hero-search animate-fade-up" style={{ animationDelay: "320ms" }}>
              <Search className="hero-search-icon" size={16} />
              <input
                type="text"
                placeholder={placeholderText}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="hero-search-input"
              />
              <button type="submit" className="hero-search-submit">SEARCH</button>
            </form>

            <div className="hero-trending animate-fade-up" style={{ animationDelay: "400ms" }}>
              <span className="trending-label">TRENDING</span>
              <Link to="/browse?q=Quant" className="trending-pill">Quant Research</Link>
              <Link to="/browse?q=Product" className="trending-pill">Product Design</Link>
              <Link to="/browse?q=AI" className="trending-pill">AI Ethics</Link>
            </div>
          </div>

          {/* Right Column — Floating Intelligence Card */}
          <div className="hero-visual animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="intel-card">
              <div className="intel-header">
                <span className="intel-eyebrow">MARKET INTELLIGENCE</span>
                <span className="intel-live-badge">
                  <span className="live-dot"></span>
                  LIVE
                </span>
              </div>

              <div className="intel-metrics" ref={stipendRef}>
                <div className="intel-metric">
                  <span className="intel-metric-value">${(stipendCount / 1000).toFixed(1)}k</span>
                  <span className="intel-metric-label">Median Stipend</span>
                </div>
                <div className="intel-metric" ref={offerRef}>
                  <span className="intel-metric-value">{offerCount}%</span>
                  <span className="intel-metric-label">Return Offers</span>
                </div>
              </div>

              <div className="intel-bars">
                {barHeights.map((height, idx) => (
                  <div
                    key={idx}
                    className={`intel-bar ${idx === 2 || idx === 6 ? 'intel-bar-accent' : ''}`}
                    style={{ 
                      height: `${height}%`,
                      transition: 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  ></div>
                ))}
              </div>

              <div className="intel-footer">
                <span>Updated 2 minutes ago</span>
              </div>
            </div>

            {/* Floating overlay badge */}
            <div className="floating-badge">
              <span className="floating-badge-arrow">↑</span>
              <span>12% this quarter</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CURATED INTELLIGENCE CARDS ═══ */}
      <section className="cards-section reveal-on-scroll">
        <div className="section-header">
          <div className="section-divider"></div>
          <h2 className="section-title">Curated Intelligence</h2>
          <p className="section-sub">High-fidelity segments from verified intern reports.</p>
        </div>

        <div className="cards-row">
          {[
            { icon: Star, title: "Highest Rated", desc: "Programs with 4.8+ ratings and exceptional workplace culture scores.", link: "/browse?filter=rating", color: "var(--accent)" },
            { icon: Shield, title: "Top Compensation", desc: "Verified stipends clearing upper-quartile benchmarks across sectors.", link: "/browse?filter=stipend", color: "var(--success)" },
            { icon: Cpu, title: "Remote-First", desc: "Fully distributed opportunities with global access and digital workflows.", link: "/browse?filter=remote", color: "var(--cyan)" },
          ].map((card, i) => (
            <Link
              key={i}
              to={card.link}
              className="intel-feature-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="feature-icon" style={{ color: card.color }}>
                <card.icon size={20} />
              </div>
              <h3 className="feature-title">{card.title}</h3>
              <p className="feature-desc">{card.desc}</p>
              <span className="feature-arrow"><ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="proof-section reveal-on-scroll">
        <div className="proof-bar">
          <span className="proof-label">TRUSTED BY LEADING INSTITUTIONS</span>
          <div className="proof-logos">
            {["Stanford", "MIT", "CMU", "INSEAD", "TUM"].map((name) => (
              <span key={name} className="proof-logo">{name}</span>
            ))}
          </div>
        </div>

        <div className="testimonials-row">
          {[
            { q: "InternPulse gave me the transparency I needed to verify stipend metrics. I signed with total confidence.", name: "Abdullah Rauf", role: "Software Engineer Intern", initials: "AR", grad: "linear-gradient(135deg, #3b82f6, #06b6d4)" },
            { q: "The conversion statistics and return-offer tracking helped me choose the right path for my return conversion.", name: "Baqer Hussain", role: "Product Design Intern", initials: "BH", grad: "linear-gradient(135deg, #10b981, #06b6d4)" },
            { q: "Outstanding platform interface. The analytics dashboards are clean, modern, and extremely data-rich.", name: "Sarah Lin", role: "Quant Research Intern", initials: "SL", grad: "linear-gradient(135deg, #8b5cf6, #3b82f6)" },
          ].map((t, i) => (
            <div
              key={i}
              className="testimonial-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className="testimonial-quote-mark">"</span>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="star-gold" />
                ))}
              </div>
              <p className="testimonial-text">{t.q}</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: t.grad }}>{t.initials}</div>
                <div className="author-info">
                  <span className="author-name">{t.name}</span>
                  <span className="author-role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DATA INTEGRITY / STATS ═══ */}
      <section className="stats-section reveal-on-scroll">
        <div className="stats-layout">
          <div className="stats-text-col">
            <div className="stats-accent-line"></div>
            <h2 className="stats-heading">Rigorous Data<br />Integrity</h2>
            <p className="stats-desc">
              Every submission is compiled and verified to maintain the highest quality index in the market.
            </p>

            <div className="stats-points">
              <div className="stats-point">
                <div className="stats-point-icon"><Compass size={16} /></div>
                <div>
                  <h4 className="stats-point-title">VERIFIED COMPENSATION</h4>
                  <p className="stats-point-desc">Direct verification of stipend logs and corporate pay details.</p>
                </div>
              </div>
              <div className="stats-point">
                <div className="stats-point-icon"><Users size={16} /></div>
                <div>
                  <h4 className="stats-point-title">CULTURE SIGNALS</h4>
                  <p className="stats-point-desc">Candid ratings on supportiveness, learning rates, and WLB.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-numbers-col">
            <div className="stats-grid">
              <div className="stat-card" ref={accuracyRef}>
                <span className="stat-big-num">{accuracy}%</span>
                <span className="stat-card-label">DATA ACCURACY</span>
                <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${accuracy}%` }}></div></div>
              </div>
              <div className="stat-card" ref={reportsRef}>
                <span className="stat-big-num">{reports}k+</span>
                <span className="stat-card-label">REPORTS ANNUALLY</span>
                <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '75%' }}></div></div>
              </div>
              <div className="stat-card" ref={metricsRef}>
                <span className="stat-big-num">{metrics}</span>
                <span className="stat-card-label">METRICS TRACKED</span>
                <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '60%' }}></div></div>
              </div>
              <div className="stat-card" ref={trustRef}>
                <span className="stat-big-num">{(trust / 10).toFixed(1)}/5</span>
                <span className="stat-card-label">USER TRUST SCORE</span>
                <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '98%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STYLES ═══ */}
      <style>{`
        .home-root {
          display: flex;
          flex-direction: column;
          gap: 8rem;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          padding: 3rem 0 4rem;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: -40%;
          left: -10%;
          width: 60%;
          height: 120%;
          background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPulse 8s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .hero-layout {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.3rem 0.8rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          width: fit-content;
          background-color: rgba(255, 255, 255, 0.02);
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--success);
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .hero-h1 {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.035em;
          color: var(--text-primary);
        }

        .hero-h1-accent {
          background: linear-gradient(135deg, var(--accent), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 480px;
        }

        .hero-btns {
          display: flex;
          gap: 0.75rem;
        }

        .hero-cta-primary {
          height: 2.75rem;
          padding: 0 1.5rem;
          font-weight: 600;
        }

        .hero-cta-ghost {
          height: 2.75rem;
          padding: 0 1.5rem;
          font-weight: 500;
        }

        /* Search */
        .hero-search {
          display: flex;
          align-items: center;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          height: 2.75rem;
          max-width: 480px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .hero-search:focus-within {
          border-color: var(--accent);
          box-shadow: var(--accent-glow-sm);
        }

        .hero-search-icon {
          margin-left: 1rem;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .hero-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 0 0.75rem;
          color: var(--text-primary);
          font-size: 0.85rem;
        }

        .hero-search-input::placeholder {
          color: var(--text-muted);
        }

        .hero-search-submit {
          height: 100%;
          padding: 0 1.25rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-primary);
          background-color: rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease;
          border-left: 1px solid var(--border);
        }

        .hero-search-submit:hover {
          background-color: var(--accent);
          color: #ffffff;
        }

        /* Trending */
        .hero-trending {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .trending-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .trending-pill {
          font-size: 0.7rem;
          font-weight: 500;
          padding: 0.25rem 0.65rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          transition: all 0.2s ease;
          background: transparent;
        }

        .trending-pill:hover {
          border-color: var(--accent);
          color: var(--accent);
          box-shadow: var(--accent-glow-sm);
        }

        /* ── Intel Card (right side) ── */
        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .intel-card {
          background: rgba(17, 19, 24, 0.85);
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 2rem;
          width: 100%;
          max-width: 380px;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);
          transform: rotate(-2deg);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          animation: subtleFloat 6s ease-in-out infinite;
        }

        .intel-card:hover {
          transform: rotate(0deg);
        }

        .intel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .intel-eyebrow {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .intel-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--cyan);
          padding: 0.2rem 0.5rem;
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: var(--radius-full);
          background: var(--cyan-muted);
        }

        .live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--cyan);
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .intel-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .intel-metric {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .intel-metric-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .intel-metric-label {
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .intel-bars {
          height: 3.5rem;
          display: flex;
          align-items: flex-end;
          gap: 0.35rem;
        }

        .intel-bar {
          flex: 1;
          background-color: rgba(255, 255, 255, 0.06);
          border-radius: 2px 2px 0 0;
          transition: background-color 0.3s ease;
        }

        .intel-bar-accent {
          background-color: var(--accent) !important;
          opacity: 0.8;
        }

        .intel-footer {
          font-size: 0.65rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          padding-top: 0.75rem;
        }

        .floating-badge {
          position: absolute;
          bottom: -10px;
          right: -10px;
          background: var(--bg-surface);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-md);
          padding: 0.5rem 0.85rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--success);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          animation: subtleFloat 5s ease-in-out infinite;
          animation-delay: 1s;
        }

        .floating-badge-arrow {
          font-size: 0.9rem;
        }

        /* ── CARDS SECTION ── */
        .cards-section {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .section-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .section-divider {
          width: 40px;
          height: 2px;
          background: var(--accent);
          border-radius: 1px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .section-sub {
          font-size: 1rem;
          color: var(--text-secondary);
          max-width: 420px;
        }

        .cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .intel-feature-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .intel-feature-card:hover {
          border-color: var(--border-accent);
          box-shadow: var(--shadow-card-hover);
        }

        .intel-feature-card:hover .feature-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .feature-icon {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .feature-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .feature-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .feature-arrow {
          color: var(--accent);
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
          margin-top: auto;
        }

        /* ── SOCIAL PROOF ── */
        .proof-section {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .proof-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .proof-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-muted);
        }

        .proof-logos {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3.5rem;
          flex-wrap: wrap;
        }

        .proof-logo {
          font-size: 1.1rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.12);
          letter-spacing: -0.02em;
          transition: color 0.3s ease;
        }

        .proof-logo:hover {
          color: rgba(255, 255, 255, 0.3);
        }

        .testimonials-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .testimonial-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          transform-style: preserve-3d;
        }

        .testimonial-card:hover {
          border-color: var(--border-accent);
          box-shadow: var(--shadow-card-hover);
        }

        .testimonial-quote-mark {
          position: absolute;
          top: 12px;
          right: 20px;
          font-size: 5rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          line-height: 1;
          pointer-events: none;
        }

        .testimonial-stars {
          display: flex;
          gap: 0.2rem;
        }

        .star-gold {
          fill: #fbbf24;
          color: #fbbf24;
        }

        .testimonial-text {
          font-size: 0.9rem;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.65;
          flex: 1;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border);
        }

        .author-avatar {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.75rem;
          color: #fff;
          flex-shrink: 0;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .author-role {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        /* ── STATS SECTION ── */
        .stats-section {
          padding: 4rem 0;
        }

        .stats-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        .stats-text-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stats-accent-line {
          width: 4px;
          height: 3rem;
          background: linear-gradient(180deg, var(--accent), transparent);
          border-radius: 2px;
        }

        .stats-heading {
          font-size: 2.5rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .stats-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 380px;
        }

        .stats-points {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }

        .stats-point {
          display: flex;
          gap: 0.75rem;
        }

        .stats-point-icon {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-sm);
          background: var(--accent-muted);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stats-point-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .stats-point-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .stats-numbers-col {
          display: flex;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          width: 100%;
        }

        .stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: border-color 0.3s ease;
        }

        .stat-card:hover {
          border-color: var(--border-accent);
        }

        .stat-big-num {
          font-size: 2.5rem;
          font-weight: 900;
          color: var(--accent);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .stat-card-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .stat-bar {
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          margin-top: 0.5rem;
          overflow: hidden;
        }

        .stat-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent), var(--cyan));
          border-radius: 2px;
          transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-visual {
            justify-content: flex-start;
          }
          .intel-card {
            transform: rotate(0deg);
            max-width: 100%;
          }
          .cards-row {
            grid-template-columns: 1fr;
          }
          .testimonials-row {
            grid-template-columns: 1fr;
          }
          .stats-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
