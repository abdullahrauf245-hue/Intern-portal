import React, { useState, useContext, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Mail, Star, Sparkles } from "lucide-react";

export default function ReviewWizard() {
  const { companies, addReview, registerNewCompany } = useContext(StoreContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pre-fill company if passed via query params
  const queryCompanyId = searchParams.get("company") || "";
  const prefilledCompany = companies.find(c => c.id === queryCompanyId);

  // Wizard state machine step
  const [step, setStep] = useState(1);

  // Form states
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState(prefilledCompany ? prefilledCompany.name : "");
  const [duration, setDuration] = useState("Summer 2024");
  const [stipend, setStipend] = useState("");
  
  // Step 2 states
  const [rating, setRating] = useState(5);
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Step 3 states
  const [email, setEmail] = useState("");

  // Autocomplete dropdown matching pre-seeded company lookup
  const companySuggestions = useMemo(() => {
    if (!companyName || prefilledCompany) return [];
    return companies.filter(c => 
      c.name.toLowerCase().includes(companyName.toLowerCase()) &&
      c.name.toLowerCase() !== companyName.toLowerCase()
    );
  }, [companyName, companies, prefilledCompany]);

  // Skill tags pre-seed checklist
  const skillTagsOptions = ["PYTHON", "REACT", "KUBERNETES", "REST", "REMOTE-FRIENDLY", "JIRA", "AGILE", "PRODUCT STRATEGY", "TYPESCRIPT", "WEBGL"];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleNextStep = () => {
    if (step === 1 && (!role || !companyName || !stipend)) {
      alert("Please fill in all core fields to proceed.");
      return;
    }
    if (step === 2 && (!pros || !cons)) {
      alert("Please describe your primary Pros and Cons.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please provide an authentication email.");
      return;
    }

    // Register company if it's new, otherwise retrieve existing ID
    const targetCompanyId = await registerNewCompany(companyName, "Technology");

    if (!targetCompanyId) {
      alert("Failed to register company.");
      return;
    }

    // Build review payload
    const reviewPayload = {
      role,
      term: duration,
      rating: parseFloat(rating),
      stipend: parseFloat(stipend),
      pros,
      cons,
      tags: selectedTags.length > 0 ? selectedTags : ["REACT", "VANILLA", "CSS"]
    };

    // Commit to context
    await addReview(targetCompanyId, reviewPayload);

    // Redirect to the newly updated profile page!
    navigate(`/profile/${targetCompanyId}`);
  };

  return (
    <div className="wizard-layout-container">
      
      {/* progress monitor bar */}
      <div className="progress-monitor">
        <span className="wizard-category-label">REVIEW DOSSIER</span>
        <div className="progress-title-row">
          <h1 className="progress-step-headline">
            {step === 1 && "The Basics"}
            {step === 2 && "Culture & Feedback"}
            {step === 3 && "Verification"}
          </h1>
          <span className="step-fraction">Step {step} of 3</span>
        </div>

        {/* Visual tracking line */}
        <div className="progress-track-bar">
          <div 
            className="progress-track-fill animate-shimmer" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* FORM WIZARD CONTAINER */}
      <div className="form-wizard-card">
        
        {/* STEP 1: THE BASICS */}
        {step === 1 && (
          <div className="wizard-step-body animate-fade">
            
            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">Role / Position</label>
                <input 
                  type="text" 
                  placeholder="e.g. Software Engineer Intern"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group" style={{ position: "relative" }}>
                <label className="form-label">Company Name</label>
                <input 
                  type="text" 
                  placeholder="Search companies..."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="form-input"
                  disabled={!!prefilledCompany}
                  required
                />
                
                {/* Autocomplete suggestion popups */}
                {companySuggestions.length > 0 && (
                  <div className="suggestion-dropdown">
                    {companySuggestions.map((s) => (
                      <button 
                        key={s.id}
                        onClick={() => {
                          setCompanyName(s.name);
                        }}
                        className="suggestion-item"
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid-cols-2">
              <div className="form-group">
                <label className="form-label">Duration</label>
                <select 
                  value={duration} 
                  onChange={(e) => setDuration(e.target.value)}
                  className="form-input"
                >
                  <option value="Summer 2024">Summer 2024</option>
                  <option value="Fall 2024">Fall 2024</option>
                  <option value="Spring 2024">Spring 2024</option>
                  <option value="Summer 2023">Summer 2023</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Monthly Stipend (USD)</label>
                <div className="currency-input-wrapper">
                  <span className="currency-symbol">$</span>
                  <input 
                    type="number" 
                    placeholder="0.00" 
                    value={stipend}
                    onChange={(e) => setStipend(e.target.value)}
                    className="form-input currency-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Authenticity notice box */}
            <div className="verification-warning-box">
              <ShieldCheck size={18} className="warning-shield-icon" />
              <p className="warning-text">
                Verified internships receive a badge of authenticity. We recommend using your company email for a 1-click verification.
              </p>
            </div>

            <div className="wizard-actions-row justify-end">
              <button onClick={handleNextStep} className="btn btn-primary btn-icon-right ripple-effect click-squish">
                Continue <ArrowRight size={16} />
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: CULTURE & FEEDBACK */}
        {step === 2 && (
          <div className="wizard-step-body animate-fade">
            
            <div className="form-group">
              <label className="form-label">Overall Rating</label>
              <div className="stars-selector-row">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button 
                    key={val} 
                    type="button" 
                    onClick={() => setRating(val)}
                    className="star-selection-btn"
                  >
                    <Star 
                      size={24} 
                      className={val <= rating ? "star-icon-filled animate-scale-bounce" : "star-icon-empty"}
                      style={{ animationDelay: `${val * 60}ms` }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Pros</label>
              <textarea 
                rows="3"
                placeholder="What was the best part? Describe the mentorship, tech stack, and workplace culture..."
                value={pros}
                onChange={(e) => setPros(e.target.value)}
                className="form-input text-area-input"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Cons</label>
              <textarea 
                rows="3"
                placeholder="What were the biggest challenges? (e.g. long working hours, lack of return offer visibility...)"
                value={cons}
                onChange={(e) => setCons(e.target.value)}
                className="form-input text-area-input"
                required
              ></textarea>
            </div>

            {/* Tags selection checklist */}
            <div className="form-group">
              <label className="form-label">Skills & Perks Tags</label>
              <div className="skills-checklist-grid">
                {skillTagsOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`skill-tag-check-btn hover-scale click-squish ${selectedTags.includes(tag) ? "skill-tag-active" : ""}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="wizard-actions-row justify-between">
              <button onClick={handlePrevStep} className="btn btn-outline">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={handleNextStep} className="btn btn-primary btn-icon-right">
                Continue <ArrowRight size={16} />
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: AUTHENTICATION */}
        {step === 3 && (
          <div className="wizard-step-body animate-fade">
            
            <div className="auth-central-graphic">
              <Mail size={42} className="auth-mail-icon" />
              <h3 className="auth-main-headline">Verification</h3>
              <p className="auth-sub-narrative">
                To keep InternPulse reports 100% verified and maintain data integrity, we recommend adding your professional email.
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Workplace or University Email</label>
              <input 
                type="email" 
                placeholder="e.g. intern@stripe.com or student@stanford.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="security-notice-callout">
              <Sparkles size={14} className="security-sparkle" />
              <span>We never show your email address to employers or public profiles. Privacy guaranteed.</span>
            </div>

            <div className="wizard-actions-row justify-between">
              <button onClick={handlePrevStep} className="btn btn-outline">
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={handleSubmit} className="btn btn-success ripple-effect click-squish">
                Submit Review <CheckCircle2 size={16} />
              </button>
            </div>

          </div>
        )}

      </div>

      <style>{`
        .wizard-layout-container {
          width: 100%;
          max-width: 36rem;
          margin: 2rem auto 4rem auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* PROGRESS TRACKING */
        .progress-monitor {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .wizard-category-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--secondary);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .progress-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .progress-step-headline {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--on-background);
          line-height: 1.1;
        }

        .step-fraction {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--secondary);
        }

        .progress-track-bar {
          width: 100%;
          height: 6px;
          background-color: var(--surface-container-high);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-top: 0.25rem;
        }

        .progress-track-fill {
          height: 100%;
          background-color: var(--primary);
          border-radius: var(--radius-full);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* CARD STYLING */
        .form-wizard-card {
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-md);
          padding: 2.5rem;
          box-shadow: var(--card-shadow);
        }

        .wizard-step-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* AUTOCOMPLETE SUGGESTIONS */
        .suggestion-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-sm);
          z-index: 10;
          margin-top: 0.25rem;
          max-height: 150px;
          overflow-y: auto;
          box-shadow: var(--card-shadow-hover);
        }

        .suggestion-item {
          width: 100%;
          text-align: left;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          color: var(--on-surface-variant);
          font-weight: 500;
          transition: all 0.15s ease;
        }

        .suggestion-item:hover {
          background-color: var(--primary-container);
          color: var(--primary);
        }

        /* CURRENCY VISUAL */
        .currency-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .currency-symbol {
          position: absolute;
          left: 1rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--secondary);
        }

        .currency-input {
          padding-left: 2rem !important;
        }

        /* WARNING BOX */
        .verification-warning-box {
          background-color: var(--primary-container);
          border: 1px solid rgba(55, 138, 221, 0.15);
          border-radius: var(--radius-sm);
          padding: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 0.875rem;
        }

        .warning-shield-icon {
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .warning-text {
          font-size: 0.875rem;
          color: var(--on-primary-container);
          line-height: 1.5;
        }

        /* STEP 2 STARS SELECTOR */
        .stars-selector-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }

        .star-selection-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .star-selection-btn:hover {
          transform: scale(1.15);
        }

        .star-icon-filled {
          color: #fbbf24;
          fill: #fbbf24;
        }

        .star-icon-empty {
          color: var(--surface-container-highest);
        }

        .text-area-input {
          resize: none;
          min-height: 6rem;
          padding: 0.75rem 1rem;
        }

        .skills-checklist-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .skill-tag-check-btn {
          border: 1px solid var(--outline-variant);
          background-color: var(--surface);
          color: var(--on-surface-variant);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          text-align: left;
          transition: all 0.2s ease;
          text-transform: uppercase;
        }

        .skill-tag-check-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-container);
        }

        .skill-tag-active {
          background-color: var(--primary);
          border-color: var(--primary);
          color: var(--on-primary);
        }

        /* STEP 3 GRAPHIC */
        .auth-central-graphic {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .auth-mail-icon {
          color: var(--primary);
          background-color: var(--primary-container);
          border: 1px solid rgba(55, 138, 221, 0.15);
          padding: 0.625rem;
          width: 3.5rem;
          height: 3.5rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-main-headline {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--on-background);
        }

        .auth-sub-narrative {
          font-size: 0.875rem;
          color: var(--secondary);
          line-height: 1.6;
          max-width: 24rem;
        }

        .security-notice-callout {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8125rem;
          color: var(--secondary);
          background-color: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          padding: 0.625rem 1rem;
          border-radius: var(--radius-sm);
        }

        .security-sparkle {
          color: var(--primary);
        }

        /* HELPERS */
        .wizard-actions-row {
          display: flex;
          align-items: center;
          margin-top: 1.5rem;
        }

        .justify-end { justify-content: flex-end; }
        .justify-between { justify-content: space-between; }

        .btn-icon-right {
          gap: 0.375rem;
        }

        .animate-fade {
          animation: cascadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeTransition {
          from {
            opacity: 0;
            transform: translateY(8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
