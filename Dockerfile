# Use the official Node.js runtime as a parent image
FROM node:18

# Set the working directory to /app
WORKDIR ./

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

#COPY .env ./

# Set the command to start the application
CMD ["node", "app.js"]
