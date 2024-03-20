# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the app
RUN npm run build

# Use a lightweight version of Node.js as the base image for the runtime
FROM node:14-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Install serve to serve the app on a static server
RUN npm install -g serve

# Copy the build directory from the build image
COPY --from=0 /app/build .

# Expose port 5000 for the app
EXPOSE 3000

# Run the app
CMD ["serve", "-s", ".", "-l", "3000"]