import React, { useContext, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { 
  Star, DollarSign, Clock, CheckCircle2, ChevronRight, 
  Sparkles, Calendar, MapPin, Send, HelpCircle, Save, BarChart2 
} from "lucide-react";

export default function Profile() {
  const { id } = useParams();
  const { getCompanyById, companies } = useContext(StoreContext);

  // Retrieve company matching URL slug, fallback to Stripe if not found to prevent crashes
  const company = useMemo(() => {
    return getCompanyById(id) || getCompanyById("stripe") || companies[0];
  }, [id, getCompanyById, companies]);

  // Peer comparison calculations mapping peer IDs to real objects
  const peerCompanies = useMemo(() => {
    return (company.peers || ["stripe", "figma"])
      .map(peerId => companies.find(c => c.id === peerId))
      .filter(Boolean);
  }, [company, companies]);

  // Chart data formatting for monthly rating pulse
  const ratingPulseData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (company.monthlyRatingPulse || [4.0, 4.1, 4.2, 4.3, 4.2, 4.4, 4.5, 4.4, 4.5, 4.6, 4.7, 4.8])
      .map((val, idx) => ({
        month: months[idx],
        rating: val
      }));
  }, [company]);

  return (
    <div className="profile-layout-container">
      
      {/* COMPANY METRIC HEADER */}
      <section className="profile-hero-header">
        
        {/* Core details */}
        <div className="profile-identity-block">
          <div 
            className="company-profile-logo-avatar"
            style={{ backgroundColor: `${company.logoColor}15` }}
          >
            <span className="profile-logo-letter" style={{ color: company.logoColor }}>
              {company.name.charAt(0)}
            </span>
          </div>

          <div className="profile-text-identity">
            <div className="identity-tags-row">
              <span className="badge badge-green">TOP RATED</span>
              <span className="badge badge-blue">{company.category.toUpperCase()}</span>
            </div>
            <h1 className="profile-company-name">{company.name}</h1>
            <p className="profile-site-link">
              Building the future of distributed real-time data processing and analytics.
            </p>
          </div>
        </div>

        {/* Pulse Rating widget */}
        <div className="overall-pulse-score-box">
          <div className="pulse-score-row">
            <span className="pulse-label">PULSE SCORE</span>
            <div className="pulse-score-value-block">
              <span className="score-num">{company.pulseScore.toFixed(1)}</span>
              <span className="score-denom">/5.0</span>
            </div>
          </div>
          
          <div className="stars-row">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star 
                key={s} 
                size={14} 
                className={s <= Math.round(company.pulseScore) ? "star-icon-filled" : "star-icon-empty"}
              />
            ))}
          </div>

          <Link to={`/submit-review?company=${company.id}`} className="write-review-hero-btn">
            Write a Review
          </Link>
        </div>

      </section>

      {/* QUICK ACTIONS */}
      <div className="quick-actions-strip">
        <button className="strip-action-btn">
          <Save size={16} /> Save Company
        </button>
        <button className="strip-action-btn">
          <BarChart2 size={16} /> Compare Stats
        </button>
      </div>

      {/* CORE STATS GRID */}
      <section className="core-stats-deck">
        <div className="deck-card">
          <div className="deck-card-header">
            <span className="deck-card-label">AVG STIPEND</span>
            <DollarSign size={16} className="deck-card-icon" />
          </div>
          <div className="deck-card-val">${company.stipend.toLocaleString()}<span className="val-mo">/mo</span></div>
          <span className="deck-card-context-badge text-green">{company.stipendTier}</span>
        </div>

        <div className="deck-card">
          <div className="deck-card-header">
            <span className="deck-card-label">AVG HOURS</span>
            <Clock size={16} className="deck-card-icon" />
          </div>
          <div className="deck-card-val">{company.hours} <span className="val-mo">hrs/wk</span></div>
          <span className="deck-card-context-badge text-amber">{company.hoursTier}</span>
        </div>

        <div className="deck-card">
          <div className="deck-card-header">
            <span className="deck-card-label">RETURN OFFER RATE</span>
            <CheckCircle2 size={16} className="deck-card-icon" />
          </div>
          <div className="deck-card-val">{company.returnOfferRate}%</div>
          <span className="deck-card-context-badge text-blue">{company.returnOfferTier}</span>
        </div>

        <div className="deck-card">
          <div className="deck-card-header">
            <span className="deck-card-label">SATISFACTION</span>
            <Star size={16} className="deck-card-icon" />
          </div>
          <div className="deck-card-val">{company.satisfaction.toFixed(1)}<span className="val-mo">/5</span></div>
          <span className="deck-card-context-badge text-muted">{company.satisfactionCount} Verified Interns</span>
        </div>
      </section>

      {/* MAIN CONTENT BLOCK */}
      <div className="profile-main-grid">
        
        {/* LEFT COLUMN: CULTURE & REVIEWS */}
        <div className="profile-details-column">
          
          {/* Culture Analysis Card */}
          <div className="details-card-block">
            <h3 className="details-card-title">Culture & Growth Analysis</h3>
            
            <div className="culture-stats-grid">
              
              <div className="culture-bar-row">
                <div className="culture-labels">
                  <span className="culture-name">Supportiveness</span>
                  <span className="culture-val">{company.supportiveness}%</span>
                </div>
                <div className="culture-track">
                  <div className="culture-fill bg-green-fill" style={{ width: `${company.supportiveness}%` }}></div>
                </div>
                <p className="culture-desc-text">Exceptional peer support and easy access to senior engineers.</p>
              </div>

              <div className="culture-bar-row">
                <div className="culture-labels">
                  <span className="culture-name">Autonomy</span>
                  <span className="culture-val">{company.autonomy}%</span>
                </div>
                <div className="culture-track">
                  <div className="culture-fill bg-blue-fill" style={{ width: `${company.autonomy}%` }}></div>
                </div>
                <p className="culture-desc-text">High ownership of projects; interns drive meaningful features.</p>
              </div>

              <div className="culture-bar-row">
                <div className="culture-labels">
                  <span className="culture-name">Learning Curve</span>
                  <span className="culture-val">{company.learningCurve}%</span>
                </div>
                <div className="culture-track">
                  <div className="culture-fill bg-green-fill" style={{ width: `${company.learningCurve}%` }}></div>
                </div>
                <p className="culture-desc-text">Steep but rewarding format mentorship programs are highly rated.</p>
              </div>

              <div className="culture-bar-row">
                <div className="culture-labels">
                  <span className="culture-name">Work-Life Balance</span>
                  <span className="culture-val">{company.workLifeBalance}%</span>
                </div>
                <div className="culture-track">
                  <div className="culture-fill bg-amber-fill" style={{ width: `${company.workLifeBalance}%` }}></div>
                </div>
                <p className="culture-desc-text">Fast-paced environment; occasional overtime during sprint cycles.</p>
              </div>

            </div>

            {/* Smart Insight Box */}
            <div className="smart-insight-callout">
              <Sparkles size={18} className="insight-sparkle-icon" />
              <div className="insight-content">
                <h4 className="insight-title">PULSE INSIGHT</h4>
                <p className="insight-text-body">{company.pulseInsight}</p>
              </div>
            </div>
          </div>

          {/* Intern Feedback Reviews List */}
          <div className="reviews-section-block">
            <div className="reviews-header-row">
              <h3 className="details-card-title">Intern Feedback</h3>
              <div className="reviews-sorting">
                <select className="reviews-sorting-dropdown">
                  <option>Most Recent</option>
                  <option>Highest Rating</option>
                </select>
              </div>
            </div>

            <div className="reviews-feed-list">
              {company.reviews.length > 0 ? (
                company.reviews.map((rev) => (
                  <div key={rev.id} className="review-feed-card">
                    
                    {/* Header */}
                    <div className="review-card-header">
                      <div className="reviewer-avatar">
                        {rev.role.split(" ")[0].charAt(0)}
                        {rev.role.split(" ")[1] ? rev.role.split(" ")[1].charAt(0) : ""}
                      </div>
                      
                      <div className="reviewer-metadata">
                        <div className="reviewer-role-row">
                          <h4 className="reviewer-role-title">{rev.role}</h4>
                          <span className="review-rating-label">
                            {rev.rating.toFixed(1)} 
                            <Star size={10} className="inline-star" />
                          </span>
                        </div>
                        <div className="reviewer-details-row">
                          <span className="review-term">{rev.term}</span>
                          <span className="divider-dot">•</span>
                          {rev.verified && (
                            <span className="verified-badge">
                              <CheckCircle2 size={12} /> Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pros and Cons */}
                    <div className="review-pros-cons-grid">
                      <div className="pros-block">
                        <span className="block-label pros-color-label">PROS</span>
                        <p className="block-body">{rev.pros}</p>
                      </div>
                      <div className="cons-block">
                        <span className="block-label cons-color-label">CONS</span>
                        <p className="block-body">{rev.cons}</p>
                      </div>
                    </div>

                    {/* Skill tags */}
                    <div className="review-skill-tags">
                      {rev.tags.map((tag) => (
                        <span key={tag} className="skill-badge-tag">{tag}</span>
                      ))}
                    </div>

                  </div>
                ))
              ) : (
                <div className="empty-reviews-box">
                  <HelpCircle size={32} className="empty-feedback-icon" />
                  <p>No feedback reports have been submitted for {company.name} yet.</p>
                  <Link to={`/submit-review?company=${company.id}`} className="btn btn-primary" style={{ marginTop: "1rem" }}>
                    Be the First to Review
                  </Link>
                </div>
              )}
            </div>

            {company.reviews.length > 0 && (
              <button className="load-more-reviews-btn">
                Load More Reviews
              </button>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: WIDGETS */}
        <div className="profile-widgets-column">
          
          {/* Hiring Status Widget */}
          <div className="widget-card bg-emerald-light-card">
            <div className="hiring-status-title-row">
              <span className="status-pulsing-indicator"></span>
              <span className="hiring-status-label">{company.hiringStatus}</span>
            </div>
            
            <div className="hiring-details">
              <div className="detail-item">
                <Calendar size={14} className="detail-icon" />
                <div>
                  <div className="detail-label">Application Deadline</div>
                  <div className="detail-val">{company.deadline}</div>
                </div>
              </div>

              <div className="detail-item">
                <MapPin size={14} className="detail-icon" />
                <div>
                  <div className="detail-label">Primary Locations</div>
                  <div className="detail-val">{company.locations.join(", ")}</div>
                </div>
              </div>
            </div>

            <a 
              href={company.website} 
              target="_blank" 
              rel="noreferrer" 
              className="apply-company-site-btn"
            >
              Apply on Company Site
            </a>
          </div>

          {/* Compare To Peers Widget */}
          <div className="widget-card">
            <h4 className="widget-card-title">Compare To</h4>
            
            <div className="peers-comparison-list">
              {peerCompanies.map((peer) => (
                <Link 
                  key={peer.id}
                  to={`/profile/${peer.id}`}
                  className="peer-compare-item"
                >
                  <div className="peer-details">
                    <span className="peer-name">{peer.name}</span>
                    <span className="peer-meta">{peer.pulseScore.toFixed(1)} &bull; {peer.category}</span>
                  </div>
                  <ChevronRight size={16} className="peer-arrow" />
                </Link>
              ))}
            </div>
          </div>

          {/* Rating Pulse Graph widget */}
          <div className="widget-card">
            <h4 className="widget-card-title">Rating Pulse (12mo)</h4>
            
            <div className="pulse-graph-box">
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={ratingPulseData}>
                  <XAxis 
                    dataKey="month" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: "var(--text-muted)", fontSize: 8, fontWeight: 700 }}
                  />
                  <YAxis hide domain={[3, 5]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--bg-secondary)", 
                      border: "1px solid var(--border-heavy)",
                      borderRadius: "var(--radius-sm)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 10
                    }}
                  />
                  <Bar 
                    dataKey="rating" 
                    fill="var(--brand-primary)" 
                    radius={[2, 2, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .profile-layout-container {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          width: 100%;
        }

        /* HERO HEADER */
        .profile-hero-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .profile-identity-block {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          flex: 1;
        }

        .company-profile-logo-avatar {
          width: 4.5rem;
          height: 4.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--shadow-sm);
        }

        .profile-logo-letter {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
        }

        .profile-text-identity {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .identity-tags-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .profile-company-name {
          font-size: 2.25rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1;
        }

        .profile-site-link {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        /* Pulse Rating Score Box */
        .overall-pulse-score-box {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          width: 18rem;
          align-items: center;
        }

        .pulse-score-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .pulse-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--brand-secondary);
        }

        .pulse-score-value-block {
          display: flex;
          align-items: flex-end;
          line-height: 1;
        }

        .score-num {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .score-denom {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 0.2rem;
          margin-left: 0.1rem;
        }

        .stars-row {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .star-icon-filled {
          color: #fbbf24;
          fill: #fbbf24;
        }

        .star-icon-empty {
          color: var(--border-heavy);
        }

        .write-review-hero-btn {
          width: 100%;
          background-color: var(--brand-primary);
          color: var(--text-white);
          font-size: 0.8rem;
          font-weight: 750;
          letter-spacing: 0.05em;
          padding: 0.6rem 0;
          border-radius: var(--radius-md);
          text-align: center;
          transition: background-color 0.2s ease;
        }

        .write-review-hero-btn:hover {
          background-color: var(--brand-secondary);
        }

        /* ACTIONS STRIP */
        .quick-actions-strip {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .strip-action-btn {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .strip-action-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-secondary);
        }

        /* STATS deck */
        .core-stats-deck {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          background-color: var(--bg-dark);
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-md);
          padding: 2.25rem 2rem;
          color: var(--text-white);
        }

        .deck-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .deck-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-muted);
        }

        .deck-card-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .deck-card-icon {
          color: var(--text-muted);
          opacity: 0.6;
        }

        .deck-card-val {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .val-mo {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-left: 0.2rem;
        }

        .deck-card-context-badge {
          font-size: 0.675rem;
          font-weight: 700;
        }

        .text-green { color: var(--brand-primary); }
        .text-amber { color: #fbbf24; }
        .text-blue { color: var(--brand-accent); }

        /* GRID MAIN */
        .profile-main-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 2rem;
        }

        .profile-details-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .details-card-block {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .details-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .culture-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .culture-bar-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .culture-labels {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .culture-name {
          color: var(--text-primary);
        }

        .culture-val {
          color: var(--brand-secondary);
        }

        .culture-track {
          width: 100%;
          height: 6px;
          background-color: var(--bg-primary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .culture-fill {
          height: 100%;
          border-radius: var(--radius-full);
        }

        .bg-green-fill { background-color: var(--brand-primary); }
        .bg-blue-fill { background-color: var(--brand-accent); }
        .bg-amber-fill { background-color: #fbbf24; }

        .culture-desc-text {
          font-size: 0.775rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Smart insight card */
        .smart-insight-callout {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-heavy);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .insight-sparkle-icon {
          color: var(--brand-secondary);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .insight-title {
          font-size: 0.725rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .insight-text-body {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* REVIEWS TIMELINE */
        .reviews-section-block {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 2rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .reviews-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .reviews-sorting-dropdown {
          border: none;
          background: none;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--brand-secondary);
          outline: none;
          cursor: pointer;
        }

        .reviews-feed-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .review-feed-card {
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .review-feed-card:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .review-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .reviewer-avatar {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-full);
          background-color: #e2e8f0;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reviewer-metadata {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .reviewer-role-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .reviewer-role-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .review-rating-label {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--brand-secondary);
          display: flex;
          align-items: center;
          gap: 0.15rem;
        }

        .inline-star {
          fill: var(--brand-primary);
          color: var(--brand-primary);
        }

        .reviewer-details-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.775rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .verified-badge {
          color: var(--brand-secondary);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 700;
        }

        .review-pros-cons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .block-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin-bottom: 0.35rem;
        }

        .pros-color-label { color: var(--brand-secondary); }
        .cons-color-label { color: #d97706; }

        .block-body {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .review-skill-tags {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .skill-badge-tag {
          font-size: 0.625rem;
          font-weight: 750;
          background-color: var(--bg-primary);
          color: var(--text-secondary);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .load-more-reviews-btn {
          width: 100%;
          border: 1px solid var(--border-heavy);
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 750;
          letter-spacing: 0.05em;
          padding: 0.75rem 0;
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .load-more-reviews-btn:hover {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          border-color: var(--text-primary);
        }

        /* RIGHT WIDGETS COLUMN */
        .profile-widgets-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .widget-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .bg-emerald-light-card {
          background-color: var(--brand-light-green);
          border-color: rgba(16, 185, 129, 0.15);
        }

        .hiring-status-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-pulsing-indicator {
          width: 6px;
          height: 6px;
          background-color: var(--brand-primary);
          border-radius: var(--radius-full);
          box-shadow: 0 0 6px var(--brand-primary);
        }

        .hiring-status-label {
          font-size: 0.75rem;
          font-weight: 750;
          color: var(--brand-secondary);
          letter-spacing: 0.05em;
        }

        .hiring-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .detail-icon {
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .detail-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .detail-val {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .apply-company-site-btn {
          width: 100%;
          background-color: var(--bg-dark);
          color: var(--text-white);
          font-size: 0.8rem;
          font-weight: 750;
          letter-spacing: 0.05em;
          padding: 0.75rem 0;
          border-radius: var(--radius-md);
          text-align: center;
          transition: background-color 0.2s ease;
        }

        .apply-company-site-btn:hover {
          background-color: var(--bg-dark-hover);
        }

        .widget-card-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
        }

        .peers-comparison-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .peer-compare-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.85rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .peer-compare-item:hover {
          border-color: var(--text-primary);
          background-color: var(--bg-primary);
        }

        .peer-details {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .peer-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .peer-meta {
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        .peer-arrow {
          color: var(--text-muted);
        }

        .pulse-graph-box {
          padding-top: 0.5rem;
        }

        @media (max-width: 900px) {
          .profile-main-grid {
            grid-template-columns: 1fr;
          }
          .core-stats-deck {
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
