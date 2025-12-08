# Build stage
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm@10.20.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY libs/spurlock-ui/package.json ./libs/spurlock-ui/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Accept build arguments for Vite environment variables
ARG VITE_API_URL
ARG VITE_STORYBOOK_URL

# Make them available as environment variables during build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STORYBOOK_URL=$VITE_STORYBOOK_URL

# Build the application
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN pnpm build

# Production stage
FROM node:20-slim

# Install serve globally
RUN npm install -g serve

WORKDIR /app

# Copy built application
COPY --from=builder /app/dist/apps/frontend ./dist/apps/frontend

# Expose port (Railway will set PORT env var)
EXPOSE 3000

# Start the application with serve
CMD ["sh", "-c", "serve dist/apps/frontend -s -p ${PORT:-3000}"]
