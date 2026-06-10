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
          grid-template-columns: 260px 1fr;
          gap: 3rem;
          width: 100%;
        }

        /* SIDEBAR FILTERS */
        .filters-sidebar {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 2rem 1.5rem;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-shadow: var(--card-shadow);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 1rem;
        }

        .filters-title {
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--on-background);
        }

        .clear-filters-btn {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.2s ease;
        }
        .clear-filters-btn:hover {
          color: var(--primary-hover);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
        }

        .filter-group-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--on-background);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .checkboxes-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          font-size: 0.875rem;
          color: var(--on-surface-variant);
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
          height: 16px;
          width: 16px;
          background-color: var(--surface);
          border: 1.5px solid var(--outline-variant);
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .checkbox-container:hover .checkbox-custom {
          border-color: var(--primary);
        }

        .filter-checkbox:checked ~ .checkbox-custom {
          background-color: var(--primary);
          border-color: var(--primary);
        }

        .checkbox-custom:after {
          content: "";
          position: absolute;
          display: none;
          left: 5px;
          top: 1.5px;
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
          height: 5px;
          border-radius: var(--radius-full);
          background: var(--surface-container-highest);
          outline: none;
        }

        .stipend-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: var(--radius-full);
          background: var(--primary);
          cursor: pointer;
          border: 2px solid var(--surface);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s ease;
        }

        .stipend-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider-limits-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--secondary);
          margin-top: 0.25rem;
        }

        .active-slider-val {
          color: var(--primary);
          font-weight: 600;
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
          height: 2.5rem;
          transition: all 0.2s ease;
        }

        .sidebar-input-box:focus-within {
          border-color: var(--primary);
          box-shadow: var(--focus-ring);
        }

        .sidebar-input-icon {
          color: var(--secondary);
        }

        .sidebar-input {
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.875rem;
          color: var(--on-background);
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
          font-size: 0.8125rem;
          font-weight: 600;
          padding: 0.5rem 0;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .score-btn:hover {
          border-color: var(--primary);
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
          gap: 2rem;
        }

        .directory-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 1rem;
        }

        .directory-heading {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--on-background);
        }

        .directory-count-summary {
          font-size: 0.875rem;
          color: var(--secondary);
          margin-top: 0.25rem;
        }

        .directory-sorting-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sort-label {
          font-size: 0.75rem;
          color: var(--secondary);
          font-weight: 600;
        }

        .sorting-dropdown {
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--primary);
          outline: none;
          cursor: pointer;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }
        .sorting-dropdown:hover {
          border-color: var(--primary);
        }

        .companies-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .company-result-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 1.75rem 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--card-shadow);
        }

        .company-result-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--card-shadow-hover);
          border-color: rgba(55, 138, 221, 0.2);
        }

        .company-logo-avatar {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--outline-variant);
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
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--on-background);
        }

        .company-category-capsules {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          flex-wrap: wrap;
        }

        .capsule-tag {
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--surface-container-low);
          color: var(--secondary);
          padding: 0.2rem 0.625rem;
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-sm);
          letter-spacing: 0.02em;
        }

        .capsule-accent {
          background-color: rgba(55, 138, 221, 0.08);
          color: var(--primary);
          border-color: rgba(55, 138, 221, 0.15);
        }

        .company-metrics-summary-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          font-size: 0.875rem;
          color: var(--on-surface-variant);
          flex-wrap: wrap;
        }

        .card-metric-rating {
          font-weight: 600;
          color: var(--on-background);
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .star-filled-icon {
          color: #fbbf24;
          fill: #fbbf24;
        }

        .score-denominator, .stipend-denominator {
          color: var(--secondary);
          font-size: 0.75rem;
          font-weight: 500;
          margin-left: 0.15rem;
        }

        .card-metric-stipend {
          color: var(--on-background);
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 600;
        }

        .stipend-icon {
          color: var(--secondary);
        }

        .card-metric-location {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 500;
          color: var(--secondary);
        }

        .location-icon {
          color: var(--secondary);
        }

        .view-profile-btn {
          border: 1.5px solid var(--outline-variant);
          background-color: var(--surface);
          color: var(--on-background);
          font-size: 0.8125rem;
          font-weight: 700;
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-sm);
          flex-shrink: 0;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 2.5rem;
        }

        .view-profile-btn:hover {
          background-color: var(--primary);
          color: var(--on-primary);
          border-color: var(--primary);
          transform: translateY(-1px);
        }

        .empty-results-box {
          text-align: center;
          padding: 4rem 2rem;
          border: 2.5px dashed var(--outline-variant);
          border-radius: var(--radius-md);
          background-color: var(--surface);
        }

        /* PAGINATION */
        .pagination-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 3rem;
        }

        .pag-nav-btn, .pag-num-btn {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--secondary);
          background-color: var(--surface);
          border: 1.5px solid var(--outline-variant);
          transition: all 0.2s ease;
        }

        .pag-nav-btn:hover, .pag-num-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-container);
        }

        .pag-num-active {
          background-color: var(--primary);
          border-color: var(--primary);
          color: var(--on-primary) !important;
        }

        .pag-ellipsis {
          font-size: 0.875rem;
          color: var(--secondary);
          width: 2.25rem;
          text-align: center;
        }

        @media (max-width: 900px) {
          .browse-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .company-result-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          
          .view-profile-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
