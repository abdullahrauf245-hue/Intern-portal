# Product Requirements Document (PRD): InternPulse

## 1. Product Overview & Vision
**InternPulse** is a transparent, data-driven analytics platform designed to empower next-generation career seekers. By leveraging verified, high-fidelity crowd-sourced reports from internship participants, InternPulse aggregates market intelligence, stipend rates, qualitative workplace scores, and real-time trends. 

### Core Goals
- **Transparency**: Enable students to discover verified internship details, average stipends, working hours, and return offer rates.
- **Data Verifiability**: Establish robust authenticity via verified professional or educational emails, ensuring high-fidelity reviews.
- **Market Intelligence**: Provide real-time data on internship market health, geographic hotspots, and satisfaction indices.
- **Premium Aesthetics**: Recreate the beautiful, clean, modern UI designed in Google Stitch, featuring a light theme with vibrant HSL color accents, dark contrast cards, smooth animations, and rich visualization dashboards.

---

## 2. Core Pages & Feature Specifications

### 2.1 Landing Page (Home)
The landing page serves as the entry point, driving user engagement, instant discovery, and trust.

*   **Navigation Bar**:
    *   Left: Logo (`InternPulse` in a clean modern sans-serif typeface).
    *   Center: Links to `Browse`, `Compare`, `Salaries`, `Resources`.
    *   Right: Notification bell icon, user avatar button.
*   **Hero Section**:
    *   Live banner badge: `"• LIVE DATA FROM 2,400+ COMPANIES"` in a vibrant green capsule.
    *   Headline: `"Precision Analytics for Next-Gen Careers"` with high-contrast text and a modern italicized font accent on `Next-Gen Careers`.
    *   Subheadline: `"Transparent, data-driven insights into the world's leading internship programs. Make your next move with total confidence."`
    *   Unified Search Bar: A clean box allowing users to input search queries by company, role, or location. Includes a high-contrast `[Search Data]` dark action button.
    *   Trending Queries: Quick-clickable inline tags (e.g., `Quant Research`, `Product Design`, `AI Ethics`).
*   **Intelligence Hub Section**:
    *   Intro text: `"Curated segments based on high-fidelity user reports."` and a `"View all sectors ->"` action.
    *   Three prominent interactive curated cards:
        1.  **Top Rated**: Highlight satisfying programs with 4.8+ ratings. Features participant profile previews and a program counter capsule.
        2.  **High Stipend**: Dark, premium contrast card featuring average compensation stats (e.g., `AVG $9,500 / MO` badge).
        3.  **Remote Friendly**: Focuses on flexible and digital-first opportunities with global accessibility metrics.
*   **Methodology & Trust Section**:
    *   Explains verification processes (Direct pay-stub verification and multi-dimensional culture scoring).
    *   **Trust Metrics Grid**: Includes beautiful numeric displays:
        *   `98%` Data Accuracy
        *   `15k+` Reports Annually
        *   `240` Metrics Tracked
        *   `4.9/5` User Trust Score
    *   Floating Real-Time Indicator: A dynamic badge representing live data refresh ("Real-time Pulse: Updated 2 minutes ago").
*   **Social Proof & Partnerships**:
    *   Minimalist grayscale logo showcase of top universities supporting the ecosystem (e.g., `Stanford`, `MIT`, `Carnegie Mellon`, `INSEAD`, `TUM`).
*   **Footer**:
    *   Structured grid with platform links (Browse, Compare, Salaries, Methodology), legal terms (Privacy Policy, Terms of Service), support links, and social channel shortcuts (X, LinkedIn).

---

## 2.2 Browse & Search Page
An interactive search and filtering directory for discovering internship opportunities.

*   **Left Sidebar Filters**:
    *   **Industry Filters**: Checkboxes for `Technology` (active by default), `Finance`, `Consulting`, and `Media`, complete with a "Clear all" shortcut.
    *   **Monthly Stipend Slider**: Range controller going from `$0` to `$5,000+` with active bubble values.
    *   **Location Input**: Text input autocomplete for cities or remote options.
    *   **Pulse Score Selector**: Action buttons for rating filters (e.g., `3+`, `4+`, `4.5+` with HSL hover and selected states).
