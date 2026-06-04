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
          background-color: var(--surface);
          border-bottom: 1px solid var(--outline-variant);
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 0.875rem 1.5rem;
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
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--primary);
          letter-spacing: -0.03em;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.1;
        }

        .logo-title {
          font-weight: 700;
          font-size: 1.3rem;
          letter-spacing: -0.03em;
        }

        .logo-caption {
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--secondary);
          margin-top: 0.1rem;
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          font-size: 0.8125rem;
          color: var(--secondary);
          font-weight: 500;
          transition: color 0.15s ease;
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

        .notification-btn {
          position: relative;
          color: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--outline-variant);
          transition: all 0.15s ease;
          background-color: var(--surface);
        }

        .notification-btn:hover {
          color: var(--primary);
          background-color: var(--surface-container-low);
          border-color: var(--outline);
        }

        .notification-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 5px;
          height: 5px;
          background-color: var(--tertiary);
          border-radius: var(--radius-full);
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
        }

        .user-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
