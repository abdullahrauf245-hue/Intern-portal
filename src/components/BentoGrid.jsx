import React from "react";
import MarketIntelligenceCard from "./MarketIntelligenceCard";
import LiveSearch from "./LiveSearch";

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      {/* Hero Welcome Card - Span 2 Columns */}
      <div className="md:col-span-2 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Precision Intelligence</h2>
          <p className="mt-2 text-blue-100 text-sm max-w-md">
            Review verified salaries, culture signals, and return offer conversions from tech and finance internships.
          </p>
        </div>
        <div className="mt-6">
          <LiveSearch />
        </div>
      </div>

      {/* Market Intelligence Widget - Span 1 Column */}
      <div className="md:col-span-1">
        <MarketIntelligenceCard />
      </div>

      {/* Quick Stats Grid Item */}
      <div className="md:col-span-1 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-6 shadow-sm">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Total reviews</h4>
        <p className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2">15,420</p>
        <span className="text-xs text-emerald-500 font-semibold mt-1 inline-block">↑ 12% vs last month</span>
      </div>

      {/* Active Hiring Status Item - Span 2 Columns */}
      <div className="md:col-span-2 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-6 shadow-sm flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Active Recruiting</h4>
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-1">
            Top investment banks and boutique advisory firms have opened applications.
          </p>
        </div>
        <button className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-sm transition-all shadow-md">
          Explore Openings
        </button>
      </div>
    </div>
  );
}
