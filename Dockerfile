# Multi-stage Dockerfile for YAPSTER Chat App - Render Deployment
# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copy frontend package files
COPY Frontend/package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy frontend source code
COPY Frontend/ ./

# Build the frontend
RUN npm run build

# Stage 2: Setup Backend and serve everything
FROM node:18-alpine AS production

WORKDIR /app

# Copy backend package files
COPY Backend/package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend source code
COPY Backend/ ./

# Copy built frontend from previous stage to match Server.js path expectation
COPY --from=frontend-build /app/frontend/dist ../Frontend/dist

# Expose port 4000 (fixed port, not variable)
EXPOSE 4000

# Start the application
CMD ["node", "src/Server.js"]
