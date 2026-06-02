import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-branding-column">
          <Link to="/" className="footer-logo">
            InternPulse
          </Link>
          <p className="footer-summary">
            Providing high-stakes analytics and transparent data for the world's most ambitious internship seekers.
          </p>
          <div className="social-links-wrapper">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="links-group">
            <h4 className="group-title">Platform</h4>
            <ul className="group-list">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/analytics">Methodology</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>

          <div className="links-group">
            <h4 className="group-title">Community</h4>
            <ul className="group-list">
              <li><a href="https://discord.com" target="_blank" rel="noreferrer">Discord Server</a></li>
              <li><Link to="/submit-review">Submit Data</Link></li>
              <li><Link to="/ambassadors">Ambassadors</Link></li>
              <li><Link to="/newsletter">Newsletter</Link></li>
            </ul>
          </div>
        </div>

      </div>

      <div className="footer-copyright-bar">
        <div className="copyright-container">
          <span className="copyright-text">
            &copy; 2026 InternPulse Data Systems. All rights reserved.
          </span>
          <div className="system-status-indicators">
            <span className="status-label">SYSTEM STATUS: <span className="status-val">OPERATIONAL</span></span>
            <span className="divider"></span>
            <span className="refresh-label">DATA REFRESH: <span className="refresh-val">03.11.36</span></span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background-color: #f8fafc;
          border-top: 1px solid var(--border-color);
          padding: 4.5rem 1.5rem 2rem 1.5rem;
          width: 100%;
        }

        .footer-container {
          max-width: var(--max-width);
          margin: 0 auto 3.5rem auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 4rem;
        }

        .footer-branding-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-width: 20rem;
        }

        .footer-logo {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .footer-summary {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .social-links-wrapper {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .social-btn {
          width: 2rem;
          height: 2rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-heavy);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          background-color: var(--bg-secondary);
        }

        .social-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-primary);
          background-color: var(--bg-primary);
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .links-group {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .group-title {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-primary);
        }

        .group-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.85rem;
        }

        .group-list a {
          color: var(--text-secondary);
          transition: color 0.15s ease;
        }

        .group-list a:hover {
          color: var(--text-primary);
        }

        .footer-copyright-bar {
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          width: 100%;
        }

        .copyright-container {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .system-status-indicators {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-sans);
          font-weight: 500;
        }

        .status-val {
          color: var(--brand-secondary);
          font-weight: 700;
        }

        .refresh-val {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .divider {
          width: 1px;
          height: 10px;
          background-color: var(--border-heavy);
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          
          .copyright-container {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
