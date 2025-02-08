# === Stage 1: Build the application ===
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

ARG NEXT_PUBLIC_SMARTCAPTCHA_SITEKEY
ENV NEXT_PUBLIC_SMARTCAPTCHA_SITEKEY=${NEXT_PUBLIC_SMARTCAPTCHA_SITEKEY}

# Build the Next.js application for production
RUN npm run build

# === Stage 2: Create the production image ===
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built files and dependencies from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3000

# USER nextjs

CMD ["npm", "start"]
