import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-title">InternPulse</span>
          <span className="logo-caption">Internship Index</span>
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
          <NavLink 
            to="/resources" 
            className={({ isActive }) => isActive ? "nav-link nav-active" : "nav-link"}
          >
            Resources
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <button className="notification-btn" aria-label="Notifications">
            <Bell size={20} className="bell-icon" />
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
          background-color: var(--bg-secondary);
          border-bottom: 2px solid var(--text-primary);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 1.25rem 1.5rem;
          width: 100%;
        }

        .navbar-container {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 2.5rem;
        }

        .navbar-logo {
          font-family: var(--font-display);
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.1;
        }

        .logo-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          letter-spacing: -0.02em;
        }

        .logo-caption {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }

        .nav-link {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 0.2s ease, border-color 0.2s ease;
          padding: 0.35rem 0;
          border-bottom: 2px solid transparent;
        }

        .nav-link:hover {
          color: var(--text-primary);
          border-bottom-color: var(--text-primary);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .notification-btn {
          position: relative;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.25rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--text-primary);
          transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
        }

        .notification-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-primary);
          transform: translate(-2px, -2px);
        }

        .notification-dot {
          position: absolute;
          top: 3px;
          right: 4px;
          width: 6px;
          height: 6px;
          background-color: var(--brand-accent);
          border-radius: var(--radius-full);
        }

        .profile-wrapper {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none; /* simple responsive handling */
          }
        }
      `}</style>
    </header>
  );
}
