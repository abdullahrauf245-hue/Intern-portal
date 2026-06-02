import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          InternPulse
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
          border-bottom: 1px solid var(--border-color);
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
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }

        .nav-link {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 500;
          transition: color 0.2s ease;
          padding: 0.25rem 0;
        }

        .nav-link:hover {
          color: var(--text-primary);
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
          border-radius: var(--radius-full);
          transition: color 0.2s ease, background-color 0.2s ease;
        }

        .notification-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-primary);
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
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid var(--border-heavy);
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
