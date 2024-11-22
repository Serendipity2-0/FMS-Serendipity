# Frontend development
FROM node:18-alpine
WORKDIR /app/new_frontend

# Install frontend dependencies
COPY new_frontend/package*.json ./
RUN npm install

# Copy application source code
COPY new_frontend/. ./

# Start the development server
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "8055"]
