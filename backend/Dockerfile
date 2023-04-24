# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any necessary dependencies
RUN npm install

# Copy the rest of the backend code to the working directory
COPY . .

# Expose the port your backend is running on
EXPOSE 3001

# Start the Node.js backend
CMD ["npm", "start"]