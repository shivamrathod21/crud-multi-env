FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
