# InternPulse - Intern Rating Portal

InternPulse is a data-driven internship analytics portal with rich browsing, market intelligence dashboards, and a multi-step review wizard. The UI emphasizes clean typography, premium cards, and a light theme with bold emerald accents.

## Overview
InternPulse helps students explore verified internship programs, compare companies, and submit structured reviews that update live metrics. The app is fully client-side, backed by seeded mock data and localStorage persistence.

## Key Features
- Search and filter internships by category, stipend, location, and pulse score.
- Analytics dashboard with a world hotspot map and trend charts.
- Company profiles with culture metrics, review feeds, and peer comparisons.
- 3-step review wizard that updates scores and persists data locally.

## Tech Stack
- React + Vite
- React Router
- Recharts
- Lucide React
- Vanilla CSS with design tokens

## Getting Started
1. Install dependencies:
	```bash
	npm install
	```
2. Start the dev server:
	```bash
	npm run dev
	```
3. Build for production:
	```bash
	npm run build
	```
4. Preview the production build:
	```bash
	npm run preview
	```
5. Lint the project:
	```bash
	npm run lint
	```

## Routes
- `/` - Landing page
- `/browse` - Directory and filters
- `/compare` - Alias to browse
- `/analytics` - Market intelligence dashboard
- `/resources` - Alias to analytics
- `/profile/:id` - Company profile
- `/submit-review` - Review wizard

## Data and State
- Seed data is defined in the mock data module and loaded into context on first run.
- Runtime updates are stored in localStorage under `internpulse_companies` and `internpulse_analytics`.
- Clearing localStorage resets the app to the seeded dataset.

## Data Model
The core schema mirrors the PRD/TRD and focuses on companies, reviews, and analytics.

- Company: identity, category tags, pulse score, stipend stats, culture scores, locations, and review list.
- Review: role, term, verified flag, rating, pros/cons, tags, and submission date.
- Analytics: market health score, industry leaders, stipend trend series, satisfaction by industry, and hotspot metadata.

## Project Structure
```text
src/
  components/     # Reusable UI sections
  context/        # Global state provider
  data/           # Seed data and analytics fixtures
  pages/          # Route-level screens
  App.jsx         # Routes and layout shell
  main.jsx        # React entry
  index.css       # Design tokens and global styles
```
