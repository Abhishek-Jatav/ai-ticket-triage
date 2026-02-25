# Use official Node image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build project
RUN npm run build

# Expose backend port
EXPOSE 3001

# Start application
CMD ["npm", "run", "start:prod"]