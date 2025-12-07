# Build stage
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm@10.20.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY apps/frontend/package.json ./apps/frontend/
COPY libs/spurlock-ui/package.json ./libs/spurlock-ui/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
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
