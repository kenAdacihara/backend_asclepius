# Base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Set environment variables
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start command
CMD ["npm", "start"]