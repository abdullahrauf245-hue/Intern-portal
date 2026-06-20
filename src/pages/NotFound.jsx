import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

/**
 * NotFound — a polished 404 page that matches the dark-intelligence design
 * system. Shown when a user navigates to a non-existent route.
 */
export default function NotFound() {
  return (
    <section className="not-found-page">
      <div className="not-found-orbital" aria-hidden="true"></div>

      <div className="not-found-content animate-fade-up">
        <div className="not-found-icon-wrapper">
          <Compass size={32} className="not-found-icon animate-spin-slow" />
        </div>

        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-desc">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary click-squish ripple-effect">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link to="/browse" className="btn btn-ghost click-squish">
            Browse Directory
          </Link>
        </div>
      </div>

      <style>{`
        .not-found-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          position: relative;
          overflow: hidden;
        }

        .not-found-orbital {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          border: 1px solid rgba(59, 130, 246, 0.06);
          border-radius: 50%;
          animation: orbitalRotate 25s linear infinite;
          pointer-events: none;
        }

        .not-found-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .not-found-icon-wrapper {
          width: 4rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-full);
          background: var(--accent-muted);
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .not-found-code {
          font-size: 6rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1;
          background: linear-gradient(135deg, var(--accent), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .not-found-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .not-found-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 380px;
          line-height: 1.6;
        }

        .not-found-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        @media (max-width: 480px) {
          .not-found-code {
            font-size: 4rem;
          }
          .not-found-actions {
            flex-direction: column;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
