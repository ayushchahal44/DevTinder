# Frontend Dockerfile

# Build stage
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the frontend code
COPY . .

# Build the Next.js app
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Set to production environment
ENV NODE_ENV=production

# Copy built assets from the builder stage
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/.next/standalone ./.next/standalone
COPY --from=frontend-builder /app/.next/static ./.next/static

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", ".next/standalone/server.js"]
