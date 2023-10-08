ARG node_version="14"

# Use an official Node.js runtime as the base image
FROM node:${node_version}

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 (the port your Hapi.js app is listening on)
EXPOSE 3000

# Command to run your application
CMD [ "node", "index.js" ]
