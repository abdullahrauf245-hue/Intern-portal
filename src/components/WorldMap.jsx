import React, { useState } from "react";
import { MapPin } from "lucide-react";

export default function WorldMap({ isGlobal, hotspots }) {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  // Stylized SVG coordinate mapping for world hotspots (x, y percentages in standard projection)
  const mapHotspots = [
    { id: "sf", name: "San Francisco, CA", x: 18, y: 38, count: 42, type: "US" },
    { id: "ny", name: "New York, NY", x: 26, y: 36, count: 28, type: "US" },
    { id: "lon", name: "London, UK", x: 47, y: 28, count: 18, type: "Global" },
    { id: "sg", name: "Singapore", x: 78, y: 64, count: 12, type: "Global" },
    { id: "blr", name: "Bengaluru, IN", x: 70, y: 52, count: 15, type: "Global" }
  ];

  const visibleHotspots = mapHotspots.filter(h => isGlobal || h.type === "US");

  return (
    <div className="worldmap-card">
      <div className="map-svg-container">
        <svg 
          viewBox="0 0 1000 500" 
          className="world-map-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Custom Stylized Landmass Paths (Vector Representation of World Continents) */}
          <g fill="#0b132b" opacity="0.08" stroke="#0b132b" strokeWidth="0.5">
            {/* North America */}
            <path d="M 80,100 L 150,80 L 220,120 L 280,140 L 250,220 L 180,240 L 140,210 L 120,220 L 100,160 Z" />
            {/* Greenland */}
            <path d="M 280,40 L 320,30 L 350,70 L 310,90 Z" />
            {/* South America */}
            <path d="M 220,260 L 270,280 L 280,330 L 250,440 L 230,440 L 200,320 Z" />
            {/* Europe */}
            <path d="M 440,110 L 490,100 L 530,130 L 510,200 L 460,200 L 430,150 Z" />
            {/* Africa */}
            <path d="M 430,220 L 510,210 L 560,260 L 570,320 L 530,390 L 500,390 L 460,290 L 420,240 Z" />
            {/* Asia */}
            <path d="M 520,90 L 680,60 L 850,110 L 890,200 L 800,330 L 720,320 L 660,250 L 530,210 Z" />
            {/* India */}
            <path d="M 680,220 L 720,230 L 700,280 Z" />
            {/* Southeast Asia & Indonesia */}
            <path d="M 760,280 L 810,310 L 800,340 Z" />
            {/* Australia */}
            <path d="M 800,360 L 880,370 L 890,420 L 820,430 Z" />
          </g>

          {/* Grid lines to make it look technical and high-fidelity */}
          <g stroke="#0b132b" strokeWidth="0.25" opacity="0.12" strokeDasharray="3,3">
            <line x1="0" y1="125" x2="1000" y2="125" />
            <line x1="0" y1="250" x2="1000" y2="250" />
            <line x1="0" y1="375" x2="1000" y2="375" />
            <line x1="200" y1="0" x2="200" y2="500" />
            <line x1="400" y1="0" x2="400" y2="500" />
            <line x1="600" y1="0" x2="600" y2="500" />
            <line x1="800" y1="0" x2="800" y2="500" />
          </g>

          {/* Glowing pins rendered dynamically */}
          {visibleHotspots.map((pin) => {
            const px = (pin.x * 1000) / 100;
            const py = (pin.y * 500) / 100;

            return (
              <g 
                key={pin.id} 
                className="map-marker-group"
                onMouseEnter={() => setHoveredHotspot(pin)}
                onMouseLeave={() => setHoveredHotspot(null)}
                style={{ cursor: "pointer" }}
              >
                {/* Outer animated ripple */}
                <circle 
                  cx={px} 
                  cy={py} 
                  r="14" 
                  fill="var(--brand-primary)" 
                  className="marker-ripple" 
                />
                {/* Inner steady pulse */}
                <circle 
                  cx={px} 
                  cy={py} 
                  r="6" 
                  fill="var(--brand-primary)" 
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="marker-dot"
                />
              </g>
            );
          })}
        </svg>

        {/* Floating details tooltip when a pin is hovered */}
        {hoveredHotspot && (
          <div 
            className="map-tooltip"
            style={{ 
              left: `${hoveredHotspot.x}%`, 
              top: `${hoveredHotspot.y}%` 
            }}
          >
            <div className="tooltip-title">{hoveredHotspot.name}</div>
            <div className="tooltip-stat">
              <span className="tooltip-num">{hoveredHotspot.count}</span> Active Internships
            </div>
            <div className="tooltip-badge">{hoveredHotspot.type === "US" ? "US Hub" : "Global Site"}</div>
          </div>
        )}
      </div>

      <style>{`
        .worldmap-card {
          width: 100%;
          height: 100%;
          min-height: 320px;
          background-color: var(--bg-primary);
          border-radius: var(--radius-sm);
          overflow: hidden;
          position: relative;
          border: 1px solid var(--text-primary);
          box-shadow: var(--shadow-lg);
        }

        .map-svg-container {
          width: 100%;
          height: 100%;
          position: relative;
          padding: 1rem;
        }

        .world-map-svg {
          width: 100%;
          height: 100%;
          max-height: 420px;
          display: block;
        }

        /* Hotspot Ripple animations */
        .marker-ripple {
          transform-origin: center;
          animation: rippleEffect 2s infinite ease-out;
          opacity: 0.4;
        }

        @keyframes rippleEffect {
          0% {
            r: 4px;
            opacity: 0.8;
          }
          100% {
            r: 20px;
            opacity: 0;
          }
        }

        .marker-dot {
          transition: transform 0.2s ease;
        }

        .map-marker-group:hover .marker-dot {
          transform: scale(1.3);
          fill: var(--brand-secondary);
        }

        .map-tooltip {
          position: absolute;
          transform: translate(-50%, -115%);
          background-color: var(--bg-secondary);
          border: 1px solid var(--text-primary);
          box-shadow: var(--shadow-lg);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          z-index: 10;
          width: 160px;
          pointer-events: none;
          animation: tooltipFadeIn 0.2s ease;
        }

        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -105%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -115%);
          }
        }

        .tooltip-title {
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .tooltip-stat {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .tooltip-num {
          font-weight: 700;
          color: var(--brand-secondary);
        }

        .tooltip-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          border: 1px solid var(--text-primary);
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
}
