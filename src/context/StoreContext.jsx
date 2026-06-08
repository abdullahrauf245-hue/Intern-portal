import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { INITIAL_ANALYTICS } from "../data/mockData";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [analytics, setAnalytics] = useState(INITIAL_ANALYTICS);
  const [loading, setLoading] = useState(true);

  // Map snake_case database object to camelCase frontend object
  const mapCompanyFromDb = (c) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    tags: c.tags || [],
    pulseScore: parseFloat(c.pulse_score) || 5.0,
    stipend: parseFloat(c.stipend) || 0,
    stipendTier: c.stipend_tier,
    hours: parseFloat(c.hours) || 40,
    hoursTier: c.hours_tier,
    returnOfferRate: parseFloat(c.return_offer_rate) || 0,
    returnOfferTier: c.return_offer_tier,
    satisfaction: parseFloat(c.satisfaction) || 5.0,
    satisfactionCount: parseInt(c.satisfaction_count) || 0,
    supportiveness: parseInt(c.supportiveness) || 100,
    autonomy: parseInt(c.autonomy) || 100,
    learningCurve: parseInt(c.learning_curve) || 100,
    workLifeBalance: parseInt(c.work_life_balance) || 100,
    pulseInsight: c.pulse_insight,
    location: c.location,
    locations: c.locations || [],
    hiringStatus: c.hiring_status,
    deadline: c.deadline,
    website: c.website,
    logoColor: c.logo_color,
    peers: c.peers || [],
    monthlyRatingPulse: c.monthly_rating_pulse || [],
    reviews: (c.reviews || []).map(r => ({
      id: r.id,
      role: r.role,
      term: r.term,
      verified: r.verified,
      rating: parseFloat(r.rating) || 5.0,
      stipend: r.stipend,
      hours: r.hours,
      pros: r.pros,
      cons: r.cons,
      tags: r.tags || [],
      date: r.created_at ? new Date(r.created_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }) : new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    }))
  });

  // Map camelCase frontend object to snake_case database object
  const mapCompanyToDb = (c) => ({
    id: c.id,
    name: c.name,
    category: c.category,
    tags: c.tags,
    pulse_score: c.pulseScore,
    stipend: c.stipend,
    stipend_tier: c.stipendTier,
    hours: c.hours,
    hours_tier: c.hoursTier,
    return_offer_rate: c.returnOfferRate,
    return_offer_tier: c.returnOfferTier,
    satisfaction: c.satisfaction,
    satisfaction_count: c.satisfactionCount,
    supportiveness: c.supportiveness,
    autonomy: c.autonomy,
    learning_curve: c.learningCurve,
    work_life_balance: c.workLifeBalance,
    pulse_insight: c.pulseInsight,
    location: c.location,
    locations: c.locations,
    hiring_status: c.hiringStatus,
    deadline: c.deadline,
    website: c.website,
    logo_color: c.logoColor,
    peers: c.peers,
    monthly_rating_pulse: c.monthlyRatingPulse
  });

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      // Fetch companies with nested reviews relation
      const { data, error } = await supabase
        .from("companies")
        .select(`
          *,
          reviews (*)
        `);

      if (error) {
        console.error("Error fetching companies from Supabase:", error);
      } else if (data) {
        // Sort reviews descending by date/creation inside map
        const mappedData = data.map(mapCompanyFromDb);
        // Sort reviews to have latest reviews first
        mappedData.forEach(comp => {
          comp.reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        });
        setCompanies(mappedData);
      }
    } catch (err) {
      console.error("Fetch companies failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const getCompanyById = (id) => {
    return companies.find((c) => c.id.toLowerCase() === id.toLowerCase());
  };

  const addReview = async (companyId, review) => {
    const company = companies.find((c) => c.id.toLowerCase() === companyId.toLowerCase());
    if (!company) return;

    const newReview = {
      role: review.role || "Software Engineering Intern",
      term: review.term || "Summer 2024",
      verified: true,
      rating: parseFloat(review.rating) || 5.0,
      stipend: review.stipend ? parseFloat(review.stipend) : null,
      hours: review.hours ? parseFloat(review.hours) : null,
      pros: review.pros || "Great mentorship and structured project guidelines.",
      cons: review.cons || "The onboarding timeline was relatively compressed.",
      tags: review.tags || ["REACT", "CSS", "VANILLA"]
    };

    // 1. Insert review into Supabase
    const { data: insertedReview, error: reviewError } = await supabase
      .from("reviews")
      .insert([
        {
          company_id: companyId,
          role: newReview.role,
          term: newReview.term,
          verified: newReview.verified,
          rating: newReview.rating,
          stipend: newReview.stipend,
          hours: newReview.hours,
          pros: newReview.pros,
          cons: newReview.cons,
          tags: newReview.tags
        }
      ])
      .select();

    if (reviewError) {
      console.error("Error adding review to Supabase:", reviewError);
      return;
    }

    // 2. Recalculate company metrics locally
    const currentReviews = [
      {
        ...newReview,
        id: insertedReview[0].id,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        })
      },
      ...company.reviews
    ];
    const newCount = currentReviews.length;
    const totalRating = currentReviews.reduce((sum, r) => sum + r.rating, 0);
    const newPulseScore = parseFloat((totalRating / newCount).toFixed(1));

    let newStipend = company.stipend;
    const stipendReviews = currentReviews.filter(r => r.stipend && parseFloat(r.stipend) > 0);
    if (stipendReviews.length > 0) {
      const totalStipend = stipendReviews.reduce((sum, r) => sum + parseFloat(r.stipend), 0);
      newStipend = Math.round(totalStipend / stipendReviews.length);
    }

    let newHours = company.hours;
    const hoursReviews = currentReviews.filter(r => r.hours && parseFloat(r.hours) > 0);
    if (hoursReviews.length > 0) {
      const totalHours = hoursReviews.reduce((sum, r) => sum + parseFloat(r.hours), 0);
      newHours = Math.round(totalHours / hoursReviews.length);
    }

    const adjustScore = (val) => Math.min(100, Math.max(0, Math.round(val + (Math.random() * 4 - 2))));

    const updatedCompany = {
      ...company,
      pulseScore: newPulseScore,
      satisfaction: newPulseScore,
      satisfactionCount: newCount,
      stipend: newStipend,
      hours: newHours,
      supportiveness: adjustScore(company.supportiveness),
      autonomy: adjustScore(company.autonomy),
      learningCurve: adjustScore(company.learningCurve),
      workLifeBalance: adjustScore(company.workLifeBalance)
    };

    // 3. Update company metrics in Supabase
    const { error: companyError } = await supabase
      .from("companies")
      .update(mapCompanyToDb(updatedCompany))
      .eq("id", companyId);

    if (companyError) {
      console.error("Error updating company metrics on Supabase:", companyError);
    }

    // 4. Update global analytics counts
    setAnalytics((prev) => ({
      ...prev,
      marketHealthScore: parseFloat((Math.min(100, prev.marketHealthScore + 0.1)).toFixed(1))
    }));

    // 5. Refresh local state
    await fetchCompanies();
  };

  const registerNewCompany = async (name, category) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const existing = companies.find(c => c.id === id);
    if (existing) return id;

    const newCompany = {
      id,
      name,
      category: category || "Technology",
      tags: [category ? category.toUpperCase() : "TECHNOLOGY", "NEW"],
      pulseScore: 5.0,
      stipend: 40000,
      stipendTier: "Average",
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
      location: "NUST H-12, Islamabad",
      locations: ["Islamabad, Pakistan"],
      hiringStatus: "Actively Reviewing Profiles",
      deadline: "December 31, 2026",
      website: `https://${id}.com`,
      logoColor: "#10b981",
      peers: [],
      monthlyRatingPulse: [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0]
    };

    const { error } = await supabase
      .from("companies")
      .insert([mapCompanyToDb(newCompany)]);

    if (error) {
      console.error("Error registering company on Supabase:", error);
      return null;
    }

    await fetchCompanies();
    return id;
  };

  return (
    <StoreContext.Provider
      value={{
        companies,
        analytics,
        loading,
        getCompanyById,
        addReview,
        registerNewCompany,
        refreshData: fetchCompanies
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
