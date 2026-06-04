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
        }

        /* SIDEBAR FILTERS */
        .filters-sidebar {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 0.75rem;
        }

        .filters-title {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--primary);
        }

        .clear-filters-btn {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--tertiary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .filter-group-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
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
          font-size: 0.875rem;
          color: var(--on-surface-variant);
          user-select: none;
          padding-left: 1.5rem;
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
          top: 3px;
          left: 0;
          height: 14px;
          width: 14px;
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: 3px;
          transition: all 0.1s ease;
        }

        .checkbox-container:hover .checkbox-custom {
          border-color: var(--outline);
        }

        .filter-checkbox:checked ~ .checkbox-custom {
          background-color: var(--primary);
          border-color: var(--primary);
        }

        .checkbox-custom:after {
          content: "";
          position: absolute;
          display: none;
          left: 4px;
          top: 1px;
          width: 3px;
          height: 6px;
          border: solid white;
          border-width: 0 1.5px 1.5px 0;
          transform: rotate(45deg);
        }

        .filter-checkbox:checked ~ .checkbox-custom:after {
          display: block;
        }

        .checkbox-label {
          font-weight: 400;
        }

        /* Stipend range slider */
        .stipend-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          border-radius: var(--radius-full);
          background: var(--surface-container-highest);
          outline: none;
        }

        .stipend-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: var(--radius-full);
          background: var(--primary);
          cursor: pointer;
          border: 1px solid var(--outline-variant);
          transition: transform 0.1s ease;
        }

        .stipend-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }

        .slider-limits-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--secondary);
        }

        .active-slider-val {
          color: var(--primary);
          font-weight: 500;
        }

        /* Location Box */
        .sidebar-input-box {
          display: flex;
          align-items: center;
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-sm);
          padding: 0.5rem 0.75rem;
          gap: 0.5rem;
          height: 2.25rem;
        }

        .sidebar-input-box:focus-within {
          border-color: var(--primary);
        }

        .sidebar-input-icon {
          color: var(--secondary);
        }

        .sidebar-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.8125rem;
          color: var(--primary);
          background-color: transparent;
        }

        /* Score filters buttons */
        .score-selector-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        .score-btn {
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          color: var(--secondary);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.4rem 0;
          border-radius: var(--radius-sm);
          transition: all 0.15s ease;
        }

        .score-btn:hover {
          border-color: var(--outline);
          color: var(--primary);
        }

        .score-btn-active {
          background-color: var(--primary);
          border-color: var(--primary);
          color: var(--on-primary);
        }

        /* MAIN RESULTS */
        .results-directory {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .directory-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 0.75rem;
        }

        .directory-heading {
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }

        .directory-count-summary {
          font-size: 0.875rem;
          color: var(--secondary);
        }

        .directory-sorting-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sort-label {
          font-size: 0.75rem;
          color: var(--secondary);
          font-weight: 500;
        }

        .sorting-dropdown {
          border: none;
          background: none;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--tertiary);
          outline: none;
          cursor: pointer;
        }

        .companies-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .company-result-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.15s ease;
        }

        .company-result-card:hover {
          background-color: var(--surface-container-low);
          border-color: var(--outline);
        }

        .company-logo-avatar {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--outline-variant);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .logo-letter {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .company-details-block {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .company-name-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .company-card-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--primary);
        }

        .company-category-capsules {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          flex-wrap: wrap;
        }

        .capsule-tag {
          font-size: 0.75rem;
          font-weight: 500;
          background-color: var(--surface-container);
          color: var(--secondary);
          padding: 0.15rem 0.5rem;
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-sm);
        }

        .capsule-accent {
          background-color: rgba(0, 142, 191, 0.08);
          color: var(--tertiary);
          border-color: rgba(0, 142, 191, 0.15);
        }

        .company-metrics-summary-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          font-size: 0.8125rem;
          color: var(--secondary);
          flex-wrap: wrap;
        }

        .card-metric-rating {
          font-weight: 500;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .star-filled-icon {
          color: #fbbf24;
          fill: #fbbf24;
        }

        .score-denominator, .stipend-denominator {
          color: var(--secondary);
          font-size: 0.75rem;
          font-weight: 400;
          margin-left: 0.25rem;
        }

        .card-metric-stipend {
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .stipend-icon {
          color: var(--secondary);
        }

        .card-metric-location {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 400;
        }

        .location-icon {
          color: var(--secondary);
        }

        .view-profile-btn {
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          color: var(--primary);
          font-size: 0.8125rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2.25rem;
        }

        .view-profile-btn:hover {
          background-color: var(--primary);
          color: var(--on-primary);
          border-color: var(--primary);
        }

        .empty-results-box {
          text-align: center;
          padding: 3rem 1.5rem;
          border: 1px dashed var(--outline-variant);
          border-radius: var(--radius-md);
          background-color: var(--surface);
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
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--secondary);
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          transition: all 0.15s ease;
        }

        .pag-nav-btn:hover, .pag-num-btn:hover {
          border-color: var(--outline);
          color: var(--primary);
        }

        .pag-num-active {
          background-color: var(--primary);
          border-color: var(--primary);
          color: var(--on-primary) !important;
        }

        .pag-ellipsis {
          font-size: 0.8125rem;
          color: var(--secondary);
          width: 2rem;
          text-align: center;
        }

        @media (max-width: 900px) {
          .browse-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
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
