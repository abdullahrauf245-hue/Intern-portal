import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../utils/animations";

export default function Footer() {
  const [time, setTime] = useState("");
  useScrollReveal({ threshold: 0.05 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      const secs = String(now.getSeconds()).padStart(2, "0");
      setTime(`${hrs}.${mins}.${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer-section reveal-on-scroll">
      <div className="footer-container">
        
        <div className="footer-branding-column">
          <Link to="/" className="footer-logo">
            Intern<span className="footer-logo-accent">Pulse</span>
          </Link>
          <p className="footer-summary">
            Providing high-stakes analytics and transparent data for the world's most ambitious internship seekers.
          </p>
          <div className="social-links-wrapper">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-btn hover-scale click-squish" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn hover-scale click-squish" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
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
            <span className="status-label">STATUS: <span className="status-val">OPERATIONAL</span></span>
            <span className="divider"></span>
            <span className="refresh-label">REFRESH: <span className="refresh-val">{time || "03.11.36"}</span></span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background-color: var(--bg-surface);
          border-top: 1px solid var(--border);
          padding: 3.5rem 1.5rem 2rem 1.5rem;
          width: 100%;
          margin-top: auto;
        }

        .footer-container {
          max-width: var(--max-width);
          margin: 0 auto 2.5rem auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 4rem;
        }

        .footer-branding-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 24rem;
        }

        .footer-logo {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .footer-logo-accent {
          color: var(--accent);
        }

        .footer-summary {
          font-size: 0.8rem;
          color: var(--text-muted);
          line-height: 1.55;
        }

        .social-links-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .social-btn {
          width: 1.75rem;
          height: 1.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: all 0.2s ease;
          background: transparent;
        }

        .social-btn:hover {
          color: var(--accent);
          border-color: var(--border-accent);
        }

        .footer-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .links-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .group-title {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
        }

        .group-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          font-size: 0.8rem;
        }

        .group-list a {
          color: var(--text-muted);
          transition: color 0.2s ease;
        }

        .group-list a:hover {
          color: var(--text-primary);
        }

        .footer-copyright-bar {
          border-top: 1px solid var(--border);
          padding-top: 1.5rem;
          width: 100%;
        }

        .copyright-container {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .system-status-indicators {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 500;
          font-family: var(--font-mono);
          letter-spacing: 0.02em;
        }

        .status-val {
          color: var(--success);
          font-weight: 700;
        }

        .refresh-val {
          color: var(--cyan);
          font-weight: 700;
        }

        .divider {
          width: 1px;
          height: 10px;
          background-color: var(--border);
        }

        @media (max-width: 768px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2rem;
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
