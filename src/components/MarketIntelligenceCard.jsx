import React from "react";
import { TrendingUp, Award } from "lucide-react";

export default function MarketIntelligenceCard({ medianStipend = 6400, returnOfferRate = 81 }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/20 dark:border-slate-800/40 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl p-6 shadow-xl shadow-slate-100/50 dark:shadow-none transition-all duration-300 hover:border-blue-500/30">
      {/* Glow Effect */}
      <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Live Signals</span>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-0.5">Market Intelligence</h3>
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">Active</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl bg-white/30 dark:bg-slate-900/30 border border-white/30 dark:border-slate-800/50">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <TrendingUp size={16} />
            <span className="text-xs font-medium">Median Stipend</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              ${medianStipend.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">/mo</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl bg-white/30 dark:bg-slate-900/30 border border-white/30 dark:border-slate-800/50">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1">
            <Award size={16} />
            <span className="text-xs font-medium">Return Offers</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {returnOfferRate}%
            </span>
            <span className="text-xs text-emerald-500 font-semibold">↑ High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
