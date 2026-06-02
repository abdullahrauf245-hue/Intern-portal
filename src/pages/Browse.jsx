import React, { useContext, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Search, Star, MapPin, DollarSign, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

export default function Browse() {
  const { companies } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // URL search params
  const initialQuery = searchParams.get("q") || "";
  const initialCategoryFilter = searchParams.get("filter") || "";

  // React State for filters
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [industries, setIndustries] = useState({
    Technology: initialCategoryFilter === "remote" || initialCategoryFilter === "stipend" || initialCategoryFilter === "rating" || !initialCategoryFilter ? true : false,
    Finance: false,
    Consulting: false,
    Media: false
  });
  const [stipendLimit, setStipendLimit] = useState(5000);
  const [locationQuery, setLocationQuery] = useState("");
  const [pulseScoreMin, setPulseScoreMin] = useState(4); // 4+ is default in Stitch UI
  const [sortBy, setSortBy] = useState("pulse"); // default sorting

  // Handle category checklist triggers
  const handleIndustryChange = (key) => {
    setIndustries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Clear all filters
  const handleClearAll = () => {
    setSearchQuery("");
    setIndustries({
      Technology: true,
      Finance: false,
      Consulting: false,
      Media: false
    });
    setStipendLimit(5000);
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
            if (ind === "Technology") return company.category.toLowerCase().includes("tech") || company.category.toLowerCase().includes("saas") || company.category.toLowerCase().includes("ai");
            if (ind === "Finance") return company.category.toLowerCase().includes("fintech") || company.category.toLowerCase().includes("finance");
            if (ind === "Consulting") return company.category.toLowerCase().includes("consulting");
            if (ind === "Media") return company.category.toLowerCase().includes("media") || company.category.toLowerCase().includes("travel");
            return false;
          });
          if (!matchesIndustry) return false;
        }

        // Stipend Filter
        if (stipendLimit < 5000) {
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

  return (
    <div className="browse-layout">
      
      {/* SIDEBAR FILTERS */}
      <aside className="filters-sidebar">
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
            <label className="filter-group-label">Monthly Stipend</label>
          </div>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            step="500"
            value={stipendLimit}
            onChange={(e) => setStipendLimit(parseInt(e.target.value))}
            className="stipend-slider"
          />
          <div className="slider-limits-row">
            <span>$0</span>
            <span className="active-slider-val">
              {stipendLimit === 5000 ? "$5,000+" : `$${stipendLimit.toLocaleString()}`}
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
            {[3, 4, 4.5].map((val) => (
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
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <div key={company.id} className="company-result-card">
                
                {/* Logo Placeholder */}
                <div 
                  className="company-logo-avatar"
                  style={{ backgroundColor: `${company.logoColor}15` }}
                >
                  <span className="logo-letter" style={{ color: company.logoColor }}>
                    {company.name.charAt(0)}
                  </span>
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
                      <strong>${company.stipend.toLocaleString()}</strong> <span className="stipend-denominator">AVG. MONTHLY</span>
                    </span>

                    <span className="card-metric-location">
                      <MapPin size={14} className="location-icon" />
                      {company.location}
                    </span>
                  </div>
                </div>

                {/* Direct Action Link */}
                <Link to={`/profile/${company.id}`} className="view-profile-btn">
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
        {filteredCompanies.length > 0 && (
          <nav className="pagination-wrapper" aria-label="Pagination">
            <button className="pag-nav-btn" aria-label="Previous page">
              <ChevronLeft size={16} />
            </button>
            <button className="pag-num-btn pag-num-active">1</button>
            <button className="pag-num-btn">2</button>
            <button className="pag-num-btn">3</button>
            <span className="pag-ellipsis">...</span>
            <button className="pag-num-btn">12</button>
            <button className="pag-nav-btn" aria-label="Next page">
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </main>

      <style>{`
        .browse-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 2.5rem;
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 2rem 1.5rem 5rem 1.5rem;
        }

        /* SIDEBAR FILTERS */
        .filters-sidebar {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
        }

        .filters-title {
          font-size: 0.725rem;
          font-weight: 750;
          letter-spacing: 0.08em;
          color: var(--text-primary);
        }

        .clear-filters-btn {
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--brand-secondary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .filter-group-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .checkboxes-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          font-size: 0.85rem;
          color: var(--text-secondary);
          user-select: none;
          padding-left: 1.65rem;
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
          height: 14px;
          width: 14px;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-heavy);
          border-radius: 3px;
          transition: all 0.15s ease;
        }

        .checkbox-container:hover .checkbox-custom {
          border-color: var(--text-primary);
        }

        .filter-checkbox:checked ~ .checkbox-custom {
          background-color: var(--brand-primary);
          border-color: var(--brand-primary);
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
          border-width: 0 1.5px 1.5px 0;
          transform: rotate(45deg);
        }

        .filter-checkbox:checked ~ .checkbox-custom:after {
          display: block;
        }

        .checkbox-label {
          font-weight: 500;
        }

        /* Stipend range slider */
        .stipend-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: var(--radius-full);
          background: var(--border-heavy);
          outline: none;
        }

        .stipend-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: var(--radius-full);
          background: var(--brand-primary);
          cursor: pointer;
          border: 2px solid var(--bg-secondary);
          box-shadow: var(--shadow-sm);
          transition: transform 0.1s ease;
        }

        .stipend-slider::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }

        .slider-limits-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .active-slider-val {
          color: var(--brand-secondary);
          font-weight: 700;
        }

        /* Location Box */
        .sidebar-input-box {
          display: flex;
          align-items: center;
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-heavy);
          border-radius: var(--radius-md);
          padding: 0.5rem 0.75rem;
          gap: 0.5rem;
        }

        .sidebar-input-icon {
          color: var(--text-muted);
        }

        .sidebar-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        /* Score filters buttons */
        .score-selector-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .score-btn {
          border: 1px solid var(--border-heavy);
          background-color: var(--bg-secondary);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.4rem 0;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .score-btn:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }

        .score-btn-active {
          background-color: var(--brand-light-green);
          border-color: var(--brand-primary);
          color: var(--brand-secondary);
        }

        /* MAIN RESULTS */
        .results-directory {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .directory-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .directory-heading {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
        }

        .directory-count-summary {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .directory-sorting-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sort-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 700;
        }

        .sorting-dropdown {
          border: none;
          background: none;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--brand-secondary);
          outline: none;
          cursor: pointer;
        }

        .companies-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .company-result-card {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s ease;
        }

        .company-result-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .company-logo-avatar {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .logo-letter {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 800;
        }

        .company-details-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .company-name-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .company-card-name {
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .company-category-capsules {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .capsule-tag {
          font-size: 0.625rem;
          font-weight: 750;
          background-color: var(--bg-primary);
          color: var(--text-secondary);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          letter-spacing: 0.05em;
        }

        .capsule-accent {
          background-color: #fef3c7;
          color: #d97706;
        }

        .company-metrics-summary-row {
          display: flex;
          align-items: center;
          gap: 2.25rem;
          font-size: 0.8rem;
          color: var(--text-secondary);
          flex-wrap: wrap;
        }

        .card-metric-rating {
          font-weight: 700;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .star-filled-icon {
          color: #fbbf24;
          fill: #fbbf24;
        }

        .score-denominator, .stipend-denominator {
          color: var(--text-muted);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .card-metric-stipend {
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .stipend-icon {
          color: var(--text-muted);
        }

        .card-metric-location {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 500;
        }

        .location-icon {
          color: var(--text-muted);
        }

        .view-profile-btn {
          border: 1px solid var(--border-heavy);
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-sm);
          letter-spacing: 0.05em;
          flex-shrink: 0;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .view-profile-btn:hover {
          background-color: var(--bg-dark);
          color: var(--text-white);
          border-color: var(--bg-dark);
        }

        .empty-results-box {
          text-align: center;
          padding: 3rem 1.5rem;
          border: 1px dashed var(--border-heavy);
          border-radius: var(--radius-md);
          background-color: var(--bg-secondary);
        }

        /* PAGINATION */
        .pagination-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          margin-top: 2rem;
        }

        .pag-nav-btn, .pag-num-btn {
          width: 2rem;
          height: 2rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          transition: all 0.2s ease;
        }

        .pag-nav-btn:hover, .pag-num-btn:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }

        .pag-num-active {
          background-color: var(--bg-dark);
          border-color: var(--bg-dark);
          color: var(--text-white) !important;
        }

        .pag-ellipsis {
          font-size: 0.85rem;
          color: var(--text-muted);
          width: 2rem;
          text-align: center;
        }

        @media (max-width: 900px) {
          .browse-layout {
            grid-template-columns: 1fr;
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

        /* Editorial + brutalist overrides */
        .browse-layout {
          gap: 3rem;
        }

        .filters-sidebar {
          border: 1px solid var(--text-primary);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-md);
        }

        .sidebar-header {
          border-bottom: 2px solid var(--text-primary);
        }

        .filters-title {
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .clear-filters-btn {
          color: var(--brand-primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .filter-group-label {
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.7rem;
        }

        .checkbox-custom {
          border: 1px solid var(--text-primary);
          border-radius: 2px;
        }

        .filter-checkbox:checked ~ .checkbox-custom {
          background-color: var(--brand-primary);
          border-color: var(--brand-primary);
        }

        .score-btn {
          border: 1px solid var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.7rem;
        }

        .score-btn-active {
          background-color: var(--brand-primary);
          border-color: var(--brand-primary);
          color: var(--text-white);
        }

        .directory-header-row {
          border-bottom: 2px solid var(--text-primary);
        }

        .directory-heading {
          font-size: 1.8rem;
        }

        .sorting-dropdown {
          color: var(--brand-primary);
        }

        .company-result-card {
          border: 1px solid var(--text-primary);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-md);
        }

        .company-result-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: var(--shadow-lg);
        }

        .company-logo-avatar {
          border: 1px solid var(--text-primary);
          border-radius: var(--radius-sm);
        }

        .capsule-tag {
          border: 1px solid var(--text-primary);
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-primary);
        }

        .capsule-accent {
          background-color: var(--brand-light-green);
          color: var(--brand-primary);
          border-color: var(--brand-primary);
        }

        .view-profile-btn {
          border: 1px solid var(--brand-primary);
          background-color: var(--brand-primary);
          color: var(--text-white);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          border-radius: var(--radius-sm);
        }

        .view-profile-btn:hover {
          background-color: var(--brand-secondary);
          border-color: var(--brand-secondary);
        }

        .pagination-wrapper {
          margin-top: 2.5rem;
        }

        .pag-nav-btn, .pag-num-btn {
          border: 1px solid var(--text-primary);
          border-radius: var(--radius-sm);
        }

        .pag-num-active {
          background-color: var(--brand-primary);
          border-color: var(--brand-primary);
          color: var(--text-white) !important;
        }
      `}</style>
    </div>
  );
}
