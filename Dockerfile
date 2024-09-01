FROM node:lts-buster

# Install necessary packages
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application with PM2
CMD ["pm2-runtime", "start", "index.js", "--name", "bhashimd"]
