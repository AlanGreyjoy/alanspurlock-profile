# Alan Spurlock - Personal Website

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

## License

MIT
