# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app

# Install deps
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g pnpm && pnpm install

# Copy everything else and build
COPY . .
RUN pnpm build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

# Install only production deps
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod

# Copy built app
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/next.config.mjs .
COPY --from=builder /app/package.json .

EXPOSE 3000
CMD ["pnpm", "start"]
