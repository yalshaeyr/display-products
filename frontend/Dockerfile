# Node.js runtime as base image
FROM node:latest

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json for npm install/npm start
COPY package*.json ./

# Install any necessary dependencies
RUN npm install

# Copy source code into working directory
COPY . .

# Expose application port 3000
EXPOSE 3000

# Start the frontend
CMD ["npm", "start"]