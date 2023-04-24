# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any necessary dependencies
RUN npm install

# Copy the rest of the frontend code to the working directory
COPY . .

# Expose the port the frontend is running on
EXPOSE 3000

# Start the Node.js backend
CMD ["npm", "start"]