import React, { useState, useEffect, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, handleKeyDown]);

  return (
    <>
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <header className="navbar-header">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo hover-scale">
            <span className="logo-text">Intern<span className="logo-accent">Pulse</span></span>
            <span className="logo-caption">PRECISION INTERNSHIP INDEX</span>
          </Link>
          
          <nav className="navbar-links" aria-label="Main navigation">
            <NavLink 
              to="/browse" 
              className={({ isActive }) => isActive ? "nav-link nav-active" : "nav-link"}
            >
              Browse
            </NavLink>
            <NavLink 
              to="/compare" 
              className={({ isActive }) => isActive ? "nav-link nav-active" : "nav-link"}
            >
              Compare
            </NavLink>
            <NavLink 
              to="/analytics" 
              className={({ isActive }) => isActive ? "nav-link nav-active" : "nav-link"}
            >
              Salaries
            </NavLink>
          </nav>

          <div className="navbar-actions">
            <Link to="/submit-review" className="nav-cta-btn click-squish ripple-effect">
              Write a Review
            </Link>
            
            <button className="nav-icon-btn" aria-label="Notifications">
              <Bell size={16} />
              <span className="notification-dot"></span>
            </button>
            
            <div className="nav-avatar-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" 
                alt="User avatar" 
                className="nav-avatar-img" 
              />
            </div>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-btn"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down panel */}
        <div className={`mobile-nav-panel ${mobileMenuOpen ? "mobile-nav-open" : ""}`}>
          <nav className="mobile-nav-links" aria-label="Mobile navigation">
            <NavLink to="/browse" className={({ isActive }) => isActive ? "mobile-link mobile-link-active" : "mobile-link"}>
              Browse
            </NavLink>
            <NavLink to="/compare" className={({ isActive }) => isActive ? "mobile-link mobile-link-active" : "mobile-link"}>
              Compare
            </NavLink>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? "mobile-link mobile-link-active" : "mobile-link"}>
              Salaries
            </NavLink>
            <Link to="/submit-review" className="mobile-cta-btn">
              Write a Review
            </Link>
          </nav>
        </div>

        <style>{`
          /* ── Skip link (accessibility) ── */
          .skip-to-content {
            position: absolute;
            top: -100%;
            left: 50%;
            transform: translateX(-50%);
            padding: 0.5rem 1.25rem;
            background: var(--accent);
            color: #fff;
            font-weight: 600;
            font-size: 0.85rem;
            border-radius: 0 0 var(--radius-sm) var(--radius-sm);
            z-index: 200;
            transition: top 0.2s ease;
          }
          .skip-to-content:focus {
            top: 0;
          }

          .navbar-header {
            background-color: rgba(8, 9, 10, 0.8);
            backdrop-filter: blur(16px) saturate(180%);
            -webkit-backdrop-filter: blur(16px) saturate(180%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            position: sticky;
            top: 0;
            z-index: 100;
            padding: 0 1.5rem;
            width: 100%;
            animation: slideInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .navbar-container {
            max-width: var(--max-width);
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 3.5rem;
          }

          .navbar-logo {
            display: flex;
            flex-direction: column;
            line-height: 1;
            gap: 0.2rem;
          }

          .logo-text {
            font-size: 1.25rem;
            font-weight: 800;
            letter-spacing: -0.04em;
            color: var(--text-primary);
          }

          .logo-accent {
            color: var(--accent);
          }

          .logo-caption {
            font-size: 0.5rem;
            font-weight: 600;
            letter-spacing: 0.14em;
            color: var(--text-muted);
          }

          .navbar-links {
            display: flex;
            align-items: center;
            gap: 2.5rem;
          }

          .nav-link {
            font-size: 0.8125rem;
            color: var(--text-muted);
            font-weight: 500;
            transition: color 0.25s ease, transform 0.2s ease;
            padding: 0.5rem 0;
            position: relative;
            display: inline-block;
          }

          .nav-link:hover {
            color: var(--text-primary);
          }

          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--accent), var(--cyan));
            transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            border-radius: var(--radius-full);
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .nav-active {
            color: var(--text-primary) !important;
            font-weight: 600;
          }

          .nav-active::after {
            width: 100% !important;
            bottom: -12px;
          }

          .navbar-actions {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }

          .nav-cta-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8125rem;
            font-weight: 600;
            height: 2.15rem;
            padding: 0 1.25rem;
            border-radius: var(--radius-sm);
            background: linear-gradient(135deg, var(--accent), var(--accent-hover));
            color: #ffffff;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
          }

          .nav-cta-btn:hover {
            background: linear-gradient(135deg, var(--accent-hover), var(--accent));
            box-shadow: var(--accent-glow);
            transform: translateY(-1.5px);
          }

          .nav-cta-btn:active {
            transform: scale(0.97);
          }

          .nav-icon-btn {
            position: relative;
            color: var(--text-muted);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border);
            transition: all 0.2s ease;
            background-color: transparent;
          }

          .nav-icon-btn:hover {
            color: var(--text-primary);
            border-color: var(--border-hover);
            background-color: rgba(255, 255, 255, 0.03);
          }

          .notification-dot {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 5px;
            height: 5px;
            background-color: var(--accent);
            border-radius: var(--radius-full);
            animation: pulseGlow 2s ease-in-out infinite;
          }

          .nav-avatar-wrapper {
            width: 2rem;
            height: 2rem;
            border-radius: var(--radius-sm);
            overflow: hidden;
            border: 1px solid var(--border);
            transition: border-color 0.2s ease;
          }

          .nav-avatar-wrapper:hover {
            border-color: var(--accent);
          }

          .nav-avatar-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* ── Mobile hamburger button ── */
          .mobile-menu-btn {
            display: none;
            align-items: center;
            justify-content: center;
            width: 2.25rem;
            height: 2.25rem;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border);
            color: var(--text-primary);
            background: transparent;
            transition: all 0.2s ease;
          }

          .mobile-menu-btn:hover {
            border-color: var(--border-hover);
            background-color: rgba(255, 255, 255, 0.03);
          }

          /* ── Mobile slide-down panel ── */
          .mobile-nav-panel {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                        opacity 0.25s ease;
            opacity: 0;
          }

          .mobile-nav-open {
            max-height: 320px;
            opacity: 1;
          }

          .mobile-nav-links {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            padding: 1rem 0;
            max-width: var(--max-width);
            margin: 0 auto;
          }

          .mobile-link {
            display: block;
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--text-secondary);
            border-radius: var(--radius-sm);
            transition: all 0.2s ease;
          }

          .mobile-link:hover {
            color: var(--text-primary);
            background-color: rgba(255, 255, 255, 0.04);
          }

          .mobile-link-active {
            color: var(--text-primary) !important;
            font-weight: 600;
            background-color: var(--accent-muted);
            border-left: 3px solid var(--accent);
          }

          .mobile-cta-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 0.5rem;
            padding: 0.75rem 1.25rem;
            font-size: 0.875rem;
            font-weight: 600;
            border-radius: var(--radius-sm);
            background: linear-gradient(135deg, var(--accent), var(--accent-hover));
            color: #fff;
            transition: all 0.25s ease;
          }

          .mobile-cta-btn:hover {
            box-shadow: var(--accent-glow);
          }

          /* ── Responsive breakpoint ── */
          @media (max-width: 768px) {
            .navbar-links {
              display: none;
            }
            .nav-cta-btn {
              display: none;
            }
            .mobile-menu-btn {
              display: flex;
            }
          }
        `}</style>
      </header>
    </>
  );
}
