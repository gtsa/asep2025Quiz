# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy everything else and build
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Install only production deps
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy built app
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.mjs .
COPY --from=builder /app/package.json .

EXPOSE 3000
CMD ["npm", "start"]
