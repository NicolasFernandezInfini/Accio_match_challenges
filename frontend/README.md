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

# Start development server
npm run dev

# Build for production
npm run build
```

## Development

The frontend runs on `http://localhost:3000` and proxies API requests to `http://localhost:8000`.

## Project Structure

```
src/
├── components/     # Reusable components
├── services/       # API services
├── types/          # TypeScript types
├── utils/          # Utility functions
├── App.tsx         # Main app component
└── main.tsx        # Entry point
```

## Features

- Company management
- Challenge creation and management
- Matching results visualization
- Document upload and processing
- Real-time matching status updates
