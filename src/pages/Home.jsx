import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Star, Shield, Cpu, Compass, Users } from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?q=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/browse");
    }
  };

  return (
    <div className="home-page-container">
      
      {/* 🎨 HERO SECTION */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-stamp">
              <span className="stamp-dot"></span>
              LIVE REPORTS FROM 2,400+ FIRMS
            </div>
            
            <h1 className="hero-headline">
              Precision Analytics for Modern Careers
            </h1>
            
            <p className="hero-subheadline">
              Discover verified compensation, culture indicators, and conversion rates from internships.
            </p>

            <div className="hero-ctas">
              <Link to="/browse" className="btn btn-primary hero-btn-main">
                Explore Directory
              </Link>
              <Link to="/submit-review" className="btn btn-outline hero-btn-sub">
                Submit Review
              </Link>
            </div>

            <form onSubmit={handleSearchSubmit} className="search-form-wrapper">
              <div className="search-input-box">
                <Search className="search-input-icon" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by company, role, or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="hero-search-input"
                />
              </div>
              <button type="submit" className="hero-search-btn">
                SEARCH DATA
              </button>
            </form>

            <div className="trending-queries-bar">
              <span className="trending-label">TRENDING</span>
              <Link to="/browse?q=Quant" className="trend-tag">Quant Research</Link>
              <Link to="/browse?q=Product" className="trend-tag">Product Design</Link>
              <Link to="/browse?q=AI" className="trend-tag">AI Ethics</Link>
            </div>
          </div>

          <div className="hero-right">
            {/* Browser Frame Mockup */}
            <div className="browser-mockup">
              <div className="browser-header">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
                <span className="browser-address">internpulse.com/index-brief</span>
              </div>
              <div className="browser-body">
                <div className="brief-title">Market Intelligence Brief</div>
                <div className="brief-metric-row">
                  <div className="brief-metric">
                    <span className="metric-num">$6.4k</span>
                    <span className="metric-label">Median Stipend</span>
                  </div>
                  <div className="brief-metric">
                    <span className="metric-num">81%</span>
                    <span className="metric-label">Return Offers</span>
                  </div>
                </div>
                <div className="brief-chart-placeholder">
                  <div className="bar bar-1"></div>
                  <div className="bar bar-2"></div>
                  <div className="bar bar-3"></div>
                  <div className="bar bar-4"></div>
                  <div className="bar bar-5"></div>
                </div>
                <div className="brief-footer">
                  <span className="indicator-live"></span> Live Pulse: Updated 2 mins ago
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🃏 FEATURE / CURATED CARDS */}
      <section className="curated-sectors-section">
        <div className="section-intro">
          <h2 className="section-title">Curated Internship Intelligence</h2>
          <p className="section-subtitle">Curated segments based on high-fidelity user reports.</p>
        </div>

        <div className="cards-grid">
          {/* Card 1: Top Rated */}
          <Link to="/browse?filter=rating" className="feature-card">
            <div className="card-icon-container icon-soft-blue">
              <Star size={20} className="icon-blue" />
            </div>
            <h3 className="card-title">Highest Rated Internships</h3>
            <p className="card-desc">
              Programs with 4.8+ ratings and exceptional workplace culture feedback.
            </p>
          </Link>

          {/* Card 2: High Stipends */}
          <Link to="/browse?filter=stipend" className="feature-card">
            <div className="card-icon-container icon-soft-teal">
              <Shield size={20} className="icon-teal" />
            </div>
            <h3 className="card-title">Top Compensation Packages</h3>
            <p className="card-desc">
              Verified monthly stipends clearing the upper quartile across major sectors.
            </p>
          </Link>

          {/* Card 3: Remote Friendly */}
          <Link to="/browse?filter=remote" className="feature-card">
            <div className="card-icon-container icon-soft-purple">
              <Cpu size={20} className="icon-purple" />
            </div>
            <h3 className="card-title">Remote Digital Careers</h3>
            <p className="card-desc">
              Opportunities offering full flexibility, digital workflows, and global access.
            </p>
          </Link>
        </div>
      </section>

      {/* ⭐ TESTIMONIALS SECTION */}
      <section className="testimonials-section">
        <div className="trusted-strip">
          <h3 className="trusted-heading">Trusted by 500+ companies</h3>
          <div className="partners-logo-strip">
            <span className="partner-logo">Stanford</span>
            <span className="partner-logo">MIT</span>
            <span className="partner-logo">CMU</span>
            <span className="partner-logo">INSEAD</span>
            <span className="partner-logo">TUM</span>
          </div>
        </div>

        <div className="testimonials-grid">
          {/* Testimonial 1 */}
          <div className="testimonial-card">
            <div className="stars-row">
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
            </div>
            <p className="testimonial-quote">
              "InternPulse gave me the transparency I needed to verify stipend metrics. I signed with total confidence."
            </p>
            <div className="testimonial-user">
              <div className="user-avatar-circle circle-blue">AR</div>
              <div className="user-info">
                <span className="user-name">Abdullah Rauf</span>
                <span className="user-title">Software Engineer Intern</span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card">
            <div className="stars-row">
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
            </div>
            <p className="testimonial-quote">
              "The conversion statistics and return-offer tracking helped me choose the right path for my return conversion."
            </p>
            <div className="testimonial-user">
              <div className="user-avatar-circle circle-teal">BH</div>
              <div className="user-info">
                <span className="user-name">Baqer Hussain</span>
                <span className="user-title">Product Design Intern</span>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-card">
            <div className="stars-row">
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
              <Star size={14} className="star-filled" />
            </div>
            <p className="testimonial-quote">
              "Outstanding platform interface. The analytics dashboards are clean, modern, and extremely data-rich."
            </p>
            <div className="testimonial-user">
              <div className="user-avatar-circle circle-purple">SL</div>
              <div className="user-info">
                <span className="user-name">Sarah Lin</span>
                <span className="user-title">Quant Research Intern</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY & DATA ACCURACY */}
      <section className="methodology-section">
        <div className="methodology-container">
          <div className="methodology-text-column">
            <h2 className="methodology-title">Rigorous Data Integrity</h2>
            <p className="methodology-desc">
              We compile and verify every data submission to maintain the highest quality index in the market.
            </p>
            
            <div className="methodology-points">
              <div className="methodology-point">
                <div className="point-icon-wrapper">
                  <Compass size={18} />
                </div>
                <div>
                  <h4 className="point-title">VERIFIED COMP</h4>
                  <p className="point-desc">Direct verification of stipend logs and corporate pay details.</p>
                </div>
              </div>

              <div className="methodology-point">
                <div className="point-icon-wrapper">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="point-title">CULTURE SIGNALS</h4>
                  <p className="point-desc">Candid ratings on supportiveness, learning rates, and WLB.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-dashboard-column">
            <div className="stats-cards-wrapper">
              <div className="stats-grid-card">
                <div className="stat-value text-blue">98%</div>
                <div className="stat-label">DATA ACCURACY</div>
              </div>
              
              <div className="stats-grid-card">
                <div className="stat-value text-blue">15k+</div>
                <div className="stat-label">REPORTS ANNUALLY</div>
              </div>

              <div className="stats-grid-card">
                <div className="stat-value text-blue">240</div>
                <div className="stat-label">METRICS TRACKED</div>
              </div>

              <div className="stats-grid-card">
                <div className="stat-value text-blue">4.9/5</div>
                <div className="stat-label">USER TRUST SCORE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .home-page-container {
          display: flex;
          flex-direction: column;
          gap: 6rem;
          background-color: var(--background);
        }

        /* HERO SECTION */
        .hero-section {
          padding: 2rem 0;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-stamp {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--secondary);
          border-radius: var(--radius-full);
          width: fit-content;
          box-shadow: var(--card-shadow);
        }

        .stamp-dot {
          width: 6px;
          height: 6px;
          border-radius: var(--radius-full);
          background-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(55, 138, 221, 0.2);
        }

        .hero-headline {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--on-background);
        }

        .hero-subheadline {
          font-size: 1.125rem;
          color: var(--on-surface-variant);
          line-height: 1.6;
          max-width: 34rem;
        }

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .hero-btn-main {
          height: 2.75rem;
          padding: 0 1.75rem;
          border-radius: var(--radius-sm);
        }

        .hero-btn-sub {
          height: 2.75rem;
          padding: 0 1.75rem;
          border-radius: var(--radius-sm);
        }

        .search-form-wrapper {
          display: flex;
          align-items: center;
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-sm);
          overflow: hidden;
          width: 100%;
          max-width: 36rem;
          height: 3rem;
          transition: all 0.2s ease;
          box-shadow: var(--card-shadow);
        }

        .search-form-wrapper:focus-within {
          border-color: var(--primary);
          box-shadow: var(--focus-ring);
        }

        .search-input-box {
          display: flex;
          align-items: center;
          flex: 1;
          padding: 0 1.25rem;
          gap: 0.75rem;
          height: 100%;
        }

        .search-input-icon {
          color: var(--secondary);
        }

        .hero-search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
          color: var(--on-background);
          background-color: transparent;
        }

        .hero-search-btn {
          background-color: var(--on-background);
          color: var(--surface);
          font-weight: 600;
          font-size: 0.8125rem;
          letter-spacing: 0.05em;
          padding: 0 1.5rem;
          height: 100%;
          transition: all 0.2s ease;
          border-radius: 0;
        }

        .hero-search-btn:hover {
          background-color: var(--primary);
        }

        .trending-queries-bar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          font-size: 0.75rem;
        }

        .trending-label {
          color: var(--secondary);
          font-weight: 600;
          margin-right: 0.25rem;
        }

        .trend-tag {
          color: var(--on-surface-variant);
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .trend-tag:hover {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-container);
        }

        /* Browser Mockup styling */
        .browser-mockup {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.06);
          aspect-ratio: 4/3;
          display: flex;
          flex-direction: column;
        }

        .browser-header {
          background-color: #f1f5f9;
          border-bottom: 1px solid var(--outline-variant);
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: var(--radius-full);
          display: inline-block;
        }
        .dot-red { background-color: #ef4444; }
        .dot-yellow { background-color: #f59e0b; }
        .dot-green { background-color: #10b981; }

        .browser-address {
          font-size: 0.7rem;
          color: var(--secondary);
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          padding: 0.15rem 2rem;
          border-radius: var(--radius-sm);
          margin-left: auto;
          margin-right: auto;
          font-family: var(--font-mono);
        }

        .browser-body {
          flex: 1;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: linear-gradient(180deg, #ffffff 0%, #eff6ff 100%);
        }

        .brief-title {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--on-background);
        }

        .brief-metric-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .brief-metric {
          background-color: rgba(255, 255, 255, 0.8);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-sm);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          backdrop-filter: blur(4px);
        }

        .metric-num {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: -0.02em;
        }

        .metric-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--secondary);
        }

        .brief-chart-placeholder {
          height: 4rem;
          display: flex;
          align-items: flex-end;
          gap: 0.5rem;
          padding: 0 0.5rem;
        }

        .bar {
          flex: 1;
          background-color: var(--primary);
          opacity: 0.15;
          border-top-left-radius: 2px;
          border-top-right-radius: 2px;
          transition: opacity 0.3s ease;
        }

        .bar-1 { height: 40%; }
        .bar-2 { height: 75%; }
        .bar-3 { height: 50%; opacity: 0.85; background-color: var(--primary); }
        .bar-4 { height: 90%; }
        .bar-5 { height: 65%; }

        .brief-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--secondary);
          margin-top: auto;
          border-top: 1px solid var(--outline-variant);
          padding-top: 0.75rem;
        }

        .indicator-live {
          width: 6px;
          height: 6px;
          background-color: var(--success);
          border-radius: var(--radius-full);
          display: inline-block;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        /* FEATURE / CURATED SECTORS */
        .curated-sectors-section {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .section-intro {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--on-background);
        }

        .section-subtitle {
          font-size: 1rem;
          color: var(--secondary);
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .feature-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--card-shadow);
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--card-shadow-hover);
          border-color: rgba(55, 138, 221, 0.2);
        }

        .card-icon-container {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.25rem;
        }

        .icon-soft-blue { background-color: rgba(55, 138, 221, 0.1); }
        .icon-soft-teal { background-color: rgba(16, 185, 129, 0.1); }
        .icon-soft-purple { background-color: rgba(139, 92, 246, 0.1); }

        .icon-blue { color: var(--primary); }
        .icon-teal { color: var(--success); }
        .icon-purple { color: #8b5cf6; }

        .card-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--on-background);
        }

        .card-desc {
          font-size: 0.9rem;
          color: var(--secondary);
          line-height: 1.5;
        }

        /* TESTIMONIALS & TRUST STRIP */
        .testimonials-section {
          background-color: #f8fafc;
          border-top: 1px solid var(--outline-variant);
          border-bottom: 1px solid var(--outline-variant);
          padding: 5rem 2rem;
          margin: 0 calc(-50vw + 50%);
          width: 100vw;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .trusted-strip {
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .trusted-heading {
          font-size: 0.8125rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--secondary);
        }

        .partners-logo-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4rem;
          flex-wrap: wrap;
        }

        .partner-logo {
          font-size: 1.15rem;
          font-weight: 700;
          color: #94a3b8;
          font-family: var(--font-display);
          letter-spacing: -0.02em;
        }

        .testimonials-grid {
          max-width: var(--max-width);
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .testimonial-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: var(--card-shadow);
        }

        .stars-row {
          display: flex;
          gap: 0.25rem;
        }

        .star-filled {
          fill: #fbbf24;
          color: #fbbf24;
        }

        .testimonial-quote {
          font-style: italic;
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--on-surface-variant);
          flex: 1;
        }

        .testimonial-user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .user-avatar-circle {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .circle-blue {
          background-color: rgba(55, 138, 221, 0.1);
          color: var(--primary);
        }
        .circle-teal {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--success);
        }
        .circle-purple {
          background-color: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--on-background);
        }

        .user-title {
          font-size: 0.75rem;
          color: var(--secondary);
        }

        /* METHODOLOGY & DATA GRID */
        .methodology-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .methodology-text-column {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .methodology-title {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--on-background);
        }

        .methodology-desc {
          font-size: 1rem;
          color: var(--on-surface-variant);
          line-height: 1.6;
        }

        .methodology-points {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .methodology-point {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .point-icon-wrapper {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: var(--radius-sm);
          background-color: var(--primary-container);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .point-title {
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--on-background);
          margin-bottom: 0.25rem;
        }

        .point-desc {
          font-size: 0.875rem;
          color: var(--secondary);
          line-height: 1.5;
        }

        .stats-dashboard-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stats-cards-wrapper {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          background-color: var(--surface);
          padding: 2.5rem;
          box-shadow: var(--card-shadow);
        }

        .stats-grid-card {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .browser-mockup {
            aspect-ratio: 16/10;
          }
          .cards-grid {
            grid-template-columns: 1fr;
          }
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          .methodology-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
