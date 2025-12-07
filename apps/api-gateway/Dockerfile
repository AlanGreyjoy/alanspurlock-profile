# Build stage
FROM node:20-slim AS builder

# Install pnpm
RUN npm install -g pnpm@10.20.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY libs/resume-data/package.json ./libs/resume-data/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the application
RUN pnpm build:api

# Note: Seed file will be run using Prisma's db seed command

# Production stage
FROM node:20-slim

# Install Chromium for Puppeteer
RUN apt-get update && apt-get install -y \
    chromium \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set Puppeteer to use system Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app

# Copy built application and dependencies
COPY --from=builder /app/dist/apps/api-gateway ./dist/apps/api-gateway
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Expose port
EXPOSE 3000

# Create startup script that runs migrations, seeds, then starts the app
RUN echo '#!/bin/sh\n\
set -e\n\
echo "Running database migrations..."\n\
npx prisma migrate deploy\n\
echo "Migrations completed."\n\
echo "Running database seed..."\n\
npx prisma db seed || echo "Seed completed (or skipped)"\n\
echo "Starting application..."\n\
exec node dist/apps/api-gateway/main.js' > /app/start.sh && \
    chmod +x /app/start.sh

# Start the application (runs migrations first)
CMD ["/app/start.sh"]
