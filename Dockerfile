# Use a base image with Node.js and npm pre-installed
FROM node:18.14.1-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build your Astro.js and React application
RUN npm run build

# Expose the port your app runs on (default is 3000 for Astro.js)
EXPOSE 4321

# Command to run your application
CMD ["npm","start"]
