import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Star, DollarSign, Globe, Award, ShieldAlert, BarChart } from "lucide-react";

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
      
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-stamp">
              <span className="stamp-dot"></span>
              VERIFIED REPORTS FROM 2,400+ COMPANIES
            </div>
            
            <h1 className="hero-headline">
              The Internship Index for <span className="highlight-text">Modern Careers</span>
            </h1>
            
            <p className="hero-subheadline">
              Verified compensation, culture signals, and return-offer patterns. Built for students who want receipts, not slogans.
            </p>

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
                SEARCH INDEX
              </button>
            </form>

            <div className="trending-queries-bar">
              <span className="trending-label">POPULAR QUERIES</span>
              <Link to="/browse?q=Quant" className="trend-tag">Quant Research</Link>
              <Link to="/browse?q=Product" className="trend-tag">Product Design</Link>
              <Link to="/browse?q=AI" className="trend-tag">AI Ethics</Link>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-ledger-card">
              <div className="ledger-kicker">INDEX BRIEF</div>
              <div className="ledger-row">
                <span className="ledger-label">Median stipend</span>
                <span className="ledger-value">$6.4k/mo</span>
              </div>
              <div className="ledger-row">
                <span className="ledger-label">Return offer median</span>
                <span className="ledger-value">81%</span>
              </div>
              <div className="ledger-row">
                <span className="ledger-label">Reports per year</span>
                <span className="ledger-value">15k+</span>
              </div>
              <div className="ledger-footnote">Updated 2 minutes ago</div>
            </div>

            <div className="hero-cutout-card">
              <div className="cutout-title">Sector focus</div>
              <div className="cutout-tags">Tech, Finance, Design</div>
              <Link to="/browse" className="cutout-cta">Browse the directory</Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTELLIGENCE HUB */}
      <section className="intelligence-hub-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Curated Index</h2>
            <p className="section-subtitle">Editorial groupings based on verified intern reports.</p>
          </div>
          <Link to="/browse" className="view-sectors-link">
            VIEW ALL SECTORS <ArrowRight size={16} />
          </Link>
        </div>

        <div className="hub-cards-grid">
          {/* Card 1: Top Rated */}
          <Link to="/browse?filter=rating" className="hub-card">
            <div className="card-icon-box bg-blue">
              <Star size={20} className="icon-blue" />
            </div>
            <h3 className="card-title">Highest Rated</h3>
            <p className="card-desc">
              Programs with 4.8+ satisfaction scores from verified participants.
            </p>
            <div className="card-footer-visual">
              <div className="avatars-group">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=64&auto=format&fit=crop" alt="User 1" />
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=64&auto=format&fit=crop" alt="User 2" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=64&auto=format&fit=crop" alt="User 3" />
              </div>
              <span className="program-count-badge">+124 Programs</span>
            </div>
          </Link>

          {/* Card 2: High Stipend (Dark Theme Card) */}
          <Link to="/browse?filter=stipend" className="hub-card dark-hub-card">
            <div className="card-icon-box bg-emerald-dark">
              <DollarSign size={20} className="icon-emerald" />
            </div>
            <h3 className="card-title text-white">Top Compensation</h3>
            <p className="card-desc text-muted">
              Packages that clear the upper quartile across major sectors.
            </p>
            <div className="card-footer-visual">
              <span className="stipend-pill">AVG $9,500 / MO</span>
            </div>
          </Link>

          {/* Card 3: Remote Friendly */}
          <Link to="/browse?filter=remote" className="hub-card">
            <div className="card-icon-box bg-purple">
              <Globe size={20} className="icon-purple" />
            </div>
            <h3 className="card-title">Remote Ready</h3>
            <p className="card-desc">
              Global opportunities offering full flexibility and digital-first cultures.
            </p>
            <div className="card-footer-visual">
              <div className="remote-status-indicator">
                <Globe size={14} className="globe-inline-icon" /> Global Access
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* METHODOLOGY & TRUST STATS */}
      <section className="methodology-section">
        <div className="methodology-container">
          
          <div className="methodology-text-column">
            <h2 className="methodology-title">Methodology and Verification</h2>
            <p className="methodology-desc">
              We do not just aggregate listings. We verify, analyze, and benchmark every data point to keep the index precise and honest.
            </p>
            
            <div className="methodology-points">
              <div className="methodology-point">
                <div className="point-icon-wrapper">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="point-title">VERIFIED STIPENDS</h4>
                  <p className="point-desc">Direct pay-stub verification to ensure salary accuracy.</p>
                </div>
              </div>

              <div className="methodology-point">
                <div className="point-icon-wrapper">
                  <BarChart size={18} />
                </div>
                <div>
                  <h4 className="point-title">CULTURE SCORING</h4>
                  <p className="point-desc">Multi-dimensional assessment of mentorship and workload.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-dashboard-column">
            <div className="stats-cards-wrapper">
              <div className="stats-grid-card">
                <div className="stat-value">98%</div>
                <div className="stat-label">DATA ACCURACY</div>
              </div>
              
              <div className="stats-grid-card">
                <div className="stat-value">15k+</div>
                <div className="stat-label">REPORTS ANNUALLY</div>
              </div>

              <div className="stats-grid-card">
                <div className="stat-value">240</div>
                <div className="stat-label">METRICS TRACKED</div>
              </div>

              <div className="stats-grid-card">
                <div className="stat-value">4.9/5</div>
                <div className="stat-label">USER TRUST SCORE</div>
              </div>
            </div>

            {/* Floating indicator */}
            <div className="real-time-pulse-widget">
              <span className="live-pulse-ring"></span>
              <div className="pulse-widget-content">
                <div className="widget-label">Recent Update</div>
                <div className="widget-value">Updated 2 minutes ago</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PARTNERSHIP GRADES */}
      <section className="partnerships-section">
        <span className="partnership-intro">TRUSTED BY STUDENTS FROM</span>
        <div className="partnerships-logos-row">
          <span className="uni-logo">Stanford</span>
          <span className="uni-logo">MIT</span>
          <span className="uni-logo">Carnegie Mellon</span>
          <span className="uni-logo">INSEAD</span>
          <span className="uni-logo">TUM</span>
        </div>
      </section>

      <style>{`
        .home-page-container {
          display: flex;
          flex-direction: column;
          gap: 5.5rem;
          padding-top: 1.5rem;
        }

        /* HERO STYLING */
        .hero-section {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4.5rem 1rem 3.5rem 1rem;
          background: radial-gradient(circle at 80% 20%, #e6fbf4 0%, transparent 45%);
          position: relative;
        }

        .hero-content {
          max-width: 44rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .live-status-capsule {
          background-color: var(--brand-light-green);
          color: var(--brand-secondary);
          font-size: 0.725rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          background-color: var(--brand-primary);
          border-radius: var(--radius-full);
          animation: corePulse 1.8s infinite ease-in-out;
        }

        @keyframes corePulse {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        .hero-headline {
          font-size: 2.75rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .highlight-text {
          font-style: italic;
          font-family: var(--font-display);
          font-weight: 800;
          color: var(--text-primary);
        }

        .hero-subheadline {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 34rem;
        }

        .search-form-wrapper {
          display: flex;
          align-items: center;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-heavy);
          box-shadow: var(--shadow-md);
          border-radius: var(--radius-md);
          overflow: hidden;
          width: 100%;
          max-width: 38rem;
          height: 3.25rem;
          margin-bottom: 1.5rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .search-form-wrapper:focus-within {
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
        }

        .search-input-box {
          display: flex;
          align-items: center;
          flex: 1;
          padding: 0 1.25rem;
          height: 100%;
        }

        .search-input-icon {
          color: var(--text-muted);
          margin-right: 0.75rem;
        }

        .hero-search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        .hero-search-btn {
          background-color: var(--bg-dark);
          color: var(--text-white);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          padding: 0 1.75rem;
          height: 100%;
          border-radius: 0;
          transition: background-color 0.2s ease;
        }

        .hero-search-btn:hover {
          background-color: var(--bg-dark-hover);
        }

        .trending-queries-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.75rem;
        }

        .trending-label {
          color: var(--text-muted);
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .trend-tag {
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          background-color: var(--bg-secondary);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .trend-tag:hover {
          color: var(--text-primary);
          border-color: var(--text-primary);
        }

        /* INTELLIGENCE HUB */
        .intelligence-hub-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 0 1rem;
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .section-title {
          font-size: 1.65rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }

        .section-subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .view-sectors-link {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          letter-spacing: 0.05em;
        }

        .view-sectors-link:hover {
          color: var(--brand-secondary);
        }

        .hub-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .hub-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-md);
          padding: 2.25rem 1.75rem;
          display: flex;
          flex-direction: column;
          height: 15rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .hub-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .card-icon-box {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .bg-blue { background-color: var(--brand-light-blue); }
        .icon-blue { color: var(--brand-accent); }
        
        .bg-emerald-dark { background-color: rgba(16, 185, 129, 0.15); }
        .icon-emerald { color: var(--brand-primary); }

        .bg-purple { background-color: #f3e8ff; }
        .icon-purple { color: #a855f7; }

        .card-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: auto;
        }

        .card-footer-visual {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1rem;
        }

        .avatars-group {
          display: flex;
          align-items: center;
        }

        .avatars-group img {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: var(--radius-full);
          border: 2px solid var(--bg-secondary);
          margin-right: -0.4rem;
          object-fit: cover;
        }

        .program-count-badge {
          font-size: 0.7rem;
          font-weight: 700;
          background-color: var(--bg-primary);
          color: var(--text-secondary);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
        }

        /* Dark Hub Card accent */
        .dark-hub-card {
          background-color: var(--bg-dark);
          border-color: var(--border-dark);
        }

        .dark-hub-card:hover {
          background-color: var(--bg-dark-hover);
        }

        .stipend-pill {
          font-size: 0.725rem;
          font-weight: 700;
          background-color: rgba(16, 185, 129, 0.15);
          color: var(--brand-primary);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
        }

        .remote-status-indicator {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .globe-inline-icon {
          color: var(--text-muted);
        }

        /* METHODOLOGY */
        .methodology-section {
          padding: 0 1rem;
        }

        .methodology-container {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          padding: 3.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4.5rem;
          align-items: center;
        }

        .methodology-text-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .methodology-title {
          font-size: 1.85rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .methodology-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .methodology-points {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 0.5rem;
        }

        .methodology-point {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .point-icon-wrapper {
          width: 1.85rem;
          height: 1.85rem;
          border-radius: var(--radius-full);
          background-color: var(--brand-light-green);
          color: var(--brand-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .point-title {
          font-size: 0.75rem;
          font-weight: 750;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .point-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .stats-dashboard-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: relative;
        }

        .stats-cards-wrapper {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          background-color: var(--bg-primary);
          padding: 2rem;
        }

        .stats-grid-card {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-value {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .real-time-pulse-widget {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-heavy);
          box-shadow: var(--shadow-md);
          border-radius: var(--radius-md);
          padding: 0.75rem 1.25rem;
          align-self: flex-end;
          width: fit-content;
          position: absolute;
          bottom: -1.75rem;
          right: -1rem;
        }

        .live-pulse-ring {
          width: 8px;
          height: 8px;
          background-color: var(--brand-primary);
          border-radius: var(--radius-full);
          position: relative;
        }

        .live-pulse-ring::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 2px solid var(--brand-primary);
          border-radius: var(--radius-full);
          animation: pulseRing 1.5s infinite ease-out;
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.6);
            opacity: 1;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        .widget-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .widget-value {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        /* PARTNERSHIPS */
        .partnerships-section {
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 2rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .partnership-intro {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .partnerships-logos-row {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .uni-logo {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 600;
          font-style: italic;
          color: var(--text-muted);
        }

        @media (max-width: 900px) {
          .hub-cards-grid {
            grid-template-columns: 1fr;
          }
          .methodology-container {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 2rem;
          }
          .real-time-pulse-widget {
            position: static;
            align-self: flex-start;
            margin-top: 1rem;
          }
          .partnerships-section {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
          }
          .partnerships-logos-row {
            flex-wrap: wrap;
            gap: 1.5rem;
          }
        }

        /* Editorial + brutalist overrides */
        .hero-section {
          padding: 0 1rem;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2.5rem;
          background-color: var(--bg-secondary);
          border: 1px solid var(--text-primary);
          box-shadow: var(--shadow-lg);
          padding: 2.75rem;
          position: relative;
          overflow: hidden;
          animation: riseIn 0.6s ease both;
        }

        .hero-grid::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            135deg,
            rgba(11, 19, 43, 0.05) 0,
            rgba(11, 19, 43, 0.05) 1px,
            transparent 1px,
            transparent 10px
          );
          opacity: 0.5;
          pointer-events: none;
        }

        .hero-left,
        .hero-right {
          position: relative;
          z-index: 1;
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
          border: 1px solid var(--text-primary);
          background-color: var(--brand-light-green);
          padding: 0.35rem 0.7rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          width: fit-content;
        }

        .stamp-dot {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-full);
          background-color: var(--brand-accent);
          box-shadow: 0 0 0 4px rgba(27, 124, 90, 0.12);
        }

        .hero-headline {
          font-size: 3.15rem;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          max-width: 28rem;
        }

        .highlight-text {
          font-style: italic;
          color: var(--brand-primary);
        }

        .hero-subheadline {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 32rem;
          margin-bottom: 0;
        }

        .search-form-wrapper {
          display: flex;
          align-items: center;
          background-color: var(--bg-secondary);
          border: 2px solid var(--text-primary);
          box-shadow: var(--shadow-md);
          border-radius: var(--radius-sm);
          overflow: hidden;
          width: 100%;
          max-width: 36rem;
          height: 3.25rem;
          margin-bottom: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .search-form-wrapper:focus-within {
          transform: translate(-2px, -2px);
          box-shadow: var(--shadow-lg);
        }

        .search-input-box {
          display: flex;
          align-items: center;
          flex: 1;
          padding: 0 1rem;
          gap: 0.65rem;
          height: 100%;
        }

        .search-input-icon {
          color: var(--text-muted);
          margin-right: 0;
        }

        .hero-search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.95rem;
          color: var(--text-primary);
          background-color: transparent;
        }

        .hero-search-btn {
          background-color: var(--brand-primary);
          color: var(--text-white);
          font-weight: 700;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0 1.5rem;
          height: 100%;
          border-left: 2px solid var(--text-primary);
        }

        .hero-search-btn:hover {
          background-color: var(--brand-secondary);
        }

        .trending-queries-bar {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          font-size: 0.7rem;
        }

        .trending-label {
          color: var(--text-muted);
          font-weight: 700;
          letter-spacing: 0.12em;
          font-size: 0.65rem;
          text-transform: uppercase;
        }

        .trend-tag {
          color: var(--text-primary);
          border: 1px solid var(--text-primary);
          background-color: var(--bg-secondary);
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s ease;
        }

        .trend-tag:hover {
          background-color: var(--brand-primary);
          color: var(--text-white);
        }

        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-ledger-card {
          background-color: var(--bg-dark);
          color: var(--text-white);
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-sm);
          padding: 1.75rem;
          box-shadow: var(--shadow-lg);
        }

        .ledger-kicker {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(254, 252, 248, 0.65);
          margin-bottom: 0.75rem;
        }

        .ledger-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px dashed rgba(254, 252, 248, 0.2);
          padding: 0.75rem 0;
          font-size: 0.9rem;
        }

        .ledger-label {
          color: rgba(254, 252, 248, 0.65);
        }

        .ledger-value {
          font-weight: 700;
          color: var(--text-white);
        }

        .ledger-footnote {
          font-size: 0.7rem;
          color: rgba(254, 252, 248, 0.6);
          margin-top: 0.5rem;
        }

        .hero-cutout-card {
          background-color: var(--bg-secondary);
          border: 2px solid var(--text-primary);
          border-radius: var(--radius-sm);
          padding: 1.5rem;
          box-shadow: var(--shadow-md);
        }

        .cutout-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .cutout-tags {
          font-size: 1.1rem;
          font-family: var(--font-display);
          margin-top: 0.35rem;
        }

        .cutout-cta {
          margin-top: 0.75rem;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: inline-flex;
          border-bottom: 2px solid var(--text-primary);
        }

        .section-header {
          border-bottom: 2px solid var(--text-primary);
        }

        .view-sectors-link {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-bottom: 2px solid var(--text-primary);
          padding-bottom: 0.25rem;
        }

        .view-sectors-link:hover {
          color: var(--brand-primary);
          border-color: var(--brand-primary);
        }

        .hub-card {
          border: 1px solid var(--text-primary);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-md);
        }

        .hub-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: var(--shadow-lg);
        }

        .card-icon-box {
          border: 1px solid var(--text-primary);
        }

        .bg-blue { background-color: var(--brand-light-blue); }
        .icon-blue { color: var(--text-primary); }
        .bg-emerald-dark { background-color: rgba(27, 124, 90, 0.1); }
        .icon-emerald { color: var(--brand-accent); }
        .bg-purple { background-color: rgba(75, 15, 31, 0.12); }
        .icon-purple { color: var(--brand-primary); }

        .program-count-badge {
          border-radius: var(--radius-sm);
          border: 1px solid var(--text-primary);
        }

        .dark-hub-card {
          background-color: var(--bg-dark);
          border-color: var(--border-dark);
        }

        .stipend-pill {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background-color: rgba(254, 252, 248, 0.08);
          color: rgba(254, 252, 248, 0.8);
          padding: 0.35rem 0.7rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(254, 252, 248, 0.2);
        }

        .remote-status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border: 1px solid var(--text-primary);
          padding: 0.2rem 0.45rem;
          border-radius: var(--radius-sm);
          color: var(--text-primary);
        }

        .globe-inline-icon {
          color: var(--brand-primary);
        }

        .methodology-container {
          border: 1px solid var(--text-primary);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-md);
          background-color: var(--bg-secondary);
        }

        .methodology-text-column {
          background-color: var(--bg-secondary);
          border: 1px solid var(--text-primary);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
        }

        .methodology-point {
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .point-icon-wrapper {
          background-color: var(--brand-light-blue);
          color: var(--text-primary);
          border: 1px solid var(--text-primary);
        }

        .point-title {
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .stats-cards-wrapper {
          border: 1px solid var(--text-primary);
          border-radius: var(--radius-sm);
          background-color: var(--bg-primary);
        }

        .stat-label {
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .real-time-pulse-widget {
          border: 1px solid var(--text-primary);
          border-radius: var(--radius-sm);
        }

        .live-pulse-ring {
          background-color: var(--brand-accent);
          box-shadow: 0 0 0 6px rgba(27, 124, 90, 0.12);
        }

        .widget-label {
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .partnerships-section {
          border-top: 2px solid var(--text-primary);
          border-bottom: none;
          align-items: flex-start;
        }

        .partnership-intro {
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .partnerships-logos-row {
          gap: 1rem;
        }

        .uni-logo {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          border: 1px solid var(--text-primary);
          padding: 0.35rem 0.75rem;
          background-color: var(--bg-secondary);
        }

        @keyframes riseIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 980px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