*   **Main Results List**:
    *   Dynamic headers: Displays total count (e.g., `"Showing 142 companies found"`).
    *   Sorting Dropdown: Order results by `Pulse Score` (default), `Stipend`, or `Satisfaction`.
    *   **Company Cards**: Detailed list cards featuring:
        *   Company Logo (with custom fallbacks or premium illustrations).
        *   Company Name & Category Badges (e.g., `Fintech`, `Remote Friendly`, `Travel`, `Luxury Perks`, `AI Research`).
        *   Pulse Score rating with star icon.
        *   Average monthly stipend badge (e.g., `$8,500 Avg. Monthly`).
        *   Primary Location badge.
        *   Direct interactive button: `[View Profile]`.
*   **Pagination Controls**:
    *   Sleek numbers layout with active indicator and previous/next arrow icons.

---

## 2.3 Market Intelligence Dashboard (Salaries / Analytics)
A premium analytical page providing high-fidelity overviews of global internship trends.

*   **Geographic Insights**:
    *   Title and description: `"Market Saturation, Stipend Volatility, and Satisfaction"`
    *   **Interactive Hotspots Map**: A beautiful vector-style world map illustrating where internships are active. Toggle features for `Global` and `US Only`.
    *   **Market Health Score Panel**: A circular or slider-based metrics gauge showing current market health score (e.g., `88.4 / 100`) accompanied by structural analysis summary text.
    *   **Industry Leaders Checklist**: A ranked view showing average pay for top sectors (e.g., `Tech & Software` at `$6.4k/mo`, `Finance` at `$5.8k/mo`, `Legal Services` at `$4.2k/mo`) with a secondary download action button.
*   **Stipend Trends**:
    *   Custom-curated area/line charts mapping average monthly compensation changes over the last 12 months, featuring dynamic labels and positive trend flags (`+8.4% YoY`).
*   **Satisfaction Index by Industry**:
    *   Horizontal bar charts rendering comparative scores across sectors (Design & Creative: `4.8`, Software Engineering: `4.5`, Marketing: `4.2`, etc.) with previous-year baselines.

---

## 2.4 Company Profile Page
A focused view detailing all reviews and structural metrics for a specific enterprise.

*   **Profile Overview Header**:
    *   Company identity block: Logo, Name (`TechStream Systems`), and Sector tags.
    *   Overall Rating Panel: Displaying overall Pulse Score (e.g., `4.2 / 5.0`) with visual HSL star-renderings and total volume count.
    *   Actions Panel: Quick shortcuts to `[Save Company]`, `[Compare Stats]`, and a prominent `[Write a Review]` CTA.
*   **High-Level Metric Cards**:
    *   Four micro-cards mapping:
        *   **Avg Stipend**: `$4,500/mo` (with context badge: `Top 5% of Industry`).
        *   **Avg Hours**: `42 hrs/wk` (context: `Moderate Intensity`).
        *   **Return Offer Rate**: `85%` (context: `Highly reliable path`).
        *   **Satisfaction**: `4.8 / 5` (context: `142 Verified Interns`).
*   **Culture & Growth Analysis Grid**:
    *   Horizontal bar graphs mapping internal facets: `Supportiveness` (92%), `Autonomy` (78%), `Learning Curve` (85%), `Work-Life Balance` (64%).
    *   **Pulse Insight Box**: Smart editorial text analyzing company strengths: *"TechStream excels in mentorship infrastructure. 88% of interns reported having weekly 1-on-1s..."*
*   **Review Timeline & Feedback Feed**:
    *   Sort and filter headers: Dropdowns to sort by `Most Recent`, `Highest Rating`, etc.
    *   **Review Cards**: Rich cards with:
        *   User avatar badge with metadata (e.g., `Software Engineering Intern`, `Summer 2023`, `Verified`).
        *   Star rating numeric label and stars.
        *   Split Pros/Cons texts:
            *   *Pros*: Clear description of work, stack, and mentor access.
            *   *Cons*: Notes on onboarding challenges or work-life balance.
        *   Tech and environment tags (e.g., `Python`, `Kubernetes`, `Rest`, `Remote-Friendly`).
