import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-title">InternPulse</span>
          <span className="logo-caption">Precision Internship Index</span>
        </Link>
        
        <nav className="navbar-links">
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
          <Link to="/submit-review" className="btn btn-primary header-cta-btn btn-premium">
            Write a Review
          </Link>
          
          <button className="notification-btn" aria-label="Notifications">
            <Bell size={18} className="bell-icon" />
            <span className="notification-dot"></span>
          </button>
          
          <div className="profile-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" 
              alt="User avatar" 
              className="user-avatar" 
            />
          </div>
        </div>
      </div>
      
      <style>{`
        .navbar-header {
          background-color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--outline-variant);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 0.75rem 1.5rem;
          width: 100%;
        }

        .navbar-container {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 2.75rem;
        }

        .navbar-logo {
          color: var(--on-background);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1;
        }

              .logo-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: -0.04em;
          background: linear-gradient(135deg, #0f172a 0%, #378ADD 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .dark .logo-title {
          background: linear-gradient(135deg, #ffffff 0%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo-caption {
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--secondary);
          margin-top: 0.15rem;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .nav-link {
          font-size: 0.875rem;
          color: var(--secondary);
          font-weight: 500;
          transition: all 0.2s ease;
          padding: 0.5rem 0;
        }

        .nav-link:hover {
          color: var(--primary);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-cta-btn {
          font-size: 0.8125rem;
          height: 2.25rem;
          padding: 0 1rem;
          border-radius: var(--radius-sm);
        }

        .notification-btn {
          position: relative;
          color: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--outline-variant);
          transition: all 0.2s ease;
          background-color: var(--surface);
        }

        .notification-btn:hover {
          color: var(--primary);
          background-color: var(--surface-container-low);
          border-color: var(--primary);
        }

        .notification-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 6px;
          height: 6px;
          background-color: var(--primary);
          border-radius: var(--radius-full);
          border: 1.5px solid var(--surface);
        }

        .profile-wrapper {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--outline-variant);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .profile-wrapper:hover {
          border-color: var(--primary);
        }

        .user-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dark .navbar-header {
          background-color: rgba(5, 5, 5, 0.7);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
