# Node.js runtime as base image
FROM node:latest

# Set working directory
WORKDIR /backend

# Copy package.json and package-lock.json for npm install/npm start
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code into working directory
COPY . .

# Expose application port 3001
EXPOSE 3001

# Start the backend
CMD ["npm", "start"]