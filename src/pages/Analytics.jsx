import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import WorldMap from "../components/WorldMap";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUpRight, Award, Compass, FileText, BarChart2 } from "lucide-react";

export default function Analytics() {
  const { analytics } = useContext(StoreContext);
  const [isGlobal, setIsGlobal] = useState(true);

  // Formatting helper for currency values
  const formatCurrency = (val) => `$${val.toLocaleString()}`;

  return (
    <div className="analytics-page-layout">
      
      {/* HEADER SECTION */}
      <section className="analytics-header">
        <h1 className="analytics-title">Market Ledger</h1>
        <p className="analytics-subtitle">
          High-trust signals on internship saturation, stipend volatility, and qualitative satisfaction across global markets.
        </p>
      </section>

      {/* MAP & SATURATION SEGMENT */}
      <section className="map-analytics-section">
        
        {/* Hotspots World Map Container */}
        <div className="map-visualizer-container">
          <div className="map-controls-row">
            <h3 className="container-card-title">Internship Hotspots</h3>
            <div className="map-toggle-buttons">
              <button 
                onClick={() => setIsGlobal(true)}
                className={`toggle-btn ${isGlobal ? "toggle-btn-active" : ""}`}
              >
                Global
              </button>
              <button 
                onClick={() => setIsGlobal(false)}
                className={`toggle-btn ${!isGlobal ? "toggle-btn-active" : ""}`}
              >
                US Only
              </button>
            </div>
          </div>
          
          <div className="map-wrapper-box">
            <WorldMap isGlobal={isGlobal} hotspots={analytics.hotspots} />
            <div className="live-badge-overlay">
              <span className="live-glow-dot"></span> SATURATION FEED
            </div>
          </div>
        </div>

        {/* Side Panel: Health Score & Leaders */}
        <div className="market-side-panel">
          
          {/* Health Score Card */}
          <div className="health-score-card">
            <span className="health-tag">MARKET HEALTH INDEX</span>
            <div className="health-value-block">
              <span className="health-score-num">{analytics.marketHealthScore}</span>
              <span className="health-score-denominator">/100</span>
            </div>
            
            {/* Custom styled track bar */}
            <div className="health-progress-bar-track">
              <div 
                className="health-progress-bar-fill"
                style={{ width: `${analytics.marketHealthScore}%` }}
              ></div>
            </div>

            <p className="health-narrative-text">
              The global internship market shows robust resilience despite macroeconomic shifts, led by strong Tech & Legal demand.
            </p>
          </div>

          {/* Industry Leaders Card */}
          <div className="industry-leaders-card">
            <h4 className="leaders-card-title">Industry Leaders</h4>
            
            <div className="leaders-list">
              {analytics.industryLeaders.map((lead, idx) => (
                <div key={idx} className="leader-item">
                  <div className="leader-left-block">
                    <div className="leader-icon-marker">
                      <Compass size={14} />
                    </div>
                    <span className="leader-name">{lead.name}</span>
                  </div>
                  <span className="leader-stipend-val">{lead.stipend}<span className="mo-label">/mo</span></span>
                </div>
              ))}
            </div>

            <button className="download-report-btn">
              <FileText size={16} /> DOWNLOAD REPORT
            </button>
          </div>

        </div>

      </section>

      {/* TRENDS & BAR COMPARISONS GRID */}
      <section className="charts-trends-grid">
        
        {/* Stipend Trend Area Chart */}
        <div className="trend-chart-card">
          <div className="chart-header-row">
            <div>
              <h3 className="container-card-title">Stipend Trend</h3>
              <p className="chart-card-subtitle">Average monthly compensation (last 12 months)</p>
            </div>
            <span className="yoy-badge">
              <ArrowUpRight size={14} /> +8.4% YoY
            </span>
          </div>

          <div className="recharts-container-wrapper">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart 
                data={analytics.stipendTrends}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorStipend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 600 }} 
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={formatCurrency}
                  tick={{ fill: "var(--text-muted)", fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value), "Avg Stipend"]}
                  contentStyle={{ 
                    backgroundColor: "var(--bg-secondary)", 
                    border: "1px solid var(--border-heavy)",
                    borderRadius: "var(--radius-sm)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="stipend" 
                  stroke="var(--brand-secondary)" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorStipend)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Satisfaction Index Bar Grid */}
        <div className="satisfaction-index-card">
          <div className="chart-header-row">
            <div>
              <h3 className="container-card-title">Satisfaction by Industry</h3>
              <p className="chart-card-subtitle">Quantifying the qualitative intern experience</p>
            </div>
          </div>

          <div className="satisfaction-bars-list">
            {analytics.satisfactionByIndustry.map((item, idx) => (
              <div key={idx} className="satisfaction-bar-row">
                <div className="bar-labels-row">
                  <span className="bar-industry-name">{item.industry}</span>
                  <span className="bar-score-val">{item.score.toFixed(1)}</span>
                </div>
                
                {/* Horizontal comparative progress bars */}
                <div className="bar-track-visual">
                  <div 
                    className="bar-fill-current"
                    style={{ width: `${(item.score / 5.0) * 100}%` }}
                    title={`Current Year: ${item.score}`}
                  ></div>
                  <div 
                    className="bar-fill-baseline"
                    style={{ width: `${(item.lastYear / 5.0) * 100}%` }}
                    title={`Last Year: ${item.lastYear}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="charts-legend-row">
            <div className="legend-item">
              <span className="legend-color-box current-color"></span> Current Year
            </div>
            <div className="legend-item">
              <span className="legend-color-box lastyear-color"></span> Last Year Avg.
            </div>
          </div>
        </div>

      </section>

      <style>{`
        .analytics-page-layout {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          width: 100%;
        }

        /* HEADER */
        .analytics-header {
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 1rem;
        }

        .analytics-title {
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
          color: var(--primary);
        }

        .analytics-subtitle {
          font-size: 0.875rem;
          color: var(--secondary);
          max-width: 38rem;
          line-height: 1.5;
        }

        /* MAP SECTION */
        .map-analytics-section {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 2rem;
        }

        .map-visualizer-container {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .map-controls-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .container-card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--primary);
        }

        .map-toggle-buttons {
          display: flex;
          align-items: center;
          background-color: var(--surface-container-low);
          padding: 0.1875rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--outline-variant);
        }

        .toggle-btn {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--secondary);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          transition: all 0.1s ease;
        }

        .toggle-btn-active {
          background-color: var(--surface);
          color: var(--primary);
          border: 1px solid var(--outline-variant);
        }

        .map-wrapper-box {
          position: relative;
          width: 100%;
        }

        .live-badge-overlay {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          color: var(--secondary);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .live-glow-dot {
          width: 6px;
          height: 6px;
          background-color: var(--success);
          border-radius: var(--radius-full);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        /* SIDE PANEL */
        .market-side-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .health-score-card {
          background-color: var(--primary);
          color: var(--on-primary);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .health-tag {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--on-primary-container);
          text-transform: uppercase;
        }

        .health-value-block {
          display: flex;
          align-items: flex-end;
          line-height: 1;
        }

        .health-score-num {
          font-size: 3rem;
          font-weight: 600;
          letter-spacing: -0.03em;
        }

        .health-score-denominator {
          font-size: 0.875rem;
          color: var(--on-primary-container);
          margin-bottom: 0.375rem;
          margin-left: 0.25rem;
        }

        .health-progress-bar-track {
          width: 100%;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .health-progress-bar-fill {
          height: 100%;
          background-color: var(--on-primary);
          border-radius: var(--radius-full);
        }

        .health-narrative-text {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }

        .industry-leaders-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          flex: 1;
        }

        .leaders-card-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--primary);
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .leaders-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .leader-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .leader-left-block {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .leader-icon-marker {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: var(--radius-sm);
          background-color: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          color: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .leader-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--primary);
        }

        .leader-stipend-val {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--primary);
        }

        .mo-label {
          font-size: 0.75rem;
          color: var(--secondary);
          font-weight: 400;
        }

        .download-report-btn {
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.5rem 0;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
          transition: all 0.15s ease;
          height: 2.25rem;
        }

        .download-report-btn:hover {
          background-color: var(--surface-container-low);
          border-color: var(--outline);
        }

        /* CHARTS GRID */
        .charts-trends-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .trend-chart-card, .satisfaction-index-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .chart-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .chart-card-subtitle {
          font-size: 0.8125rem;
          color: var(--secondary);
          margin-top: 0.125rem;
        }

        .yoy-badge {
          font-size: 0.75rem;
          font-weight: 500;
          background-color: rgba(16, 185, 129, 0.08);
          color: var(--success);
          border: 1px solid rgba(16, 185, 129, 0.15);
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .recharts-container-wrapper {
          width: 100%;
          height: 240px;
        }

        /* SATISFACTION BARS */
        .satisfaction-bars-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .satisfaction-bar-row {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }

        .bar-labels-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .bar-industry-name {
          color: var(--primary);
        }

        .bar-score-val {
          color: var(--primary);
          font-weight: 600;
        }

        .bar-track-visual {
          width: 100%;
          height: 8px;
          background-color: var(--surface-container-low);
          border-radius: var(--radius-full);
          position: relative;
          overflow: hidden;
          border: 1px solid var(--outline-variant);
        }

        .bar-fill-current {
          height: 100%;
          background-color: var(--primary);
          border-radius: var(--radius-full);
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .bar-fill-baseline {
          height: 100%;
          background-color: var(--outline-variant);
          border-radius: var(--radius-full);
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          opacity: 0.5;
        }

        .charts-legend-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: auto;
          font-size: 0.75rem;
          color: var(--secondary);
          font-weight: 500;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        .legend-color-box {
          width: 8px;
          height: 8px;
          border-radius: var(--radius-sm);
        }

        .current-color { background-color: var(--primary); }
        .lastyear-color { background-color: var(--outline-variant); }

        @media (max-width: 900px) {
          .map-analytics-section {
            grid-template-columns: 1fr;
          }
          
          .charts-trends-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
