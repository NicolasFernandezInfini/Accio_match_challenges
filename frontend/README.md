# ACCIÓ Matchmaking Platform - Frontend

Frontend application for the ACCIÓ Matchmaking Platform built with React + TypeScript.

## Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Material-UI (MUI)** - Component Library
- **React Query** - Data Fetching & Caching
- **React Router** - Routing
- **Axios** - HTTP Client

## Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and set VITE_API_URL to your backend API URL

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api` |

## Development

The frontend runs on `http://localhost:5173` (Vite default) and connects to the backend API.

**Prerequisites:**
- Node.js 18+ and npm
- Backend API running (see backend README)

## Project Structure

```
src/
├── components/
│   ├── common/         # Reusable UI components (AccioCard, AccioBadge, etc.)
│   └── layout/         # Layout components (Header, Footer)
├── pages/              # Page components (HomePage, CompaniesPage, etc.)
├── services/           # API services (companies, challenges, matching, dashboard)
├── theme.ts            # Material-UI theme configuration
├── index.css           # Global styles and ACCIÓ design tokens
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Design System

The application implements the **ACCIÓ Catalonia Trade & Investment** visual identity:

### Colors
- **Primary (Beige ACCIÓ):** `#E6D7B8` - Brand signature color
- **Blue:** `#0066CC` - Primary actions and links
- **Neutral:** `#0A0A0A`, `#424242`, `#757575` - Text hierarchy
- **Semantic:** Success (green), Warning (amber), Error (red)

### Typography
- **Titles:** Helvetica Neue Bold/Black (800-900 weight)
- **Body:** Open Sans (400-700 weight)
- **Monospace:** Roboto Mono (400 weight)

### Components
- **AccioCard:** Reusable card with optional 4px beige "franja"
- **AccioBadge:** Status badges with semantic colors
- **AccioTag:** Chips for categories and filters
- **ProgressBar:** Animated progress bars with score-based gradients
- **LoadingSpinner:** Branded loading spinner

### Design Patterns
- Gradient headers with decorative elements
- 4px colored top border on cards (signature "franja")
- Hover effects with transform and shadows
- Score-based color gradients (85+ green, 70-84 lime, 50-69 amber, <50 orange)
- Smooth transitions with cubic-bezier easing

## Features

- **Company Management:** View, search, and manage technology provider companies
- **Challenge Management:** Create and manage innovation challenges with AI matching
- **AI Matching:** Execute AI-powered matching between challenges and companies
- **Results Visualization:** Detailed matching results with scores, explanations, and highlights
- **Dashboard:** Real-time statistics and recent activity
- **Real-time Updates:** Loading states and status tracking
- **Responsive Design:** Mobile-first, fully responsive UI
