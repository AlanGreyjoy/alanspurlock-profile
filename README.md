# Alan Spurlock - Personal Website

[![Build, Lint, and Deploy](https://github.com/AlanGreyjoy/alanspurlock-profile/actions/workflows/deploy.yml/badge.svg)](https://github.com/AlanGreyjoy/alanspurlock-profile/actions/workflows/deploy.yml)
[![Deploy API to Railway](https://github.com/AlanGreyjoy/alanspurlock-profile/actions/workflows/deploy-api.yml/badge.svg)](https://github.com/AlanGreyjoy/alanspurlock-profile/actions/workflows/deploy-api.yml)

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

This project uses GitHub Actions for continuous integration and deployment:

- **Automated Testing**: Linting runs on every push and PR
- **Automated Builds**: Project builds automatically on every push and PR
- **Frontend Deployment**: Pushes to `main` automatically deploy to Netlify
- **API Deployment**: API changes on `main` automatically deploy to Railway
- **Preview Deployments**: PRs get preview deployment links

### Setup Instructions

- [Frontend CI/CD (Netlify)](.github/CICD_SETUP.md)
- [API Deployment (Railway)](.github/RAILWAY_SETUP.md)

## License

MIT
