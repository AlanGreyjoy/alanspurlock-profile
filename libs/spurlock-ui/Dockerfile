# Build stage
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm@10.20.0

# Set working directory
WORKDIR /app

# Copy package files and pnpm config
COPY package.json pnpm-lock.yaml ./
COPY .npmrc ./.npmrc
COPY libs/spurlock-ui/package.json ./libs/spurlock-ui/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Storybook (increase memory limit for large builds)
ENV NODE_OPTIONS="--max-old-space-size=4096"
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
