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
          gap: 4rem;
        }

        /* HERO STYLING */
        .hero-section {
          padding: 1.5rem 0;
          position: relative;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3rem;
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-lg);
          padding: 3rem;
          position: relative;
          overflow: hidden;
          background-image: radial-gradient(circle at 100% 0%, rgba(0, 142, 191, 0.03) 0%, transparent 45%);
          animation: riseIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: center;
        }

        .hero-stamp {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid var(--outline-variant);
          background-color: var(--surface-container-low);
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--secondary);
          border-radius: var(--radius-full);
          width: fit-content;
        }

        .stamp-dot {
          width: 6px;
          height: 6px;
          border-radius: var(--radius-full);
          background-color: var(--success);
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
        }

        .hero-headline {
          font-size: 3rem;
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--primary);
        }

        .highlight-text {
          font-style: normal;
          color: var(--tertiary);
        }

        .hero-subheadline {
          font-size: 1rem;
          color: var(--secondary);
          line-height: 1.6;
          max-width: 32rem;
        }

        .search-form-wrapper {
          display: flex;
          align-items: center;
          background-color: var(--surface);
          border: 1px solid var(--outline);
          border-radius: var(--radius-sm);
          overflow: hidden;
          width: 100%;
          max-width: 36rem;
          height: 2.75rem;
          transition: all 0.15s ease;
        }

        .search-form-wrapper:focus-within {
          border-color: var(--primary);
          box-shadow: var(--focus-ring);
        }

        .search-input-box {
          display: flex;
          align-items: center;
          flex: 1;
          padding: 0 1rem;
          gap: 0.5rem;
          height: 100%;
        }

        .search-input-icon {
          color: var(--secondary);
        }

        .hero-search-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.875rem;
          color: var(--primary);
          background-color: transparent;
        }

        .hero-search-btn {
          background-color: var(--primary);
          color: var(--on-primary);
          font-weight: 500;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          padding: 0 1.25rem;
          height: 100%;
          transition: all 0.15s ease;
          border-radius: 0;
        }

        .hero-search-btn:hover {
          background-color: #1f2937;
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
          font-weight: 500;
          margin-right: 0.25rem;
        }

        .trend-tag {
          color: var(--secondary);
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          padding: 0.25rem 0.625rem;
          border-radius: var(--radius-sm);
          font-weight: 500;
          transition: all 0.15s ease;
        }

        .trend-tag:hover {
          border-color: var(--outline);
          color: var(--primary);
          background-color: var(--surface-container-low);
        }

        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: center;
        }

        .hero-ledger-card {
          background-color: var(--primary);
          color: var(--on-primary);
          border-radius: var(--radius-md);
          padding: 1.5rem;
        }

        .ledger-kicker {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--on-primary-container);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .ledger-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.75rem 0;
          font-size: 0.875rem;
        }

        .ledger-label {
          color: rgba(255, 255, 255, 0.7);
        }

        .ledger-value {
          font-weight: 600;
        }

        .ledger-footnote {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 0.5rem;
        }

        .hero-cutout-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
        }

        .cutout-title {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cutout-tags {
          font-size: 1rem;
          font-weight: 500;
          color: var(--primary);
          margin-top: 0.25rem;
        }

        .cutout-cta {
          margin-top: 0.75rem;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-flex;
          color: var(--tertiary);
          align-items: center;
        }

        .cutout-cta:hover {
          text-decoration: underline;
        }

        /* INTELLIGENCE HUB */
        .intelligence-hub-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 0.75rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-size: 0.875rem;
          color: var(--secondary);
        }

        .view-sectors-link {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--tertiary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .view-sectors-link:hover {
          text-decoration: underline;
        }

        .hub-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .hub-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          height: 14rem;
          transition: all 0.15s ease;
        }

        .hub-card:hover {
          background-color: var(--surface-container-low);
          border-color: var(--outline);
        }

        .card-icon-box {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          border: 1px solid transparent;
        }

        .bg-blue {
          background-color: rgba(0, 142, 191, 0.08);
          border-color: rgba(0, 142, 191, 0.15);
        }
        .icon-blue { color: var(--tertiary); }
        
        .bg-emerald-dark {
          background-color: rgba(16, 185, 129, 0.08);
          border-color: rgba(16, 185, 129, 0.15);
        }
        .icon-emerald { color: var(--success); }

        .bg-purple {
          background-color: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.15);
        }
        .icon-purple { color: #8b5cf6; }

        .card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 0.375rem;
        }

        .card-desc {
          font-size: 0.875rem;
          color: var(--secondary);
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
          border: 2px solid var(--surface);
          margin-right: -0.4rem;
          object-fit: cover;
        }

        .program-count-badge {
          font-size: 0.75rem;
          font-weight: 500;
          background-color: var(--surface-container);
          color: var(--secondary);
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-sm);
        }

        /* Dark Hub Card override to fit theme */
        .dark-hub-card {
          background-color: var(--surface);
          border-color: var(--outline-variant);
        }
        
        .dark-hub-card .text-white {
          color: var(--primary) !important;
        }
        
        .dark-hub-card .text-muted {
          color: var(--secondary) !important;
        }

        .stipend-pill {
          font-size: 0.75rem;
          font-weight: 500;
          background-color: rgba(16, 185, 129, 0.08);
          color: var(--success);
          border: 1px solid rgba(16, 185, 129, 0.15);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .remote-status-indicator {
          font-size: 0.75rem;
          color: var(--secondary);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* METHODOLOGY */
        .methodology-section {
          padding: 0;
        }

        .methodology-container {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-lg);
          padding: 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .methodology-text-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .methodology-title {
          font-size: 1.75rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .methodology-desc {
          font-size: 0.9375rem;
          color: var(--secondary);
          line-height: 1.6;
        }

        .methodology-points {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .methodology-point {
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
        }

        .point-icon-wrapper {
          width: 1.75rem;
          height: 1.75rem;
          border-radius: var(--radius-sm);
          background-color: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .point-title {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--primary);
          margin-bottom: 0.25rem;
          text-transform: uppercase;
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
          position: relative;
        }

        .stats-cards-wrapper {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          background-color: var(--background);
          padding: 1.75rem;
        }

        .stats-grid-card {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 600;
          color: var(--primary);
          letter-spacing: -0.02em;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .real-time-pulse-widget {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-sm);
          padding: 0.625rem 1rem;
          align-self: flex-end;
          width: fit-content;
        }

        .live-pulse-ring {
          width: 6px;
          height: 6px;
          background-color: var(--success);
          border-radius: var(--radius-full);
          position: relative;
        }

        .live-pulse-ring::after {
          content: '';
          position: absolute;
          inset: -3px;
          border: 1.5px solid var(--success);
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
          font-weight: 500;
          color: var(--primary);
        }

        .widget-value {
          font-size: 0.75rem;
          color: var(--secondary);
        }

        /* PARTNERSHIPS */
        .partnerships-section {
          border-top: 1px solid var(--outline-variant);
          border-bottom: 1px solid var(--outline-variant);
          padding: 1.5rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .partnership-intro {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .partnerships-logos-row {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .uni-logo {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--secondary);
          border: 1px solid var(--outline-variant);
          padding: 0.25rem 0.625rem;
          border-radius: var(--radius-sm);
          background-color: var(--surface);
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

        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            padding: 2rem;
            gap: 2rem;
          }
          .hub-cards-grid {
            grid-template-columns: 1fr;
          }
          .methodology-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem;
          }
          .real-time-pulse-widget {
            align-self: flex-start;
          }
          .partnerships-section {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          .partnerships-logos-row {
            flex-wrap: wrap;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
