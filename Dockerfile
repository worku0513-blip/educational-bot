FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Compile TypeScript
RUN npm run build

# Create data directory
RUN mkdir -p data

# Expose port
EXPOSE 3000

# Start the bot
CMD ["node", "dist/bot.js"]
