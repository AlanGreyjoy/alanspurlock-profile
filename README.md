# Alan Spurlock - Personal Website

[![CI](https://github.com/AlanGreyjoy/alanspurlock-profile/actions/workflows/ci.yml/badge.svg)](https://github.com/AlanGreyjoy/alanspurlock-profile/actions/workflows/ci.yml)
[![Deploy to Railway](https://github.com/AlanGreyjoy/alanspurlock-profile/actions/workflows/deploy-railway.yml/badge.svg)](https://github.com/AlanGreyjoy/alanspurlock-profile/actions/workflows/deploy-railway.yml)

My personal website, portfolio, and resume — plus whatever random stuff I want to throw on it.

## Tech Stack

- **Monorepo**: [Nx](https://nx.dev) with [pnpm](https://pnpm.io)
- **Frontend**: React 19, Vite, TypeScript
- **Styling**: TailwindCSS, Radix UI
- **Animations**: Framer Motion, React Three Fiber
- **Backend**: NestJS
- **Component Library**: Spurlock UI (custom, with Storybook)

## Project Structure

```
apps/
├── frontend/       # Main React application
└── api-gateway/    # NestJS backend API

libs/
└── spurlock-ui/    # Reusable component library
```

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm 10+

### Installation

```sh
pnpm install
```

### Development

```sh
# Start the frontend dev server
pnpm dev

# Start the API gateway
pnpm dev:api

# Run Storybook for the component library
pnpm storybook
```

### Build

```sh
# Build the frontend
pnpm build

# Build the API gateway
pnpm build:api

# Build Storybook
pnpm build:storybook
```

### Linting

```sh
pnpm lint
```

### Visualize the Project Graph

```sh
pnpm graph
```

## Nx Commands

You can also run Nx commands directly:

```sh
# Run any target on a project
pnpm exec nx <target> <project-name>

# Examples
pnpm exec nx serve frontend
pnpm exec nx build api-gateway
pnpm exec nx storybook spurlock-ui
```

## CI/CD

This project uses GitHub Actions for continuous integration and deployment with three optimized workflows:

### Workflows

1. **CI** (`ci.yml`) - Runs on all PRs and pushes

   - ✅ Lints all code
   - ✅ Builds all three projects (API, Frontend, Storybook)
   - ✅ Verifies build artifacts

2. **Deploy to Netlify** (`deploy-netlify.yml`) - Frontend deployment

   - 🚀 Preview deployments for PRs
   - 🚀 Production deployment on push to `main`
   - 💬 Automatic PR comments with preview URLs

3. **Deploy to Railway** (`deploy-railway.yml`) - All services
   - 🏗️ Builds once, deploys three services in parallel using matrix strategy
   - 🚀 Deploys: API Gateway, Website, Storybook
   - 🎯 Only runs on push to `main` when apps/libs change

### Setup Instructions

- [Frontend Setup (Netlify)](.github/CICD_SETUP.md)
- [Railway Setup (All Services)](.github/RAILWAY_SETUP.md)
- [Quick Start Guide](.github/RAILWAY_QUICKSTART.md)
- [Railway Without CLI](.github/RAILWAY_NO_CLI.md) ⭐ **No local tools needed!**

## License

MIT
