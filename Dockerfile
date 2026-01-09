FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3010

# Set port environment variable for Next.js
ENV PORT=3010

# Start the application
CMD ["npm", "start"]