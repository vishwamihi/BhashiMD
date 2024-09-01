FROM node:lts-buster

# Install dependencies
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

# Install application dependencies
COPY package.json .
RUN npm install && npm install -g qrcode-terminal pm2

# Copy application files
COPY . .

# Expose port
EXPOSE 5000

# Use pm2 to start the application
CMD ["pm2-runtime", "index.js"]
