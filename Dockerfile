# Use a lightweight official Node.js image
FROM node:20-slim

# Install Chromium and dependencies
RUN apt-get update && apt-get install -y \
  chromium \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all remaining files
COPY . .

# Puppeteer looks for this env to find Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Expose your API port
EXPOSE 10000

# Start the app
CMD ["npm", "start"]
