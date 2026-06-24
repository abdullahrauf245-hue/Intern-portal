import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Search, Loader2, Building, Briefcase } from "lucide-react";

export default function LiveSearch() {
  const { companies } = useContext(StoreContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    const delayDebounce = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const filtered = companies
        .filter((c) => {
          const matchName = c.name.toLowerCase().includes(lowerQuery);
          const matchCategory = c.category.toLowerCase().includes(lowerQuery);
          const matchTag = c.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
          const matchRole = c.reviews.some((r) =>
            r.role.toLowerCase().includes(lowerQuery)
          );
          return matchName || matchCategory || matchTag || matchRole;
        })
        .slice(0, 6)
        .map((c) => {
          const matchingReview = c.reviews.find((r) =>
            r.role.toLowerCase().includes(lowerQuery)
          );
          return {
            id: c.id,
            company_name: c.name,
            role: matchingReview ? matchingReview.role : (c.reviews[0]?.role || "Internship Program")
          };
        });

      setResults(filtered);
      setIsOpen(true);
      setLoading(false);
    }, 150);

    return () => clearTimeout(delayDebounce);
  }, [query, companies]);

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <div className="relative flex items-center">
        <Search className="absolute left-3 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search companies or roles..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        />
        {loading && (
          <Loader2 className="absolute right-3 w-5 h-5 text-slate-400 animate-spin" />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg shadow-xl overflow-hidden">
          <ul className="py-2 divide-y divide-slate-100 dark:divide-slate-900">
            {results.map((item) => (
              <li key={item.id}>
                <a
                  href={`/profile/${item.id}`}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900">
                    <Building size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {item.company_name}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Briefcase size={12} />
                      {item.role}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
