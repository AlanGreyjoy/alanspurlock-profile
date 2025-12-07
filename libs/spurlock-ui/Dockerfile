# Build stage
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm@10.20.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY libs/spurlock-ui/package.json ./libs/spurlock-ui/
COPY apps/frontend/package.json ./apps/frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Storybook
RUN pnpm build:storybook

# Production stage
FROM node:20-slim

# Install serve globally
RUN npm install -g serve

WORKDIR /app

# Copy built Storybook
COPY --from=builder /app/dist/storybook/spurlock-ui ./dist/storybook/spurlock-ui

# Expose port (Railway will set PORT env var)
EXPOSE 3000

# Start the application with serve
CMD ["sh", "-c", "serve dist/storybook/spurlock-ui -s -p ${PORT:-3000}"]