*   **Sidebar Widgets**:
    *   **Hiring Status Card**: Real-time hiring announcements, deadlines, locations, and direct `[Apply on Company Site]` CTAs.
    *   **Peer Comparisons**: Quick navigation list comparison tool with rival scores.
    *   **12-Month Rating Pulse Chart**: Visualizing performance changes over the year.

---

## 2.5 Internship Review Form (Wizard)
A 3-step structured wizard form that maximizes user conversions while maintaining verification standards.

*   **Step Progress Bar**: Visual HSL track representing progress (e.g., `"Step 1 of 3: The Basics"`).
*   **Step 1 Form Fields**:
    *   **Role / Position**: Text input with active placeholders (`e.g., Software Engineer Intern`).
    *   **Company Name**: Auto-suggest input to look up and select organizations.
    *   **Duration**: Dropdown selector matching specific semesters (`Summer 2024`, `Fall 2024`, etc.).
    *   **Monthly Stipend (USD)**: Floating-label number input with custom currency visualizers.
*   **Trust Verification Note**: Info box notifying users that verified emails or pay-stubs receive an authenticity badge, enhancing transparency.
*   **Action Button**: Premium high-contrast `[Continue ->]` button with smooth hover translation.

---

## 3. Tech Stack & Engineering Decisions

### 3.1 Proposed Tech Stack
- **Framework**: **React (via Vite)**
  *   *Rationale*: A highly interactive single-page application structure fits best here to enable flawless page routing, smooth sliders, live charting, dynamic filtering, multi-step wizards, and immediate states.
- **Styling**: **Vanilla CSS (Custom CSS with CSS Variables)**
  *   *Rationale*: Maximizes flexibility, aligns with guidelines, and allows precise implementation of the Stitch aesthetic using premium variables (e.g., exact HSL colors, modern font tokens, glassmorphism filters).
- **Icons**: **Lucide React** or **React Icons**
  *   *Rationale*: Clean, modern vector icons matching the Stitch design.
- **Charts**: **Recharts** or **Chart.js** (via React-Chartjs-2)
  *   *Rationale*: Premium dynamic charting for stipend trends, culture indicators, and rating pulses.
- **Data Layer**: **Mock API Client**
  *   *Rationale*: Fully reactive client-side store containing seed data for the 142 companies, review threads, and market analytics, enabling lightning-fast updates, searches, and mock form submissions.

### 3.2 State Management & Routing
- **Routing**: **React Router DOM** or a custom state-based router.
  *   *Recommendation*: A clean React-based single-page router for instant transition animations and clean URLs.
- **Global State**: React Context API to manage user reviews list, compare metrics list, saved companies, notification system, and search states.

---

## 4. UI / Design Tokens (Vanilla CSS System)

To replicate the high-fidelity Google Stitch layout, the styling framework must utilize a unified CSS custom property system:

```css
:root {
  /* Color Palette */
  --bg-primary: #f9fafb;
  --bg-secondary: #ffffff;
  --bg-dark: #0f172a;
  
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  
  --brand-primary: #10b981;    /* Vibrant emerald for green accents */
  --brand-secondary: #059669;  /* Darker green for hover/active states */
  --brand-accent: #3b82f6;     /* Sleek blue for highlight indicators */
  
  --border-color: #e2e8f0;
  --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  --card-shadow-hover: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  
  /* Typography */
  --font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;
}
```

---

## 5. Verification & Testing Strategy

### 5.1 Automated Testing
*   **Component Testing**: Verification of calculations (e.g., average stipend calculation, Pulse Score weights).
*   **Router Testing**: Flawless navigation checks across all core dashboard views.
*   **Form Validation**: Ensuring review fields handle incorrect payloads, negative numbers, and incomplete fields gracefully.

### 5.2 Manual Verification
*   **Responsive Design Auditing**: Check aesthetics across desktop, tablet, and mobile layouts.
*   **Interactive Flow Checks**: Verify the 3-step review creation form, filter interactions, map marker overlays, and sidebar details.
