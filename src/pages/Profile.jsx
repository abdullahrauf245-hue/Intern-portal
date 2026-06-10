import React, { useContext, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { 
  Star, DollarSign, Clock, CheckCircle2, ChevronRight, 
  Sparkles, Calendar, MapPin, Send, HelpCircle, Save, BarChart2 
} from "lucide-react";

const CompanyLogo = ({ company, className, letterClassName }) => {
  const [imgError, setImgError] = useState(false);
  
  if (company.name.toLowerCase().includes("seecs")) {
    return (
      <img 
        src="/src/assets/seecs_logo.png" 
        alt="SEECS Logo" 
        className={className} 
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }
  
  let logoUrl = null;
  if (company.website) {
    try {
      const url = new URL(company.website);
      const domain = url.hostname.replace("www.", "");
      logoUrl = `https://logo.clearbit.com/${domain}`;
    } catch (e) {}
  }
  
  if (logoUrl && !imgError) {
    return (
      <img 
        src={logoUrl} 
        alt={`${company.name} Logo`} 
        className={className}
        onError={() => setImgError(true)}
        style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px", backgroundColor: "#ffffff" }}
      />
    );
  }
  
  return (
    <span className={letterClassName} style={{ color: company.logoColor }}>
      {company.name.charAt(0)}
    </span>
  );
};

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
            style={{ 
              backgroundColor: company.name.toLowerCase().includes("seecs") ? "transparent" : `${company.logoColor}15`,
              overflow: "hidden" 
            }}
          >
            <CompanyLogo 
              company={company} 
              className="w-full h-full" 
              letterClassName="profile-logo-letter" 
            />
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
            Submit Review
          </Link>
        </div>

      </section>

      {/* QUICK ACTIONS */}
      <div className="quick-actions-strip">
        <button className="strip-action-btn">
          <Save size={16} /> Save Dossier
        </button>
        <button className="strip-action-btn">
          <BarChart2 size={16} /> Compare Signals
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
              <h3 className="details-card-title">Intern Reports</h3>
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
                    Be the First to Submit
                  </Link>
                </div>
              )}
            </div>

            {company.reviews.length > 0 && (
              <button className="load-more-reviews-btn">
                Load More Reports
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
            <h4 className="widget-card-title">12-Month Pulse</h4>
            
            <div className="pulse-graph-box">
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={ratingPulseData}>
                  <XAxis 
                    dataKey="month" 
                    tickLine={false} 
                    axisLine={false} 
                    tick={{ fill: "var(--secondary)", fontSize: 8, fontWeight: 700 }}
                  />
                  <YAxis hide domain={[3, 5]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--surface)", 
                      border: "1px solid var(--outline-variant)",
                      borderRadius: "var(--radius-sm)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 10,
                      boxShadow: "var(--card-shadow)"
                    }}
                  />
                  <Bar 
                    dataKey="rating" 
                    fill="var(--primary)" 
                    radius={[2, 2, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div><style>{`
        .profile-layout-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          width: 100%;
        }

        /* HERO HEADER */
        .profile-hero-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 2rem;
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
          border: 1px solid var(--outline-variant);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: var(--card-shadow);
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
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 850;
          letter-spacing: -0.03em;
          color: var(--on-background);
          line-height: 1.1;
        }

        .profile-site-link {
          font-size: 0.95rem;
          color: var(--secondary);
          line-height: 1.5;
        }

        /* Pulse Rating Score Box */
        .overall-pulse-score-box {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
          width: 18rem;
          align-items: center;
          box-shadow: var(--card-shadow);
        }

        .pulse-score-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .pulse-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--secondary);
          text-transform: uppercase;
        }

        .pulse-score-value-block {
          display: flex;
          align-items: flex-end;
          line-height: 1;
        }

        .score-num {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -0.02em;
        }

        .score-denom {
          font-size: 0.875rem;
          color: var(--secondary);
          margin-bottom: 0.25rem;
          margin-left: 0.15rem;
          font-weight: 500;
        }

        .stars-row {
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        .star-icon-filled {
          color: #fbbf24;
          fill: #fbbf24;
        }

        .star-icon-empty {
          color: var(--surface-container-highest);
        }

        .write-review-hero-btn {
          width: 100%;
          background-color: var(--primary);
          color: var(--on-primary);
          font-size: 0.875rem;
          font-weight: 600;
          padding: 0.625rem 0;
          border-radius: var(--radius-sm);
          text-align: center;
          transition: all 0.2s ease;
          box-shadow: var(--card-shadow);
        }

        .write-review-hero-btn:hover {
          background-color: var(--primary-hover);
          transform: translateY(-1px);
        }

        /* ACTIONS STRIP */
        .quick-actions-strip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .strip-action-btn {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--secondary);
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .strip-action-btn:hover {
          color: var(--primary);
          background-color: var(--surface-container-low);
          border-color: var(--primary);
        }

        /* STATS deck */
        .core-stats-deck {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 2rem;
          color: var(--primary);
          box-shadow: var(--card-shadow);
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
          color: var(--secondary);
        }

        .deck-card-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .deck-card-icon {
          color: var(--secondary);
        }

        .deck-card-val {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--on-background);
        }

        .val-mo {
          font-size: 0.875rem;
          color: var(--secondary);
          font-weight: 500;
          margin-left: 0.15rem;
        }

        .deck-card-context-badge {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .text-green { color: var(--success); }
        .text-amber { color: #d97706; }
        .text-blue { color: var(--primary); }
        .text-muted { color: var(--secondary); }

        /* GRID MAIN */
        .profile-main-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 2.5rem;
        }

        .profile-details-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .details-card-block {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: var(--card-shadow);
        }

        .details-card-title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--on-background);
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
          font-size: 0.875rem;
          font-weight: 600;
        }

        .culture-name {
          color: var(--on-background);
        }

        .culture-val {
          color: var(--primary);
          font-weight: 700;
        }

        .culture-track {
          width: 100%;
          height: 8px;
          background-color: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .culture-fill {
          height: 100%;
          border-radius: var(--radius-full);
        }

        .bg-green-fill { background-color: var(--success); }
        .bg-blue-fill { background-color: var(--primary); }
        .bg-amber-fill { background-color: #fbbf24; }

        .culture-desc-text {
          font-size: 0.8125rem;
          color: var(--secondary);
          line-height: 1.5;
        }

        /* Smart insight card */
        .smart-insight-callout {
          background-color: var(--primary-container);
          border: 1px solid rgba(55, 138, 221, 0.15);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
        }

        .insight-sparkle-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .insight-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--primary);
          margin-bottom: 0.25rem;
          text-transform: uppercase;
        }

        .insight-text-body {
          font-size: 0.875rem;
          color: var(--on-primary-container);
          line-height: 1.6;
        }

        /* REVIEWS TIMELINE */
        .reviews-section-block {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: var(--card-shadow);
        }

        .reviews-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 1rem;
        }

        .reviews-sorting-dropdown {
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--primary);
          outline: none;
          cursor: pointer;
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-sm);
        }

        .reviews-feed-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .review-feed-card {
          border-bottom: 1px solid var(--outline-variant);
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
          background-color: var(--primary-container);
          border: 1px solid rgba(55, 138, 221, 0.15);
          color: var(--primary);
          font-weight: 700;
          font-size: 0.875rem;
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
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--on-background);
        }

        .review-rating-label {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--on-background);
          display: flex;
          align-items: center;
          gap: 0.15rem;
        }

        .inline-star {
          fill: #fbbf24;
          color: #fbbf24;
        }

        .reviewer-details-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--secondary);
          font-weight: 500;
        }

        .verified-badge {
          color: var(--success);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
        }

        .review-pros-cons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .block-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 0.35rem;
        }

        .pros-color-label { color: var(--success); }
        .cons-color-label { color: #d97706; }

        .block-body {
          font-size: 0.875rem;
          color: var(--on-surface-variant);
          line-height: 1.6;
        }

        .review-skill-tags {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          flex-wrap: wrap;
        }

        .skill-badge-tag {
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--surface-container-low);
          color: var(--secondary);
          border: 1px solid var(--outline-variant);
          padding: 0.2rem 0.625rem;
          border-radius: var(--radius-sm);
        }

        .load-more-reviews-btn {
          width: 100%;
          border: 1.5px solid var(--outline-variant);
          background-color: var(--surface);
          color: var(--on-background);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.5rem 0;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
          text-transform: uppercase;
          height: 2.5rem;
        }

        .load-more-reviews-btn:hover {
          background-color: var(--primary);
          color: var(--on-primary);
          border-color: var(--primary);
          transform: translateY(-1px);
        }

        /* RIGHT WIDGETS COLUMN */
        .profile-widgets-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .widget-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: var(--card-shadow);
        }

        .bg-emerald-light-card {
          background-color: rgba(16, 185, 129, 0.04);
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
          background-color: var(--success);
          border-radius: var(--radius-full);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        .hiring-status-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--success);
          letter-spacing: 0.05em;
          text-transform: uppercase;
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
          color: var(--secondary);
          margin-top: 0.125rem;
        }

        .detail-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--secondary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .detail-val {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--on-background);
          line-height: 1.4;
          margin-top: 0.1rem;
        }

        .apply-company-site-btn {
          width: 100%;
          background-color: var(--on-background);
          color: var(--surface);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.5rem 0;
          border-radius: var(--radius-sm);
          text-align: center;
          transition: all 0.2s ease;
          text-transform: uppercase;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .apply-company-site-btn:hover {
          background-color: var(--primary);
          transform: translateY(-1px);
        }

        .widget-card-title {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--on-background);
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .peers-comparison-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .peer-compare-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .peer-compare-item:hover {
          border-color: var(--primary);
          background-color: var(--primary-container);
        }

        .peer-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .peer-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--on-background);
        }

        .peer-meta {
          font-size: 0.75rem;
          color: var(--secondary);
          font-weight: 500;
        }

        .peer-arrow {
          color: var(--secondary);
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
