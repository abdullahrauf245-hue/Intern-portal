import React, { createContext, useState, useEffect } from "react";
import { INITIAL_COMPANIES, INITIAL_ANALYTICS } from "../data/mockData";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem("internpulse_companies");
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });

  const [analytics, setAnalytics] = useState(() => {
    const saved = localStorage.getItem("internpulse_analytics");
    return saved ? JSON.parse(saved) : INITIAL_ANALYTICS;
  });

  useEffect(() => {
    localStorage.setItem("internpulse_companies", JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem("internpulse_analytics", JSON.stringify(analytics));
  }, [analytics]);

  const getCompanyById = (id) => {
    return companies.find((c) => c.id.toLowerCase() === id.toLowerCase());
  };

  const addReview = (companyId, review) => {
    setCompanies((prevCompanies) => {
      return prevCompanies.map((company) => {
        if (company.id.toLowerCase() === companyId.toLowerCase()) {
          const newReview = {
            id: `${company.id}-r${company.reviews.length + 1}`,
            role: review.role || "Software Engineering Intern",
            term: review.term || "Summer 2024",
            verified: true,
            rating: parseFloat(review.rating) || 5.0,
            pros: review.pros || "Great mentorship and structured project guidelines.",
            cons: review.cons || "The onboarding timeline was relatively compressed.",
            tags: review.tags || ["REACT", "CSS", "VANILLA"],
            date: new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            })
          };

          const updatedReviews = [newReview, ...company.reviews];
          const newCount = updatedReviews.length;

          // Re-calculate statistics
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newPulseScore = parseFloat((totalRating / newCount).toFixed(1));
          
          let newStipend = company.stipend;
          if (review.stipend && parseFloat(review.stipend) > 0) {
            const stipendReviews = updatedReviews.filter(r => r.stipendVal); // if they had stipend values, or compute:
            newStipend = Math.round(
              (company.stipend * (newCount - 1) + parseFloat(review.stipend)) / newCount
            );
          }

          // Random slight adjustments to represent interactive feedback scores
          const adjustScore = (val) => Math.min(100, Math.max(0, Math.round(val + (Math.random() * 4 - 2))));

          return {
            ...company,
            reviews: updatedReviews,
            satisfactionCount: newCount,
            pulseScore: newPulseScore,
            satisfaction: newPulseScore,
            stipend: newStipend,
            supportiveness: adjustScore(company.supportiveness),
            autonomy: adjustScore(company.autonomy),
            learningCurve: adjustScore(company.learningCurve),
            workLifeBalance: adjustScore(company.workLifeBalance)
          };
        }
        return company;
      });
    });

    // Update global analytics counts
    setAnalytics((prev) => ({
      ...prev,
      marketHealthScore: parseFloat((Math.min(100, prev.marketHealthScore + 0.1)).toFixed(1))
    }));
  };

  const registerNewCompany = (name, category) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existing = companies.find(c => c.id === id);
    if (existing) return id;

    const newCompany = {
      id,
      name,
      category: category || "Technology",
      tags: [category ? category.toUpperCase() : "TECHNOLOGY", "NEW"],
      pulseScore: 5.0,
      stipend: 5000,
      stipendTier: "Top 25% of industry",
      hours: 40,
      hoursTier: "Standard Intensity",
      returnOfferRate: 80,
      returnOfferTier: "Highly reliable path",
      satisfaction: 5.0,
      satisfactionCount: 0,
      supportiveness: 90,
      autonomy: 80,
      learningCurve: 85,
      workLifeBalance: 75,
      pulseInsight: `${name} has recently been registered on the InternPulse directory. Verify your email to share your active reviews.`,
      location: "San Francisco, CA",
      locations: ["San Francisco, CA"],
      hiringStatus: "Actively Reviewing Profiles",
      deadline: "December 31, 2024",
      website: `https://${id}.com`,
      logoColor: "#10b981",
      peers: ["stripe", "figma"],
      monthlyRatingPulse: [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
      reviews: []
    };

    setCompanies((prev) => [...prev, newCompany]);
    return id;
  };

  return (
    <StoreContext.Provider
      value={{
        companies,
        analytics,
        getCompanyById,
        addReview,
        registerNewCompany
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
