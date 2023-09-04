# Use Node.js official image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Firebase service account (will be available from Cloud Build Step 1)
COPY firebase-service-account.json ./firebase-service-account.json

# Set Firebase credentials for build
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/firebase-service-account.json

# Copy source code
COPY . .

# Build the application with Firebase credentials available
RUN npm run build

# Remove Firebase credentials after build (security)
RUN rm -f /app/firebase-service-account.json

# Expose port
EXPOSE 8080

# Set environment
ENV PORT=8080

# Start the application
CMD ["npm", "start"]