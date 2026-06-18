import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * PageTransition — wraps page content with entrance animations 
 * triggered on route change. Each page gets a smooth fade-up-blur entrance.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Reset and trigger the entrance animation
    el.style.animation = "none";
    // Force reflow
    void el.offsetHeight;
    el.style.animation = "";

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div ref={wrapperRef} className="page-enter">
      {children}
    </div>
  );
}
