# Use an official Node runtime as the base image
FROM node:20.9.0-alpine3.18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the React app
CMD ["npm", "run", "preview"]
