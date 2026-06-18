import React, { useContext, useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Search, Star, MapPin, DollarSign, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../utils/animations";

const CompanyLogo = ({ company, className, letterClassName }) => {
  const [imgError, setImgError] = React.useState(false);
  
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
        style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px", backgroundColor: "#ffffff" }}
      />
    );
  }
  
  return (
    <span className={letterClassName} style={{ color: company.logoColor }}>
      {company.name.charAt(0)}
    </span>
  );
};

export default function Browse() {
  const { companies } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();

  /* Scroll reveal for filter/results sections */
  useScrollReveal({ threshold: 0.05 });

  // URL search params
  const initialQuery = searchParams.get("q") || "";
  const initialCategoryFilter = searchParams.get("filter") || "";

  // React State for filters
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [industries, setIndustries] = useState({
    "Tech & AI": true,
    "Research Labs": true,
    "Software Services": true,
    "Engineering & Science": true
  });
  const [stipendLimit, setStipendLimit] = useState(80000);
  const [locationQuery, setLocationQuery] = useState("");
  const [pulseScoreMin, setPulseScoreMin] = useState(0); // Show all by default so user sees everything
  const [sortBy, setSortBy] = useState("pulse"); // default sorting

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, industries, stipendLimit, locationQuery, pulseScoreMin, sortBy]);

  // Handle category checklist triggers
  const handleIndustryChange = (key) => {
    setIndustries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearchQuery("");
    setIndustries({
      "Tech & AI": true,
      "Research Labs": true,
      "Software Services": true,
      "Engineering & Science": true
    });
    setStipendLimit(80000);
    setLocationQuery("");
    setPulseScoreMin(0);
    setSortBy("pulse");
    setSearchParams({});
  };

  // Filtering Logic
  const filteredCompanies = useMemo(() => {
    return companies
      .filter((company) => {
        // Search bar query (name, category, or location)
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchesName = company.name.toLowerCase().includes(q);
          const matchesCategory = company.category.toLowerCase().includes(q);
          const matchesLoc = company.location.toLowerCase().includes(q);
          if (!matchesName && !matchesCategory && !matchesLoc) return false;
        }

        // Industry Checkbox filters
        const activeIndustries = Object.keys(industries).filter(k => industries[k]);
        if (activeIndustries.length > 0) {
          const matchesIndustry = activeIndustries.some(ind => {
            const cat = company.category.toLowerCase();
            if (ind === "Tech & AI") {
              return cat.includes("tech") || cat.includes("saas") || cat.includes("ai") || cat.includes("analytics") || cat.includes("gaming");
            }
            if (ind === "Research Labs") {
              return cat.includes("research") || cat.includes("lab");
            }
            if (ind === "Software Services") {
              return cat.includes("services") || cat.includes("development") || cat.includes("edtech");
            }
            if (ind === "Engineering & Science") {
              return cat.includes("deftech") || cat.includes("agritech") || cat.includes("cleantech") || cat.includes("construction") || cat.includes("healthtech");
            }
            return false;
          });
          if (!matchesIndustry) return false;
        }

        // Stipend Filter
        if (stipendLimit < 80000) {
          if (company.stipend > stipendLimit) return false;
        }

        // Location query
        if (locationQuery) {
          const loc = locationQuery.toLowerCase();
          if (!company.location.toLowerCase().includes(loc)) return false;
        }

        // Pulse Score filter
        if (pulseScoreMin > 0) {
          if (company.pulseScore < pulseScoreMin) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "pulse") return b.pulseScore - a.pulseScore;
        if (sortBy === "stipend") return b.stipend - a.stipend;
        return 0;
      });
  }, [companies, searchQuery, industries, stipendLimit, locationQuery, pulseScoreMin, sortBy]);

  // Paginated Slicing
  const totalItems = filteredCompanies.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCompanies, currentPage]);

  return (
    <div className="browse-layout">
      
      {/* SIDEBAR FILTERS */}
      <aside className="filters-sidebar animate-fade-in-left" style={{ animationDelay: '100ms' }}>
        <div className="sidebar-header">
          <span className="filters-title">FILTERS</span>
          <button onClick={handleClearAll} className="clear-filters-btn">
            <RotateCcw size={12} /> Clear all
          </button>
        </div>

        {/* Industry Checklist */}
        <div className="filter-group">
          <label className="filter-group-label">Industry</label>
          <div className="checkboxes-wrapper">
            {Object.keys(industries).map((ind) => (
              <label key={ind} className="checkbox-container">
                <input 
                  type="checkbox"
                  checked={industries[ind]}
                  onChange={() => handleIndustryChange(ind)}
                  className="filter-checkbox"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">{ind}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Stipend Range Slider */}
        <div className="filter-group">
          <div className="slider-label-row">
            <label className="filter-group-label">Monthly Stipend (PKR)</label>
          </div>
          <input 
            type="range" 
            min="0" 
            max="80000" 
            step="5000"
            value={stipendLimit}
            onChange={(e) => setStipendLimit(parseInt(e.target.value))}
            className="stipend-slider"
          />
          <div className="slider-limits-row">
            <span>PKR 0</span>
            <span className="active-slider-val">
              {stipendLimit === 80000 ? "PKR 80,000+" : `PKR ${stipendLimit.toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* Location Input */}
        <div className="filter-group">
          <label className="filter-group-label">Location</label>
          <div className="sidebar-input-box">
            <MapPin size={16} className="sidebar-input-icon" />
            <input 
              type="text" 
              placeholder="City or Remote" 
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="sidebar-input"
            />
          </div>
        </div>

        {/* Pulse Score Selector */}
        <div className="filter-group">
          <label className="filter-group-label">Pulse Score (Min)</label>
          <div className="score-selector-buttons">
            {[0, 3, 4, 4.5].map((val) => (
              <button 
                key={val}
                onClick={() => setPulseScoreMin(val)}
                className={`score-btn ${pulseScoreMin === val ? "score-btn-active" : ""}`}
              >
                {val === 0 ? "All" : `${val}+`}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* SEARCH RESULTS DIRECTORY */}
      <main className="results-directory">
        <div className="directory-header-row">
          <div>
            <h1 className="directory-heading">Internship Directory</h1>
            <p className="directory-count-summary">
              Showing {filteredCompanies.length} results
            </p>
          </div>
          
          <div className="directory-sorting-controls">
            <span className="sort-label">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sorting-dropdown"
            >
              <option value="pulse">Pulse Score</option>
              <option value="stipend">Avg. Stipend</option>
            </select>
          </div>
        </div>

        {/* Dynamic Company Card Grid */}
        <div className="companies-list">
          {paginatedCompanies.length > 0 ? (
            paginatedCompanies.map((company, i) => (
              <div key={company.id} className="company-result-card animate-stagger-slide hover-lift" style={{ animationDelay: `${i * 80}ms` }}>
                
                {/* Logo Placeholder */}
                <div 
                  className="company-logo-avatar"
                  style={{ 
                    backgroundColor: company.name.toLowerCase().includes("seecs") ? "transparent" : `${company.logoColor}15`,
                    overflow: "hidden"
                  }}
                >
                  <CompanyLogo 
                    company={company} 
                    className="w-full h-full" 
                    letterClassName="logo-letter" 
                  />
                </div>

                {/* Company Specs */}
                <div className="company-details-block">
                  <div className="company-name-row">
                    <h3 className="company-card-name">{company.name}</h3>
                    <div className="company-category-capsules">
                      {company.tags.map((tag) => (
                        <span key={tag} className={`capsule-tag ${tag.includes("LUXURY") || tag.includes("TOP") ? "capsule-accent" : ""}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="company-metrics-summary-row">
                    <span className="card-metric-rating">
                      <Star size={14} className="star-filled-icon" />
                      {company.pulseScore.toFixed(1)} <span className="score-denominator">PULSE SCORE</span>
                    </span>

                    <span className="card-metric-stipend">
                      <DollarSign size={14} className="stipend-icon" />
                      <strong>PKR {company.stipend.toLocaleString()}</strong> <span className="stipend-denominator">AVG. MONTHLY</span>
                    </span>

                    <span className="card-metric-location">
                      <MapPin size={14} className="location-icon" />
                      {company.location}
                    </span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <Link to={`/profile/${company.id}`} className="view-profile-btn ripple-effect click-squish">
                  OPEN DOSSIER
                </Link>

              </div>
            ))
          ) : (
            <div className="empty-results-box">
              <h3>No companies match the current filters.</h3>
              <p>Try resetting the filters or searching with a different query.</p>
              <button onClick={handleClearAll} className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* PAGINATION COMPONENT */}
        {totalPages > 1 && (
          <nav className="pagination-wrapper" aria-label="Pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`pag-nav-btn ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button 
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`pag-num-btn ${currentPage === pageNum ? "pag-num-active" : ""}`}
              >
                {pageNum}
              </button>
            ))}
            
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`pag-nav-btn ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </main>

      <style>{`
        .browse-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 2.5rem;
          width: 100%;
        }

        /* SIDEBAR FILTERS */
        .filters-sidebar {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.75rem 1.5rem;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          box-shadow: var(--shadow-card);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
        }

        .filters-title {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-primary);
        }

        .clear-filters-btn {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--accent);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.2s ease;
        }
        .clear-filters-btn:hover {
          color: var(--accent-hover);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .filter-group-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .checkboxes-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          font-size: 0.8rem;
          color: var(--text-secondary);
          user-select: none;
          padding-left: 1.75rem;
          font-weight: 500;
        }

        .filter-checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkbox-custom {
          position: absolute;
          top: 2px;
          left: 0;
          height: 15px;
          width: 15px;
          background-color: transparent;
          border: 1.5px solid var(--border-hover);
          border-radius: 3px;
          transition: all 0.2s ease;
        }

        .checkbox-container:hover .checkbox-custom {
          border-color: var(--accent);
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.2);
        }

        .filter-checkbox:checked ~ .checkbox-custom {
          background-color: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
        }

        .checkbox-custom:after {
          content: "";
          position: absolute;
          display: none;
          left: 4px;
          top: 1px;
          width: 3px;
          height: 7px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .filter-checkbox:checked ~ .checkbox-custom:after {
          display: block;
        }

        /* Stipend range slider */
        .stipend-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 3px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          outline: none;
        }

        .stipend-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: var(--radius-full);
          background: var(--accent);
          cursor: pointer;
          border: 2px solid var(--bg-primary);
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
          transition: transform 0.2s ease;
        }

        .stipend-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider-limits-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .active-slider-val {
          color: var(--accent);
          font-weight: 600;
        }

        /* Location Box */
        .sidebar-input-box {
          display: flex;
          align-items: center;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.5rem 0.75rem;
          gap: 0.5rem;
          height: 2.25rem;
          transition: all 0.2s ease;
        }

        .sidebar-input-box:focus-within {
          border-color: var(--accent);
          box-shadow: var(--focus-ring);
        }

        .sidebar-input-icon {
          color: var(--text-muted);
        }

        .sidebar-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.8rem;
          color: var(--text-primary);
          background-color: transparent;
        }

        .sidebar-input::placeholder {
          color: var(--text-muted);
        }

        /* Score filters buttons */
        .score-selector-buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.375rem;
        }

        .score-btn {
          border: 1px solid var(--border);
          background-color: transparent;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.4rem 0;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .score-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .score-btn-active {
          background-color: var(--accent);
          border-color: var(--accent);
          color: #ffffff !important;
          box-shadow: var(--accent-glow-sm);
        }

        /* MAIN RESULTS */
        .results-directory {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .directory-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
        }

        .directory-heading {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .directory-count-summary {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .directory-sorting-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sort-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .sorting-dropdown {
          border: 1px solid var(--border);
          background-color: var(--bg-surface);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent);
          outline: none;
          cursor: pointer;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }
        .sorting-dropdown:hover {
          border-color: var(--accent);
        }
        .sorting-dropdown option {
          background-color: var(--bg-surface);
          color: var(--text-primary);
        }

        .companies-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .company-result-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-left: 3px solid var(--accent);
          border-radius: var(--radius-md);
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: center;
          gap: 1.75rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-card);
        }

        .company-result-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-card-hover);
          background-color: rgba(59, 130, 246, 0.03);
        }

        .company-logo-avatar {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .logo-letter {
          font-size: 1.35rem;
          font-weight: 800;
        }

        .company-details-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .company-name-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .company-card-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .company-category-capsules {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          flex-wrap: wrap;
        }

        .capsule-tag {
          font-size: 0.6rem;
          font-weight: 600;
          background-color: rgba(255, 255, 255, 0.04);
          color: var(--text-muted);
          padding: 0.15rem 0.5rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .capsule-accent {
          background-color: var(--accent-muted);
          color: var(--accent);
          border-color: rgba(59, 130, 246, 0.2);
        }

        .company-metrics-summary-row {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          flex-wrap: wrap;
        }

        .card-metric-rating {
          font-weight: 600;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .star-filled-icon {
          color: #fbbf24;
          fill: #fbbf24;
        }

        .score-denominator, .stipend-denominator {
          color: var(--text-muted);
          font-size: 0.65rem;
          font-weight: 500;
          margin-left: 0.15rem;
        }

        .card-metric-stipend {
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 600;
        }

        .stipend-icon {
          color: var(--text-muted);
        }

        .card-metric-location {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .location-icon {
          color: var(--text-muted);
        }

        .view-profile-btn {
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          background-color: transparent;
          color: var(--text-primary);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2.25rem;
          letter-spacing: 0.06em;
        }

        .view-profile-btn:hover {
          background-color: var(--accent);
          color: #ffffff;
          border-color: var(--accent);
          box-shadow: var(--accent-glow-sm);
          transform: translateY(-1px);
        }

        .empty-results-box {
          text-align: center;
          padding: 4rem 2rem;
          border: 1.5px dashed var(--border);
          border-radius: var(--radius-md);
          background-color: var(--bg-surface);
          color: var(--text-secondary);
        }

        /* PAGINATION */
        .pagination-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 2rem;
        }

        .pag-nav-btn, .pag-num-btn {
          width: 2rem;
          height: 2rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          background-color: transparent;
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }

        .pag-nav-btn:hover, .pag-num-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .pag-num-active {
          background-color: var(--accent);
          border-color: var(--accent);
          color: #ffffff !important;
          box-shadow: var(--accent-glow-sm);
        }

        .opacity-50 { opacity: 0.35; }
        .cursor-not-allowed { cursor: not-allowed; }

        @media (max-width: 900px) {
          .browse-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .company-result-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          
          .view-profile-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
